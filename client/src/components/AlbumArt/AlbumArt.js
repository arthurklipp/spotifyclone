import React from "react";
import './style.css';

export default function AlbumArt(props){
    return(
        <div className='albumArt' style={{width: props.tam+'px', height: props.tam+'px'}}>
            {props.children}
        </div>
    )
}