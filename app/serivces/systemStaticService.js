const system = require("systeminformation");
const { ipcMain } = require("electron");

let cpuStaticInfo;
let ramStaticInfo;
let diskStaticInfo;
let gpuStaticInfo;
let biosStaticInfo;
let boardStaticInfo;

// let data;
function staticSysData (callback) {

    system.getStaticData((data)=>{
        /////
            let {manufacturer, speed, speedmax, cores, brand} = data.cpu;
        
            /* All Static Cpu Info */
            cpuStaticInfo = {
                cpuManufacturer: manufacturer + " " + brand,
                cpuMaxSpeed : speedmax,
                cpuSpeed : speed,
                cpuTotalCores : cores
            }
        
        /////
            let { size, manufacturer : ramManufacturer, clockSpeed, type } = data.memLayout[0];
        
            /* Static Ram info */
            ramStaticInfo = {
                ramManufacturer : ramManufacturer,
                ramSpeed : clockSpeed,
                ramType : type,
                totalRam : size,
            }
        
        /////
            let { name: diskName, interfaceType: iface, size: diskSize } = data.diskLayout[0];
            /* Static Disk info */
            diskStaticInfo = {
                diskName: diskName,
                diskTotalSize : Math.round(diskSize / 1073741824),
                diskIface : iface
            }
        
        //////
            let {model: gpModel, bus, vram, vramDynamic} = data.graphics.controllers[0];
            /* Static GPU info */
            gpuStaticInfo = {
                gpuModel : gpModel, 
                gpuBus : bus,
                gpuVram : vram,
                gpuVramStatus : vramDynamic
            }
        
        //////
            let {vendor: biosVendor, version: biosVersion, releaseDate, revision} = data.bios;
        
            /* Static Bios Info */
            biosStaticInfo = {
                biosVendor : biosVendor,
                biosVersion : biosVersion,
                biosRelDate : releaseDate,
                biosRev : revision
            }
        
        //////
            let { manufacturer: boardManu, model: boardModel, version: boardVersion, serial: boardSerial } = data.baseboard;
        
            /* Static MotherBoard Info */
            boardStaticInfo = {
                boardManufacturer : boardManu,
                boardModel : boardModel, 
                boardVersion : boardVersion,
                boardSerial : boardSerial
            }
        
            let staticData = {
                cpuStaticInfo : cpuStaticInfo,
                ramStaticInfo : ramStaticInfo,
                diskStaticInfo : diskStaticInfo,
                gpuStaticInfo : gpuStaticInfo,
                biosStaticInfo : biosStaticInfo,
                boardStaticInfo : boardStaticInfo
            }

           callback(staticData);
        })
        
    }
    
 


module.exports = staticSysData;
