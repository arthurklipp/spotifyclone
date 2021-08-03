import React, { Component } from 'react';
import api from '../../../api';
import Modal from '../../../components/modal/modal';
import './lateralBar.css';

class CriarPlaylist extends Component{
  constructor(props){
    super(props);
    this.state={
      titulo: '',
      descricao: '',
      erro: false
    };
    this.criar=this.criar.bind(this);
  }

  async criar(){
    try{
      await api.post('projects/playlist', {title: this.state.titulo, description: this.state.descricao});
      this.props.esconderModal();
    }catch(err){
      this.setState({erro: true});
    }
  }

  render(){
    return <div className="modalPlaylist">
            <div className="modalItem">
                  <div className="cabecalho">
                    <h5 className="textoAlbum">Criar playlist</h5>
                  </div>
                  <div className="main">
                      <img src={'http://localhost:8080/projects/imgs/album.png?jwt=Bearer '+localStorage.getItem('login')}/>
                      <div className="inputs">
                            <p className="texto">Nome*</p>
                            <input placeholder="Minha playlist" value={this.state.titulo} onChange={(e)=>this.setState({titulo: e.target.value})}/>
                            <Erro erro={this.state.erro}/>
                        <div className="descricao">
                          <p className="texto">Descrição</p>
                          <textarea placeholder="Faça uma descrição sugestiva da sua playlist" value={this.state.descricao} onChange={(e)=>this.setState({descricao: e.target.value})}/>
                          </div>
                        </div>
                    </div>
                    <div className="rodape">
                      <button type="button" id='botaoCriar' className="btn btn-primary btn-lg rounded-pill font-weight-bold">
                            <div className='textoBotao' onClick={this.criar}>CRIAR</div>
                          </button>
                      </div>
                </div>
              </div>
      }
  }

function Erro(props){
  if(!props.erro){
    return null
  }
  return <p className='erro'>Escolha um nome*</p>
}

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
      this.setState({modal:!this.state.modal});
  }

  esconderModal(e){
    if(e.target.tagName=='MODAL'){
          this.setState({modal:!this.state.modal});
      };
  }

  render() {
    return (
      <div className="telaLateralbar">
        <Modal show={this.state.modal} alternarModal={this.esconderModal}>
          <CriarPlaylist esconderModal={this.mostrarModal}/>
        </Modal>
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
        </div>
    );
  }
}

export default LateralBar