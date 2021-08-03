import React from 'react';
import Aside from '../Home/Aside/aside';
import LateralBar from '../Home/LateralBar/lateralBar';
import Navbar from '../Home/Navbar/navbar';
import Modal from '../../components/modal/modal';
import { Playlist } from '../Playlist';
import Player from '../Home/Player/player';
import {CabecalhoPerfilPlaylist} from './cabecalhoPerfilPlaylist';
import "./perfil.css";
import api from "../../api";

function UploadFoto(props){
    return<item>
            <h1 className="textoAlbum">Atualizar foto</h1>
            <img src={props.img}/>
            <form onSubmit={props.processUpload}>
                <input id='select' type='file' name='file' ref={props.fileInput}/>
                <input type='submit' value='enviar'/>
            </form>
        </item>;
}

var cont=0;

export class Perfil extends React.Component{
    constructor(props){
        super(props);
            this.state={
                src:localStorage.getItem('perfil'),
                user:localStorage.getItem('user'),
                musica:[{
                    titulo: '',
                    capa: '',
                    album: '',
                    artista: '',
                    src: '',
                }],
                index: 0,
                modal: false
            };
        this.fileInput = React.createRef();
        this.processUpload = this.processUpload.bind(this);
        this.alternarModal = this.alternarModal.bind(this);
        this.avancar = this.avancar.bind(this);
        this.voltar = this.voltar.bind(this);
    }

    avancar(){
        if(this.state.musica.length>cont+1){
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

    processUpload(event){
        event.preventDefault();
        const data = new FormData();
    
        data.append("file", this.fileInput.current.files[0]);
    
        api.post("projects/post", data)
          .then(response => {
            this.setState({src: 'http://localhost:8080/projects/imgs/'+response.data.perfil+'?jwt=Bearer '+localStorage.getItem('login')});
            localStorage.setItem('perfil', 'http://localhost:8080/projects/imgs/'+response.data.perfil+'?jwt=Bearer '+localStorage.getItem('login'));
          })
          .catch(() => {
            console.log("merda");
          });
      };

    alternarModal(e){
        if(e.target.tagName=='MODAL' || e.target.id=='Perfil'){
            this.setState({modal:!this.state.modal});
        };
    }

    async componentDidMount(){
        try{
          var musica=[];
    
          const response = await api.post("projects/musics/show", {music: JSON.parse(localStorage.getItem('fila'))});
          
          response.data.music.map((item)=>{
            musica.push({
              titulo: item.title,
              capa: 'http://localhost:8080/projects/imgs/'+item.playlist.img+'?jwt=Bearer '+localStorage.getItem('login'),
              album: item.playlist.title,
              id: item.playlist._id,
              artista: item.assignedTo.name,
              src: 'http://localhost:8080/projects/music/'+item.title+'.flac?jwt=Bearer '+localStorage.getItem('login')
            });
          });
          if(musica[0]!=null){
            this.setState({
              musica: musica
            });
          }
        }catch(err){
          console.log(err);
        }
      }

    render(){
        return <div className="layout">
            <Modal show={this.state.modal} alternarModal={this.alternarModal}>
                <UploadFoto img={this.state.src} processUpload={this.processUpload} fileInput={this.fileInput}/>
            </Modal>
                <div className="parteCima">
                    <LateralBar/>
                    <main>
                        <Navbar src={this.state.src} user={this.state.user}/>
                        <div id="content">
                            <CabecalhoPerfilPlaylist alternarModal={this.alternarModal}img={this.state.src} titulo="Perfil" nome={this.state.user} subtitulo="1 playlist * 7 seguidores * 14 seguindo"/>
                            <Playlist/>
                        </div>
                    </main>
                    <Aside/>
                    </div>
                    <Player capa={this.state.musica[this.state.index].capa} titulo={this.state.musica[this.state.index].titulo} artista={this.state.musica[this.state.index].artista} musica={this.state.musica[this.state.index].src} avancar={this.avancar} voltar={this.voltar}/>
            </div>
    }
}