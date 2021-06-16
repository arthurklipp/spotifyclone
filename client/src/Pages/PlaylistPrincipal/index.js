import React from 'react';
import {CabecalhoPerfilPlaylist} from '../Perfil/cabecalhoPerfilPlaylist';
import Aside from '../Home/Aside/aside';
import LateralBar from '../Home/LateralBar/lateralBar';
import Navbar from '../Home/Navbar/navbar';
import { Playlist } from '../Playlist';
import Player from '../Home/Player/player';
import "./style.css";

const list = [
    { capa: 'albums/albumArt.png',
      album:'Unplugged',
      musica:'would.mp3',
      titulo:'Would',
      n:0,
      artista:'Alice In Chains'},
    { capa: 'albums/The_Getaway.jpg',
      album:'Stadium Arcadium',
      musica:'/music/4 - The Longest Wave.flac',
      titulo:'The Longest Wave',
      n:1,
      artista:'Red Hot Chili Peppers'},
    { capa: 'albums/albumArt3.png',
      album:'Use Your Ilusion II',
      musica:'/music/10 - November Rain.flac',
      titulo:'November Rain',
      n:2,
      artista:'Guns N'+' roses'},
    { capa: 'albums/albumArt4.png',
      album:'In Rainbows',
      musica:'/music/9 - Jigsaw Falling Into Place.flac',
      titulo:'Jigsaw Falling Into Place',
      n:3,
      artista:'Radiohead'},
    { capa: 'albums/albumArt5.png',
      album:'Album 2',
      musica:'/music/Hey - Pixies.flac',
      titulo:'Hey',
      n:4,
      artista:'Pixies'},
    { capa: 'albums/albumArt6.png',
      album:'Album 3',
      musica:'/music/Heart-Shaped Box - Nirvana.flac',
      titulo:'Heart-Shaped Box',
      n:5,
      artista:'Nirvana'},
    { capa: 'albums/albumArt7.png',
      album:'Alive',
      musica:'/music/Alive - Pearl Jam.flac',
      titulo:'Alive',
      n:6,
      artista:'Pearl Jam'},
    { capa: 'albums/albumArt8.png',
      album:'Surfer Rosa',
      musica:'/music/gigantic-hd.mp3',
      titulo:'Gigantic',
      n:7,
      artista:'Pixies'},
    { capa: 'albums/albumArt9.png',
      album:'Facelift',
      musica:'/music/man-in-the-box-official-video.mp3',
      titulo:'Man In The Box',
      n:8,
      artista:'Alice In Chains'},
  ];

var cont=0;

export class PlaylistPrincipal extends React.Component{
    constructor(props){
        super(props);
        this.avancar = this.avancar.bind(this);
        this.voltar = this.voltar.bind(this);
        this.trocarMusica = this.trocarMusica.bind(this);
        this.state={
            index: 0
        };
    }

    avancar(){
        if(8>cont){
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

    render(){
        const fila = list.map((list)=>
        <div className="filaItem" onClick={this.trocarMusica} valor={list.n}>
            <h6 valor={list.n}>{list.n+1}</h6>
            <img src={list.capa} valor={list.n}/>
            <div className="textoFila" valor={list.n}>
                <h6 id="titulo" valor={list.n}>{list.titulo}</h6>
                <h6 valor={list.n}>{list.artista}</h6>
            </div>
            <h6 id="tituloAlbum" valor={list.n}>{list.album}</h6>
            <div className="tempoItem">
                <h6 valor={list.n}>4:56</h6>
            </div>
        </div>
        );

        return <div>
            <div className="layout">
                <div className="parteCima">
                    <LateralBar/>
                    <main>
                        <Navbar src="/pngegg.png" user="Arthur Klipp Zenzeluk"/>
                        <div id="content">
                            <CabecalhoPerfilPlaylist img="albums/albumArt.png" titulo="Album" nome="Unplugged" subtitulo="Alice In Chains - 1996 - 13 musicas, 1h 11min"/>
                            <div id="fila">
                                <div>{fila}</div>
                            </div>
                        </div>
                    </main>
                    <Aside/>
                    </div>
                    <Player capa={list[this.state.index].capa} titulo={list[this.state.index].titulo} artista={list[this.state.index].artista} musica={list[this.state.index].musica} avancar={this.avancar} voltar={this.voltar}/>
            </div>
        </div>
    }
}