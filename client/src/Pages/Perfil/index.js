import React from 'react';
import Aside from '../Home/Aside/aside';
import LateralBar from '../Home/LateralBar/lateralBar';
import Navbar from '../Home/Navbar/navbar';
import { Playlist } from '../Playlist';
import Player from '../Home/Player/teste';
import {CabecalhoPerfilPlaylist} from './cabecalhoPerfilPlaylist';
import "./perfil.css";

export class Perfil extends React.Component{
    constructor(props){
        super(props);
            this.state={
                src:"/pngegg.png",
                user:localStorage.getItem('user')
            };
    }
    render(){
        return <div className="layout">
                <div className="parteCima">
                    <LateralBar/>
                    <main>
                        <Navbar src={this.state.src} user={this.state.user}/>
                        <div id="content">
                            <CabecalhoPerfilPlaylist img={this.state.src} titulo="Perfil" nome={this.state.user} subtitulo="1 playlist * 7 seguidores * 14 seguindo"/>
                            <Playlist/>
                        </div>
                    </main>
                    <Aside/>
                    </div>
                    <Player/>
            </div>
    }
}