import React from "react";
import './avatar.css';

export default function Avatar(props){
    return(
        <div className='avatar' style={{width: props.tam+'px', height: props.tam+'px'}}>
            {props.children}
        </div>
    )
}