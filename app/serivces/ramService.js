const system = require("systeminformation");
const { ipcMain } = require('electron');

let freeRam = 0;
let usedRam = 0;

function ramUsgae(){
    system.mem((data)=>{
      freeRam = Math.ceil(((data.free)/(data.total))*100);
      usedRam = Math.ceil(((data.used)/(data.total))*100);
    })
}

ipcMain.on('get-dynRam-data', (e)=>{
  console.log("Ram data update request .....")
  setInterval(()=>{
    try{
      e.sender.send('ram-data', {freeRam: freeRam, usedRam : usedRam});
    }catch(err){}
  }, 1600)
})


module.exports = ramUsgae;