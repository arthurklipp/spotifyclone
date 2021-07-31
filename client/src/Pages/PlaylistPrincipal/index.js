import React from 'react';
import {CabecalhoPerfilPlaylist} from '../Perfil/cabecalhoPerfilPlaylist';
import Aside from '../Home/Aside/aside';
import LateralBar from '../Home/LateralBar/lateralBar';
import Navbar from '../Home/Navbar/navbar';
import { Playlist } from '../Playlist';
import Player from '../Home/Player/player';
import "./style.css";
import api from '../../api';

const list=[];
var cont=0;

export class PlaylistPrincipal extends React.Component{
    constructor(props){
        super(props);
        this.avancar = this.avancar.bind(this);
        this.voltar = this.voltar.bind(this);
        this.trocarMusica = this.trocarMusica.bind(this);
        this.state={
            index: 0,
            src: localStorage.getItem('perfil'),
            user: localStorage.getItem('user'),
            titulo: '',
            capa: '',
            artista: '',
            musica: ''
        };
    }

    avancar(){
        if(this.state.titulo.length>cont+1){
            cont++;
            this.setState({index:cont});
        }
    }

    voltar(){
        if(cont>0){
            cont--;
            this.setState({index:cont});
        }
      }

      trocarMusica(e){
        cont=e.target.getAttributeNode("valor").value;
        this.setState({index:cont});
    }

    componentDidMount(){
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');

      api.get("projects/playlists/"+id)
              .then(response => {
                var titulo=[], capa=[], artista=[], musica=[];
                response.data.musicas.map((item)=>{
                  titulo.push(item.title);
                  capa.push('http://localhost:8080/projects/imgs/'+response.data.playlist.img+'?jwt=Bearer '+localStorage.getItem('login'));
                  artista.push(response.data.playlist.user.name);
                  musica.push('http://localhost:8080/projects/music/'+item.title+'.flac?jwt=Bearer '+localStorage.getItem('login'));
                  list.push(
                    {
                    'titulo':item.title,
                    'capa':'http://localhost:8080/projects/imgs/'+response.data.playlist.img+'?jwt=Bearer '+localStorage.getItem('login'),
                    'artista':response.data.playlist.user.name,
                    'album':response.data.playlist.title
                  }
                  );
                });
                console.log(list);
                this.setState({
                  album:response.data.playlist.title, 
                  titulo:titulo, 
                  capa:capa, 
                  artista:artista, 
                  musica:musica
                });
              })
              .catch(response => {
                console.log(response);
              });
    }

    render(){
        const fila = list.map((list, n)=>
        <div className="filaItem" onClick={this.trocarMusica} valor={n}>
            <h6 valor={n}>{n+1}</h6>
            <img src={list.capa} valor={n}/>
            <div className="textoFila" valor={n}>
                <h6 id="titulo" valor={n}>{list.titulo}</h6>
                <h6 valor={n}>{list.artista}</h6>
            </div>
            <h6 id="tituloAlbum" valor={n}>{list.album}</h6>
            <div className="tempoItem">
                <h6 valor={n}>4:56</h6>
            </div>
        </div>
        );

        return <div>
            <div className="layout">
                <div className="parteCima">
                    <LateralBar/>
                    <main>
                        <Navbar src={this.state.src} user={this.state.user}/>
                        <div id="content">
                            <CabecalhoPerfilPlaylist img={this.state.capa[0]} titulo={"Album"} nome={this.state.album} subtitulo={this.state.artista[0]+', '+this.state.titulo.length+' musicas'}/>
                            <div id="fila">
                                <div>{fila}</div>
                            </div>
                        </div>
                    </main>
                    <Aside/>
                    </div>
                    <Player capa={this.state.capa[this.state.index]} titulo={this.state.titulo[this.state.index]} artista={this.state.artista[this.state.index]} musica={this.state.musica[this.state.index]} avancar={this.avancar} voltar={this.voltar}/>
            </div>
        </div>
    }
}