import React, { Component } from 'react';
import { Doughnut } from "react-chartjs-2"
import { ipcRenderer } from "electron"

import "bootstrap/dist/css/bootstrap.css"


class Ram extends Component {
    state = {
        data : {
          freeRam : 0,
          usedRam : 0
        }
      }

  constructor(props){
    super(props);
    ipcRenderer.send("get-dynRam-data")
  }

  componentDidMount(){    
    ipcRenderer.on('ram-data', (e, data)=>{
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
      data: [data.usedRam, data.freeRam],   // Passing cpuUsgae data in data 
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
        <h4 className="text-grey text-center">RAM USAGE</h4>
        <Doughnut data={options} legend={legend} />
        <h4 className="text-grey text-center btm-legend-1">Total Ram: {parseFloat((this.props.staticData.totalRam / 1000000000).toFixed(2)) || null } GB</h4>
          <h6 className="text-grey text-center float-left clearfix speed-head">Type : {this.props.staticData.ramType}</h6>
          <h6 className="text-grey text-center float-right clearfix maxspeed-head">Speed : {this.props.staticData.ramSpeed} MHZ</h6>
          <h6 className="text-grey text-center vendor-head">{this.props.staticData.ramManufacturer}</h6>
      </div>
    );
  }
}

export default Ram;