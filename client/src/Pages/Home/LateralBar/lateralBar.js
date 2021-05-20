import React, { Component } from 'react';
import './lateralBar.css';


export class LateralBar extends Component {
  constructor(props){
    super(props);
    this.mostrarModal = this.mostrarModal.bind(this);
    this.esconderModal = this.esconderModal.bind(this);
    this.state={
      modal:false
    };
  }

  mostrarModal(){
    this.state.modal ? (this.setState({modal:false})): (this.setState({modal:true}));
  }

  esconderModal(event){
      let modal=document.getElementsByClassName("modalPlaylist");
      console.log(event.target);
      console.log(modal);
      if (event.target == modal[0]) {
          this.setState({modal:false})
      }
  }
  
  render() {
    return (
      <div className="telaLateralbar">
        <div onClick={this.esconderModal} className={this.state.modal?("modalPlaylist"):("modalPlaylist invisible")}>
            <div className="modalItem">
              <div className="cabecalho">
                <h5 className="textoAlbum">Criar playlist</h5>
              </div>
              <div className="main">
                  <img src="album.png"/>
                  <div className="inputs">
                        <p className="texto">Nome</p>
                        <input placeholder="Minha playlist"/>
                    <div className="descricao">
                      <p className="texto">Descrição</p>
                      <textarea placeholder="Faça uma descrição sugestiva da sua playlist"/>
                      </div>
                    </div>
                </div>
                <div className="rodape">
                  <button type="button" id='botaoCriar' className="btn btn-primary btn-lg rounded-pill font-weight-bold">
                        <div className='textoBotao' >CRIAR</div>
                      </button>
                  </div>
            </div>
          </div>
          <div className='lateralBar'>
                <div className='header'>
                    <h1>...</h1>
                </div>
                <div className='nav'>
                  <a href="/home"className='navItem'>
                    <i className="fas fa-home fa-2x"></i>
                    <p className='texto font-weight-bold'>Inicio</p>
                  </a>
                  <div className='navItem'>
                    <i className="fas fa-compact-disc fa-2x"></i>
                    <p className='texto font-weight-bold'>Navegar</p>
                  </div>
                  <div className='navItem'>
                  <i className="fas fa-broadcast-tower fa-2x"></i>
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
          <div onClick={this.mostrarModal} className='novaPlaylist'>
                  <i className="far fa-plus-square fa-2x mr-2 espaco"></i>
                  <p className='texto ml-0 espaco'>Nova playlist</p>
              </div>
              <img className='footer' src='albums/albumArt.png'/>
        </div>
    );
  }
}

export default LateralBar