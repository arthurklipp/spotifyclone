import React, { Component } from 'react';
import ReactAudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './style.css';

export class Player extends Component {

  constructor(props){
    super(props);
    this.esconderAlbum = this.esconderAlbum.bind(this);
  }

  esconderAlbum() {
    var elem = document.getElementById('musica');
    var elem2 = document.getElementById('footer');
    var pos = 0;
    var pos2 = -204;
    setInterval(frame, 1);
    function frame() {
      if (pos >= -72) {
        pos=pos-3; 
        elem.style.left = pos + "px"; 
      }
      if(pos2<0){
          pos2=pos2+4; 
          elem2.style.bottom = pos2 + "px"; 
      }
    }
  }

  render() {
    return (
          <div className="player">
            <musica  id="musica">
              <img  id="imgPlayer" src='albums/albumArt.png'onClick={this.esconderAlbum}/>
              <div id="infos">
                <div id="textoAlbumPlayer">No Excuses - Live at the Majestic Theatre, Brooklyn, NY - April 1996</div>
                <div id="artistaPlayer">Alice In Chains</div>
                </div>
            </musica>
            <ReactAudioPlayer className="mainPlayer" src='would.mp3' layout='stacked-reverse' showSkipControls={true} showJumpControls={false} customVolumeControls={[]}/>
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