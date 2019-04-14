/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import staticData from "./serivces/systemStaticService"
import cpuData from "./serivces/cpuService"
import ramData from "./serivces/ramService"
import networkData from "./serivces/networkService"
import diskData from "./serivces/diskService"
import batteryData from "./serivces/batteryService"
import MenuBuilder from './menu';



// only call cpuUsage function to
// update values in memory
// after 1.6 sec
function initCpu(){
  setInterval(() => {
    cpuData();
  }, 1600);
}

function initRam (){
  setInterval(()=>{
    ramData();
  }, 1600)
}

function initDisk () {
  setInterval(()=>{
  diskData()
}, 1600)
}

function initNetwork(){
  setInterval(()=>{
    networkData();
  }, 1000)
}

function initBattery(){
  setInterval(()=>{
    batteryData();
  }, 1000)
}

function initProcess(){
  initCpu();
  initRam();
  initDisk();
  initBattery();
  initNetwork();
}

(function(){
  initProcess()
})();

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
    
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1155,
    height: 720,
    frame: false,
    // transparent: true,
    resizable: false,
    minimizable: false,
    maximizable: false
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
});



///////////////////////// IPC /////////////////////////////////

// Quit app on closing 
ipcMain.on("close-trigerd", ()=>{
  try{
    mainWindow = null;
    app.quit();    // Creating annoying errors  // Temp Fix
  }catch(err){
    mainWindow = null;
    process.exit(0);
  }
})

// minimize app
ipcMain.on("min-trigerd", ()=>{
  mainWindow.minimize();
})

// Send Staic data to Root Componets to avoid 
// fetching static data multipletimes
ipcMain.on('get-static-data', (e)=>{
  staticData((data)=>{
    try{
      e.sender.send('static-data', data)
    }catch(err){
      
    }
  });
  
})

