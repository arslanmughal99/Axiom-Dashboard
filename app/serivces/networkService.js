const system = require("systeminformation");
const { ipcMain } = require("electron");


/* Dynamic Network Data */
let networkUpload = 0;
let networkDownlaod = 0
let interfaceName = '';

system.networkInterfaceDefault((name)=>{
   interfaceName = name;
});

function networkUsage() {
   system.networkStats(interfaceName, (data)=>{
      networkUpload =  Math.ceil(data[0].tx_sec/1024);
      networkDownlaod = Math.ceil(data[0].rx_sec/1024);
 })
}


ipcMain.on("get-dynNet-data",(e)=>{
   console.log("Request For network upadate recived ...")
   setInterval(()=>{
      try{
         e.sender.send('network-data',  {networkUpload: networkUpload , networkDownlaod : networkDownlaod})
      }
      catch(err){
         
      }
   }, 1000)
});   



module.exports = networkUsage;
  