import React, { Component } from 'react';
import { Doughnut } from "react-chartjs-2"
import { ipcRenderer } from "electron"

import "bootstrap/dist/css/bootstrap.css"


class Cpu extends Component {

constructor(props){
  super(props);
  ipcRenderer.send('get-cpu-data');
}

  state = {
    data : 0
  }
  
  componentDidMount(){    
    ipcRenderer.on('cpu-data', (e, data)=>{
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
      data: [data, 100 - data],
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
      <div className="meter-con">
        <h4 className="text-grey text-center">CPU USAGE</h4>
        <Doughnut data={options} legend={legend} />
        <h4 className="text-grey text-center btm-legend-1">Total Cores: {this.props.staticData.cpuTotalCores}</h4>
          <h6 className="text-grey text-center float-left clearfix speed-head">Speed : {this.props.staticData.cpuSpeed} GZ</h6>
          <h6 className="text-grey text-center float-right clearfix maxspeed-head">Max : {this.props.staticData.cpuMaxSpeed} GZ</h6>
          <h6 className="text-grey text-center vendor-head">{this.props.staticData.cpuManufacturer}</h6>
      </div>
    );
  }
}

export default Cpu;
