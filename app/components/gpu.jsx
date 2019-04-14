import React, { Component } from 'react';
import { ipcRenderer } from "electron"
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import "bootstrap/dist/css/bootstrap.css"


class Gpu extends Component {
state = {
    gpuAvail : false
  }
  
  
  componentWillReceiveProps(props){
 
      let gpuAvail;
      // const { gpuModel } = this.props.staticData;
      if(props.staticData.gpuModel){ 
        gpuAvail = true;
        this.setState({gpuAvail})
      }else{
        gpuAvail = false;
        this.setState({gpuAvail})
        }   
  }


  render() {
    const {gpuModel, gpuBus, gpuVram, gpuVramStatus} = this.props.staticData;
    
    return (
      <div className="meter-con">
          <h4 className="text-grey text-center">GPU INFO</h4>
          <div key="gup-status">
            { this.state.gpuAvail ? <FontAwesomeIcon className="gpu-status-icon" color="rgba(255, 205, 86, 1)" icon="check-circle" /> :
             <FontAwesomeIcon className="gpu-status-icon" color="rgba(255, 99, 132, 1)" icon="times-circle" />  }
          </div>
          <h4 className="text-grey text-center btm-legend-1">Total vRam: {gpuVram || "N/A"}</h4>
          <h6 className="text-grey text-center float-left clearfix speed-head">Bus : {gpuBus || "N/A"}</h6>
          <h6 className="text-grey text-center float-right clearfix maxspeed-head">Status : {gpuVramStatus ? "Available" : "Not Present"}</h6>
          <h6 className="text-grey text-center vendor-head">{gpuModel || null}</h6>
      </div>
    );
  }
}

export default Gpu;
