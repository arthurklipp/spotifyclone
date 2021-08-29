import React from 'react';
import Scroll from '../Home/Scroll/scroll';
import "./style.css";


export function Playlist(props) {
    return <div className="musica">
        <Scroll header={props.header} list={props.playlists} />
    </div>
}