import React, { Component } from 'react';
import ReactAudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './style.css';

export class Player extends Component {

  constructor(props){
    super(props);

    this.esconderAlbum = this.esconderAlbum.bind(this);
    this.mostrarAlbum = this.mostrarAlbum.bind(this);
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

  render() {
    return (
          <div className="player">
              <div id='footer'>
                <preto>
                  <div className="iconeAlbum" onClick={this.mostrarAlbum}/>
                </preto>
                <img className="imgAlbum" src={this.props.capa}/>
              </div>
            <musica  id="musica">
              <img  id="imgPlayer" src={this.props.capa} onClick={this.esconderAlbum}/>
              <div id="infos">
                <div id="textoAlbumPlayer">{this.props.titulo}</div>
                <div id="artistaPlayer">{this.props.artista}</div>
                </div>
            </musica>
            <ReactAudioPlayer className="mainPlayer" src={this.props.musica} layout='stacked-reverse' autoPlayAfterSrcChange={false} showSkipControls={true} showJumpControls={false} /*customVolumeControls={[]}*/ onClickPrevious={this.props.voltar} onClickNext={this.props.avancar}/>
            <controles>
              <div className="volume">
                <i className="fas fa-volume-up"></i>
                <input id="barra" type="range"></input>
              </div>
            </controles>
          </div>
    );
  }
}

export default Player