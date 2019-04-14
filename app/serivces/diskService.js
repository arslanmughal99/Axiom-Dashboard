const system = require("systeminformation");
const { ipcMain } = require('electron');

let freedisk = 0;
let useddisk = 0;

function diskUsgae(){
    system.fsSize((data)=>{
      freedisk = Math.round(100 - data[0].use);
      useddisk = Math.round(data[0].use);
    //   useddisk = Math.ceil((data.used)/1073741824);
    })
}

ipcMain.on('get-dyndisk-data', (e)=>{
  console.log("disk data update request .....")
  setInterval(()=>{
    try{
      e.sender.send('disk-data', {freeDisk: freedisk, usedDisk : useddisk});
    }catch(err){}
  }, 1600)
})


module.exports = diskUsgae;