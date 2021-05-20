import React, { Component } from 'react';
import ReactAudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './style.css';

export class Player extends Component {

  render() {
    return (
          <ReactAudioPlayer className= 'player' src='would.mp3'/>
    );
  }
}

export default Player