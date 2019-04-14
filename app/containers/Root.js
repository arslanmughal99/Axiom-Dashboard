import React, { Component } from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTimesCircle, faMinusCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { ipcRenderer } from "electron";
import Menu from "../components/menu"
import Cpu from "../components/cpu"
import Ram from "../components/ram"
import Disk from "../components/disk"
import Gpu from "../components/gpu"
import Network from '../components/network';
import Bios from "../components/bios"
import Board from "../components/motherboard"
import Batter from "../components/battery"
import "bootstrap/dist/css/bootstrap.css";
library.add(faTimesCircle);
library.add(faMinusCircle);
library.add(faCheckCircle);


class Root extends Component {
  constructor(props){
    super(props);
    ipcRenderer.send('get-static-data');
    this.state = {
      staticCpu : {},
      staticRam : {},
      staticGpu : {},
      staticBios : {},
      staticMotherBoard : {},
      staticDisk : {} 
    }
  }

componentDidMount(){
  ipcRenderer.on('static-data', (e, staticSystemData)=>{
    this.setState({
      staticCpu : staticSystemData.cpuStaticInfo,
      staticRam : staticSystemData.ramStaticInfo,
      staticGpu : staticSystemData.gpuStaticInfo,
      staticBios : staticSystemData.biosStaticInfo,
      staticMotherBoard : staticSystemData.boardStaticInfo,
      staticDisk : staticSystemData.diskStaticInfo
    })
  })
}

  render() {
    return (
      <div className="main-div">
        <Menu />  
        <Cpu staticData={this.state.staticCpu} />
        <div className="ram-module">
          <Ram staticData={this.state.staticRam}/>
        </div>
        <div className="disk-module">
          <Disk staticData={this.state.staticDisk}/>
        </div>
        <div className="gpu-module">
          <Gpu staticData={this.state.staticGpu}/>
        </div>
        <div className="side-board">
          <div className="network-module">
            <Network />
          </div>
          <div className="bios-module">
            <Bios staticData={this.state.staticBios} />
          </div>
          <div className="bios-module">
            <Board staticData={this.state.staticMotherBoard} />
          </div>
          <div className="bios-module">
            <Batter />
          </div>
        </div>
        
      </div>
      
    );
  }
}

export default Root;