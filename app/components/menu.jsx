import React, { Component } from 'react';
import MenuButton from './menuButton';
import { ipcRenderer } from "electron"
import AppName from "../logos/appName.png"
import Logo from "../logos/Logo.png"


class Menu extends Component {
    state = {  }

    render() { 
        return ( 
            <div className="title-bar-div">
                <div className="logo-name-div clear-fix">
                    <img className="app-name clear-fix" src={AppName} ></img>
                    <img className="logo-div clear-fix" src={Logo}></img>
                </div>
                <MenuButton />
            </div>
         );
    }
}
 
export default Menu;