import React, { Component } from 'react';
import { ipcRenderer, remote } from "electron";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";




class MenuButton extends Component {


    handleClose = () =>{
        ipcRenderer.send("close-trigerd");
        // remote.process.exit(0);
    }

    hadleMin = () =>{
        ipcRenderer.send("min-trigerd");
    }


    render() { 
        return ( 
            <div className="menu-buttons">
               <FontAwesomeIcon onClick={this.handleClose} className="close-icon clearfix" color='#303942' icon="times-circle" />
               <FontAwesomeIcon onClick={this.hadleMin} className="min-icon clearfix" color='#303942' icon="minus-circle" />
            </div>
         );
    }
}
 
export default MenuButton;