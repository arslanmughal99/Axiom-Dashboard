import React, { Component } from 'react';
import { Doughnut } from "react-chartjs-2"
import { ipcRenderer } from "electron"

import "bootstrap/dist/css/bootstrap.css"


class Disk extends Component {
    state = {
        data : {
          freeDisk : 0,
          usedDisk : 0
        }
      }

  constructor(props){
    super(props);
    ipcRenderer.send("get-dyndisk-data")
  }

  componentDidMount(){    
    ipcRenderer.on('disk-data', (e, data)=>{
        this.setState({data})
    });
  }

  componentWillUnmount(){
    ipcRenderer.removeAllListeners();
  }

  render() {
  let {data} = this.state;

  let options = {
    labels : ['Used', 'Free'],
    datasets: [{
      label: 'CPU USAGE',
      data: [this.state.data.usedDisk, this.state.data.freeDisk],   // Passing cpuUsgae data in data 
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 205, 86, 1)',
      ],
      borderWidth: 0
  }]
  }

  let legend = {
    display: false
  }
  
    return (
        
      <div className="meter-con ram-module">
        <h4 className="text-grey text-center">DISK USAGE</h4>
        <Doughnut data={options} legend={legend} />
        <h4 className="text-grey text-center btm-legend-1">Total Disk: {this.props.staticData.diskTotalSize || null } GB</h4>
          <h6 className="text-grey text-center float-left clearfix speed-head">Free : {this.state.data.freeDisk} %</h6>
          <h6 className="text-grey text-center float-right clearfix maxspeed-head">Iface : {this.props.staticData.diskIface}</h6>
          <h6 className="text-grey text-center vendor-head">{this.props.staticData.diskName}</h6>
      </div>
    );
  }
}

export default Disk;