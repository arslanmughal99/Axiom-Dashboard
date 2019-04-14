import React, { Component } from 'react';
import { Line } from "react-chartjs-2"
import { ipcRenderer } from "electron"




class Network extends Component {
    state = {
        data : {
            networkUpload : [0, 0, 0, 0, 0],
            networkDownlaod : [0, 0, 0, 0, 0]
        }
      }

  constructor(props){
    super(props);
    ipcRenderer.send("get-dynNet-data")
  }

  chartRefernece = {}

  componentDidMount(){    
    let data = {...this.state.data};
    ipcRenderer.on('network-data', (e, newData)=>{
        data.networkUpload.shift();
        data.networkUpload.push(newData.networkUpload);
        data.networkDownlaod.shift();
        data.networkDownlaod.push(newData.networkDownlaod);
        this.setState({data});
        this.chartRefernece.chartInstance.update();
    });
  }

  componentWillUnmount(){
    ipcRenderer.removeAllListeners();
  }

  // Decide Weather to show transfer rate in KBPS (kilobytes per sec) or MBPS (megabytes per sec)
  transferRate (dataRate){
    let newData = {...this.state.data}
    let lastData = dataRate[dataRate.length - 1];
    if(lastData > 1024){
      let mbps = lastData / 1024;
      return `${mbps} Mbps`;
    }else{
      return `${lastData} Kbps`;
      
    }
  }

  


  render() {
  //  Data for Line Chart "data" props  
  let options = {
      labels : ["5 sec", "4 sec", "3 sec", "2 sec", "1 sec"],
      datasets:[{
        label : "Download",
        backgroundColor : 'rgba(255, 99, 132, 1)',
        data : this.state.data.networkDownlaod,
        fill : false
      },
    {
        label : "Upload",
        backgroundColor : 'rgba(255, 205, 86, 1)',
        data : this.state.data.networkUpload,
        fill : false
    }],
  
     
    }
    
    // Static data for LineChart "option" props
    let axisOptions = {
      scales: {
        yAxes: [{
            display: true,
            ticks: {
                // suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                suggestedMax: 10,
                // OR //
                beginAtZero: true,   // minimum value will be 0.
                
            }
        }]
    },
    maintainAspectRatio: false
    }

  // Legend Visibility
  let legend = {
    display: true
  }

    return (
      <div>
        <h3 className="text-grey text-center">NETWORK USAGE</h3>
        <Line ref={ref => this.chartRefernece = ref} width={500} height={150} data={options} legend={legend} className="network-chart" options={axisOptions} />
        <h6 className="net-upload text-grey clearfix">Upload : {this.transferRate(this.state.data.networkUpload)}</h6>
        <h6 className="net-download text-grey">Download : {this.transferRate(this.state.data.networkDownlaod)}</h6>
      </div>
    );
  }
}

export default Network;