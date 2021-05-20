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

export class Home extends React.Component{
  constructor(props){
    super(props);
    this.state={
      src:"/pngegg.PNG",
      user: localStorage.getItem('user'),
      capa:['albums/albumArt.png','albums/albumArt2.png','albums/albumArt3.png','albums/albumArt4.png','albums/albumArt5.png','albums/albumArt6.png'],
      album:['Unplugged','Stadium Arcadium', 'Use Your Ilusion II','Album 1','Album 2', 'Album 3'],
      artista:['Alice In Chains','Red Hot Chili Peppers','Guns N'+' roses','John','Peter','Alice']
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
              <Player/>
            </div>
  }
}