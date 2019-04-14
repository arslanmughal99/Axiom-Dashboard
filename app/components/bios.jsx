import React, { Component } from 'react';

const Bios = (props) => {
    const { biosVendor, biosVersion, biosRelDate, biosRev } = props.staticData;
    return ( 
        <div> 
            <h5 className="text-grey-lit text-center">BIOS</h5>
            <h6 className="text-grey-lit float-left clearfix bios-vendor">Vendor : {biosVendor}</h6>
            <h6 className="text-grey-lit bios-rel-date">Release Date : {biosRelDate}</h6>
            <h6 className="text-grey-lit float-left clearfix bios-version">Version : {biosVersion}</h6>
            <h6 className="text-grey-lit bios-rev">Revision : {biosRev}</h6>
        </div>
    );
}
 
export default Bios;