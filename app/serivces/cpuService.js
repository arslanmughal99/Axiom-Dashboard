const system = require("systeminformation");
const { ipcMain } = require('electron');

let cpuUsageVal = 0;

function cpuUsgae(){
    system.currentLoad((data)=>{
      cpuUsageVal = Math.ceil(data.currentload);
    })
}

ipcMain.on('get-cpu-data', (e)=>{
  console.log("cpu data update request .....")
  setInterval(()=>{
    try{
      e.sender.send('cpu-data', cpuUsageVal);
    }catch(err){
      
    }
  }, 1600)
})


module.exports = cpuUsgae;