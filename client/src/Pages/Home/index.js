import React from 'react';
import './home.css';
import Scroll from './Scroll/scroll';
import LateralBar from './LateralBar/lateralBar';
import Aside from './Aside/aside';
import Navbar from './Navbar/navbar';
import Player from './Player/player';

function head(){
  
    return (<div className='head'>
              <img className='logo' src='Spotify_Logo_RGB_Black.png'/>
            </div>
    );
}

const list ={ capa: 'albums/albumArt.png',
              album:'Unplugged',
              musica:'would.mp3',
              titulo:'Would',
              n:0,
              artista:'Alice In Chains'};

export class Home extends React.Component{
  constructor(props){
    super(props);
    this.state={
      src:localStorage.getItem('perfil'),
      user: localStorage.getItem('user')
    };
  }
  render(){
    return <div className="layout">
              <div className="parteCima">
                  <LateralBar/>
                  <main>
                  <Navbar src={this.state.src} user={this.state.user}/>
                  <div className="scroll">
                    <Scroll header="Recently played"/>
                    <Scroll header="Feito para você"/>
                    <Scroll header="Com base no que você ouviu recentemente"/>
                    <Scroll header="Com base no que você ouviu recentemente"/>
                    <Scroll header="Com base no que você ouviu recentemente"/>
                    <Scroll header="Com base no que você ouviu recentemente"/>
                    <Scroll header="Com base no que você ouviu recentemente"/>
                    <Scroll header="Com base no que você ouviu recentemente"/>
                    </div>
                    </main>
                  <Aside/>
                </div>
                <Player capa={list.capa} titulo={list.titulo} artista={list.artista} musica={list.musica} avancar={this.avancar} voltar={this.voltar}/>
            </div>
  }
}