import React from 'react';
import Aside from '../Home/Aside/aside';
import LateralBar from '../Home/LateralBar/lateralBar';
import Navbar from '../Home/Navbar/navbar';
import { Playlist } from '../Playlist';
import Player from '../Home/Player/player';
import {CabecalhoPerfilPlaylist} from './cabecalhoPerfilPlaylist';
import "./perfil.css";
import api from "../../api";

export class Perfil extends React.Component{
    constructor(props){
        super(props);
            this.state={
                src:localStorage.getItem('perfil'),
                user:localStorage.getItem('user')
            };
        this.fileInput = React.createRef();
        this.processUpload = this.processUpload.bind(this);
    }

    processUpload(event){
        event.preventDefault();
        const data = new FormData();
    
        data.append("file", this.fileInput.current.files[0]);
    
        api.post("projects/post", data)
          .then(response => {
            this.setState({src: response.data.perfil});
            localStorage.setItem('perfil', response.data.perfil);
          })
          .catch(() => {
            console.log("merda");
          });
      };

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
                        <form onSubmit={this.processUpload}>
                            <input type='file' name='file' ref={this.fileInput}/>
                            <input type='submit' value='enviar'/>
                        </form>
                    </main>
                    <Aside/>
                    </div>
                    <Player/>
            </div>
    }
}