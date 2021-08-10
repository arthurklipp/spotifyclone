import React from 'react';
import Scroll from '../Home/Scroll/scroll';
import "./style.css";

export function Playlist(props){
        return <div className="musica">
            <Scroll header={props.header} list={props.playlists}/>
            <Scroll header="Seguidores" tipo={1}/>
            <Scroll header="Seguindo" tipo={1}/>
        </div>
}