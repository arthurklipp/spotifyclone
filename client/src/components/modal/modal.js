import React from 'react';
import './modal.css';

export default function Modal(props){
    if(!props.show){
        return null
    }
    return <modal onClick={props.alternarModal}>
            {props.children}
        </modal> 
}