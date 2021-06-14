import React from 'react';
import Scroll from '../Home/Scroll/scroll';
import "./style.css";
export class Playlist extends React.Component{
    render(){
        return <div className="musica">
            <Scroll header="Playlists"/>
            <Scroll header="Seguidores"/>
            <Scroll header="Seguindo"/>
        </div>
    }
}