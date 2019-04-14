import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

class Battery extends Component {
    state = {
      data : {
        hasBattery : false,
        batteryPercentage : 0,
        status : false
        }  
      }

    constructor(props){
      super(props);
      ipcRenderer.send("get-battery-data");
    }

    componentDidMount(){
      ipcRenderer.on('battery-data', (e, data) =>{
        this.setState({data});
      })
    }

    componentWillUnmount(){
      ipcRenderer.removeAllListeners();
    }

    render() { 
      let {status, batteryPercentage, hasBattery} = this.state.data;
        return ( 
          <div>
            <h5 className="text-grey-lit text-center">BATTERY</h5>
            <h6 className="float-left text-grey-lit clearfix battery-avil">Available : {hasBattery === true ? "Yes" : "No"}</h6>
            <h6 className="battery-per text-grey-lit">Percentage : {batteryPercentage ? batteryPercentage + ' %' : "NA"}</h6>
            <h6 className="battery-status text-grey-lit">Status : {status ? "Charging" : "Not Charging"}</h6>
          </div>
         );
    }
}
 
export default Battery;