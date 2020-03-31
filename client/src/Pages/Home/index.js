import React from 'react';
import './home.css';
import Scroll from './scroll';
import LateralBar from './lateralBar';
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
      capa:['albums/albumArt.png','albums/albumArt2.png','albums/albumArt3.png','albums/albumArt4.png','albums/albumArt5.png','albums/albumArt6.png'],
      album:['Unplugged','Stadium Arcadium', 'Use Your Ilusion II','Album 1','Album 2', 'Album 3'],
      artista:['Alice In Chains','Red Hot Chili Peppers','Guns N'+' roses','John','Peter','Alice']
    };
  }
  render(){
    return <div style={{display:'flex'}}>
      <LateralBar/>
      <Scroll/>
    </div>
  }
}

class Albums extends React.Component{
  render(){
    return <div>
      <div className='album'>
        <img className='albumArt'src={this.props.capa[0]}/>
        <div className='textoAlbum'>{this.props.album[0]}</div>
        <div className='textoArtista'>{this.props.artista[0]}</div>
      </div>
      <div className='album'>
        <img className='albumArt'src={this.props.capa[1]}/>
        <div className='textoAlbum'>{this.props.album[1]}</div>
        <div className='textoArtista'>{this.props.artista[1]}</div>
      </div>
      <div className='album'>
        <img className='albumArt'src={this.props.capa[2]}/>
        <div className='textoAlbum'>{this.props.album[2]}</div>
        <div className='textoArtista'>{this.props.artista[2]}</div>
      </div>
    </div>
  }
}