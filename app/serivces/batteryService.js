const system = require("systeminformation");
const { ipcMain } = require('electron');

let batteryPercentage = 0;
let hasBattery = false;
let status = false;

function batteryInfo(){
    system.battery((data)=>{
        batteryPercentage = data.percent;
        hasBattery = data.hasbattery;
        status = data.ischarging;
    })
}

ipcMain.on('get-battery-data', (e)=>{
  console.log("battery data update request .....")
  setInterval(()=>{
      try{
          e.sender.send('battery-data', {
              hasBattery: hasBattery,
              batteryPercentage : batteryPercentage,
              status : status
          });
      }
      catch(err){}
  }, 1000)
})

module.exports = batteryInfo;