import React from 'react';
import Aside from '../Home/Aside/aside';
import LateralBar from '../Home/LateralBar/lateralBar';
import Navbar from '../Home/Navbar/navbar';
import "./perfil.css";
export class Perfil extends React.Component{
    constructor(props){
        super(props);
            this.state={
                src:"HIHI.png",
                user:"Arthur Klipp Zenzeluk"
            };
    }
    render(){
        return <div className='layout'>
            <LateralBar/>
            <perfil>
                <Navbar src={this.state.src} user={this.state.user}/>
                    <headPerfil>
                        <img id='fotoPerfil' src={this.state.src}/>
                        <nomePerfil>
                            <p className="usuario">USUÁRIO</p>
                            <h1 className="nome">{this.state.user}</h1>
                            <more>...{/*}<p>Ao continuar, você autoriza o Spotify a acessar a imagem de que você fizer upload. certifique-se de que você tem direito de fazer upload da imagem. Só vamos usar sua imagem como sua foto de perfil e/ou arte da capa de uma playlist.</p>{*/}</more>
                        </nomePerfil>
                    </headPerfil>
                <navperfil>
                <p className="textoPerfil">VISÃO GERAL</p>
                <p className="textoPerfil">PLAYLISTS PUBLICAS</p>
                <p className="textoPerfil">SEGUINDO</p>
                <p className="textoPerfil">SEGUIDORES</p>
                </navperfil>
                <playlists>
                    <head>
                    <h5>Playlists públicas</h5>
                    <p className="ml-auto">VER TODOS</p>
                    </head>
                    <album>
                        <img src="albums/albumArt8.png"/>
                        <h6>Minha playlist #1</h6>
                        <p>0 SEGUIDORES</p>
                    </album>
                </playlists>
            </perfil>
            <Aside/>
        </div>
    }
}