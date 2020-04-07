import React, { Component } from 'react';
import './lateralBar.css';


export class LateralBar extends Component {
  
  render() {

    return (
      <div>
      <div className='lateralBar'>
            <div className='header'>
                <h1>...</h1>
            </div>
            <div className='nav'>
              <div className='navItem'>
                <i class="fas fa-home fa-2x"></i>
                <p className='texto font-weight-bold'>Inicio</p>
              </div>
              <div className='navItem'>
                <i class="fas fa-compact-disc fa-2x"></i>
                <p className='texto font-weight-bold'>Navegar</p>
              </div>
              <div className='navItem'>
              <i class="fas fa-broadcast-tower fa-2x"></i>
                <p className='texto font-weight-bold'>Rádio</p>
              </div>
            </div>
            <div className='navScroll'>
              <p className='title'>SUA BIBLIOTECA</p>
              <p className='texto font-weight-bold'>Feito para você</p>
              <p className='texto font-weight-bold'>Tocados recentemente</p>
              <p className='texto font-weight-bold'>Músicas Curtidas</p>
              <p className='texto font-weight-bold'>Álbuns</p>
              <p className='texto font-weight-bold'>Artistas</p>
              <p className='texto font-weight-bold'>Podcasts</p>
              <p className='title'>PLAYLISTS</p>
              <p className='texto'>Minha playlist#1</p>
              <p className='texto'>Descobertas da Semana</p>
            </div>
        </div>
        <div className='novaPlaylist'>
                <i class="far fa-plus-square fa-2x mr-2 espaco"></i>
                <p className='texto ml-0 espaco'>Nova playlist</p>
            </div>
        <div className='footer'>
          <img className='footer' src='albums/albumArt.png'/>
        </div>
        </div>
    );
  }
}

export default LateralBar