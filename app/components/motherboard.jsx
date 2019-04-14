import React, { Component } from 'react';

const Board = (props) => {
    const { boardManufacturer, boardModel, boardVersion, boardSerial } = props.staticData;
    return ( 
        <div> 
            <h5 className="text-grey-lit text-center">MOTHERBOARD</h5>
            <h6 className="text-grey-lit float-left clearfix bios-vendor">Vendor : {boardManufacturer}</h6>
            <h6 className="text-grey-lit bios-rel-date">Model : {boardModel}</h6>
            <h6 className="text-grey-lit float-left clearfix bios-version">Version : {boardVersion}</h6>
            <h6 className="text-grey-lit bios-rev">Serial : {boardSerial}</h6>
        </div>
    );
}
 
export default Board;


    //                 boardManufacturer : boardManu,
    //                 boardModel : boardModel, 
    //                 boardVersion : boardVersion,
    //                 boardSerial : boardSerial