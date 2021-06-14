import React from 'react';
import {CabecalhoPerfilPlaylist} from '../Perfil/cabecalhoPerfilPlaylist';
import Aside from '../Home/Aside/aside';
import LateralBar from '../Home/LateralBar/lateralBar';
import Navbar from '../Home/Navbar/navbar';
import { Playlist } from '../Playlist';
import Player from '../Home/Player/teste';
import "./style.css";

const list = [
    { capa: 'albums/albumArt.png',
      album:'Unplugged',
      musica:'would.mp3',
      titulo:'Would',
      n:1,
      artista:'Alice In Chains'},
    { capa: 'albums/The_Getaway.jpg',
      album:'Stadium Arcadium',
      musica:'/music/4 - The Longest Wave.flac',
      titulo:'The Longest Wave',
      n:2,
      artista:'Red Hot Chili Peppers'},
    { capa: 'albums/albumArt3.png',
      album:'Use Your Ilusion II',
      musica:'/music/10 - November Rain.flac',
      titulo:'November Rain',
      n:3,
      artista:'Guns N'+' roses'},
    { capa: 'albums/albumArt4.png',
      album:'In Rainbows',
      musica:'/music/9 - Jigsaw Falling Into Place.flac',
      titulo:'Jigsaw Falling Into Place',
      n:4,
      artista:'Radiohead'},
    { capa: 'albums/albumArt5.png',
      album:'Album 2',
      musica:'/music/Hey - Pixies.flac',
      titulo:'Hey',
      n:5,
      artista:'Pixies'},
    { capa: 'albums/albumArt6.png',
      album:'Album 3',
      musica:'/music/Heart-Shaped Box - Nirvana.flac',
      titulo:'Heart-Shaped Box',
      n:6,
      artista:'Nirvana'},
    { capa: 'albums/albumArt7.png',
      album:'Alive',
      musica:'/music/Heart-Shaped Box - Nirvana.flac',
      titulo:'Alive',
      n:7,
      artista:'Pearl Jam'},
    { capa: 'albums/albumArt8.png',
      album:'Surfer Rosa',
      musica:'/music/Heart-Shaped Box - Nirvana.flac',
      titulo:'Gigantic',
      n:8,
      artista:'Pixies'},
    { capa: 'albums/albumArt9.png',
      album:'Facelift',
      musica:'/music/Heart-Shaped Box - Nirvana.flac',
      titulo:'Man In The Box',
      n:9,
      artista:'Alice In Chains'},
  ];

const teste = list.map((list)=>
<div className="filaItem">
                                    <h6>{list.n}</h6>
                                    <img src={list.capa}/>
                                    <div className="textoFila">
                                        <h6>{list.titulo}</h6>
                                        <h6>{list.artista}</h6>
                                    </div>
                                    <h6 id="tituloAlbum">{list.album}</h6>
                                    <div className="tempoItem">
                                        <h6>4:56</h6>
                                    </div>
                                </div>
);

export class PlaylistPrincipal extends React.Component{

    render(){
        return <div>
            <div className="layout">
                <div className="parteCima">
                    <LateralBar/>
                    <main>
                        <Navbar src="/pngegg.png" user="Arthur Klipp Zenzeluk"/>
                        <div id="content">
                            <CabecalhoPerfilPlaylist img="albums/albumArt.png" titulo="Album" nome="Unplugged" subtitulo="Alice In Chains - 1996 - 13 musicas, 1h 11min"/>
                            <div id="fila">
                                <div>{teste}</div>
                            </div>
                        </div>
                    </main>
                    <Aside/>
                    </div>
                    <Player/>
            </div>
        </div>
    }
}





{/*}
<div className="filaItem">
                                    <h6>2</h6>
                                    <img src="albums/albumArt.png"/>
                                    <div className="textoFila">
                                        <h6>Brother (Live at the Majestic Theatre, Brooklyn, NY - April 1996)</h6>
                                        <h6>Alice In Chains</h6>
                                    </div>
                                    <h6 id="tituloAlbum">Unplugged</h6>
                                    <div className="tempoItem">
                                        <h6>4:56</h6>
                                    </div>
                                </div>
                                <div className="filaItem">
                                    <h6>3</h6>
                                    <img src="albums/albumArt.png"/>
                                    <div className="textoFila">
                                        <h6>No Excuses(Live at the Majestic Theatre, Brooklyn, NY - April 1996)</h6>
                                        <h6>Alice In Chains</h6>
                                    </div>
                                    <h6 id="tituloAlbum">Unplugged</h6>
                                    <div className="tempoItem">
                                        <h6>4:56</h6>
                                    </div>
                                </div>
                                <div className="filaItem">
                                    <h6>4</h6>
                                    <img src="albums/albumArt.png"/>
                                    <div className="textoFila">
                                        <h6>Down In A Hole (Live at the Majestic Theatre, Brooklyn, NY - April 1996)</h6>
                                        <h6>Alice In Chains</h6>
                                    </div>
                                    <h6 id="tituloAlbum">Unplugged</h6>
                                    <div className="tempoItem">
                                        <h6>4:56</h6>
                                    </div>
                                </div>
                                <div className="filaItem">
                                    <h6>5</h6>
                                    <img src="albums/albumArt.png"/>
                                    <div className="textoFila">
                                        <h6>Angry Chair (Live at the Majestic Theatre, Brooklyn, NY - April 1996)</h6>
                                        <h6>Alice In Chains</h6>
                                    </div>
                                    <h6 id="tituloAlbum">Unplugged</h6>
                                    <div className="tempoItem">
                                        <h6>4:56</h6>
                                    </div>
                                </div>
                                <div className="filaItem">
                                    <h6>6</h6>
                                    <img src="albums/albumArt.png"/>
                                    <div className="textoFila">
                                        <h6>Rooster (Live at the Majestic Theatre, Brooklyn, NY - April 1996)</h6>
                                        <h6>Alice In Chains</h6>
                                    </div>
                                    <h6 id="tituloAlbum">Unplugged</h6>
                                    <div className="tempoItem">
                                        <h6>4:56</h6>
                                    </div>
                                </div>
                                <div className="filaItem">
                                    <h6>7</h6>
                                    <img src="albums/albumArt.png"/>
                                    <div className="textoFila">
                                        <h6>Got Me Wrong (Live at the Majestic Theatre, Brooklyn, NY - April 1996)</h6>
                                        <h6>Alice In Chains</h6>
                                    </div>
                                    <h6 id="tituloAlbum">Unplugged</h6>
                                    <div className="tempoItem">
                                        <h6>4:56</h6>
                                    </div>
                                </div>
                                <div className="filaItem">
                                    <h6>8</h6>
                                    <img src="albums/albumArt.png"/>
                                    <div className="textoFila">
                                        <h6>Heaven Beside You (Live at the Majestic Theatre, Brooklyn, NY - April 1996)</h6>
                                        <h6>Alice In Chains</h6>
                                    </div>
                                    <h6 id="tituloAlbum">Unplugged</h6>
                                    <div className="tempoItem">
                                        <h6>4:56</h6>
                                    </div>
                                </div>
                                <div className="filaItem">
                                    <h6>9</h6>
                                    <img src="albums/albumArt.png"/>
                                    <div className="textoFila">
                                        <h6>Would? (Live at the Majestic Theatre, Brooklyn, NY - April 1996)</h6>
                                        <h6>Alice In Chains</h6>
                                    </div>
                                    <h6 id="tituloAlbum">Unplugged</h6>
                                    <div className="tempoItem">
                                        <h6>4:56</h6>
                                    </div>
                                </div>
{*/}