import React, { Component } from 'react';
import ReactAudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './style.css';

var cont=0;

export class Player extends Component {

  constructor(props){
    super(props);

    this.esconderAlbum = this.esconderAlbum.bind(this);
    this.mostrarAlbum = this.mostrarAlbum.bind(this);
    this.avancar = this.avancar.bind(this);
    this.voltar = this.voltar.bind(this);
    this.volume = this.volume.bind(this);

    this.state={
        index: 0,
        capa:['albums/albumArt.png','albums/The_Getaway.jpg','albums/albumArt3.png','albums/albumArt4.png','albums/albumArt5.png','albums/albumArt6.png'],
        album:['Unplugged','Stadium Arcadium', 'Use Your Ilusion II','Album 1','Album 2', 'Album 3'],
        musica:['would.mp3','/music/4 - The Longest Wave.flac', '/music/10 - November Rain.flac','/music/9 - Jigsaw Falling Into Place.flac','/music/Hey - Pixies.flac', '/music/Heart-Shaped Box - Nirvana.flac'],
        titulo:['Would','The Longest Wave', 'November Rain','Jigsaw Falling Into Place','Hey', 'Heart-Shaped Box'],
        artista:['Alice In Chains','Red Hot Chili Peppers','Guns N'+' roses','Radiohead','Pixies','Nirvana']
      };
  }

  esconderAlbum() {
    var elem = document.getElementById('musica');
    var elem2 = document.getElementById('footer');
    var pos = 0;
    var pos2 = -110;
    setInterval(frame, 1);
    function frame() {
      if (pos >= -72) {
        pos=pos-3; 
        elem.style.left = pos + "px"; 
      }
      if(pos2<90){
          pos2=pos2+4; 
          elem2.style.bottom = pos2 + "px"; 
      }
    }
  }

  mostrarAlbum() {
    var elem = document.getElementById('musica');
    var elem2 = document.getElementById('footer');
    var pos = -75;
    var pos2 = 90;
    setInterval(frame, 1);
    function frame() {
      if (pos < 0) {
        pos=pos+3; 
        elem.style.left = pos + "px"; 
      }
      if(pos2>=-110){
          pos2=pos2-4; 
          elem2.style.bottom = pos2 + "px"; 
      }
    }
  }

  avancar(){
    if(5>cont){
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

  volume(){
    
  }

  render() {
    return (
          <div className="player">
              <div id='footer'>
                <preto>
                  <div className="iconeAlbum" onClick={this.mostrarAlbum}/>
                </preto>
                <img className="imgAlbum" src={this.state.capa[this.state.index]}/>
              </div>
            <musica  id="musica">
              <img  id="imgPlayer" src={this.state.capa[this.state.index]} onClick={this.esconderAlbum}/>
              <div id="infos">
                <div id="textoAlbumPlayer">{this.state.titulo[this.state.index]}</div>
                <div id="artistaPlayer">{this.state.artista[this.state.index]}</div>
                </div>
            </musica>
            <ReactAudioPlayer className="mainPlayer" src={this.state.musica[this.state.index]} layout='stacked-reverse' showSkipControls={true} showJumpControls={false} /*customVolumeControls={[]}*/ onClickPrevious={this.voltar} onClickNext={this.avancar}/>
            <controles>
              <div className="volume">
                <i className="fas fa-volume-up"></i>
                <input id="barra" type="range" onChange={this.volume}></input>
              </div>
            </controles>
          </div>
    );
  }
}

export default Player