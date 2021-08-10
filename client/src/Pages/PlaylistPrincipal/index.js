import React from 'react';
import {CabecalhoPerfilPlaylist} from '../Perfil/cabecalhoPerfilPlaylist';
import Aside from '../Home/Aside/aside';
import LateralBar from '../Home/LateralBar/lateralBar';
import Modal from '../../components/modal/modal';
import Navbar from '../Home/Navbar/navbar';
import { Playlist } from '../Playlist';
import Player from '../Home/Player/player';
import "./style.css";
import api from '../../api';

const list=[];
var cont=0;

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

export class PlaylistPrincipal extends React.Component{
    constructor(props){
        super(props);
        this.fileInput = React.createRef();
        this.avancar = this.avancar.bind(this);
        this.voltar = this.voltar.bind(this);
        this.trocarMusica = this.trocarMusica.bind(this);
        this.processUpload = this.processUpload.bind(this);
        this.alternarModal = this.alternarModal.bind(this);
        this.state={
            index: 0,
            modal: false,
            tipo:'Playlist',
            userID: null,
            src: localStorage.getItem('perfil'),
            user: localStorage.getItem('user'),
            musica:[{
                titulo: '',
                capa: '',
                artista: '',
                src:''
            }]
        };
    }

    avancar(){
        if(this.state.titulo.length>cont+1){
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

      trocarMusica(e){
        cont=e.target.getAttributeNode("valor").value;
        this.setState({index:cont});
    }

    processUpload(event){
        event.preventDefault();
        const data = new FormData();
    
        data.append("file", this.fileInput.current.files[0]);

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
    
        api.post("projects/playlistImg/"+id, data)
          .then(response => {
            this.setState({capa: 'http://localhost:8080/projects/imgs/'+response.data.img+'?jwt=Bearer '+localStorage.getItem('login')});
          })
          .catch((err) => {
            console.log(err);
          });
      };

    alternarModal(e){
        if(e.target.tagName=='MODAL' || e.target.id=='Album' || e.target.id=='Playlist'){
            this.setState({modal:!this.state.modal});
        };
    }

    async componentDidMount(){
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');

      try{
        var response = await api.get("projects/playlists/"+id);
              
        var musica=[];

        this.setState({
            userID: response.data.playlist.user._id
        });
                
                if(response.data.playlist.description=='Album'){
                    this.setState({
                        tipo: 'Album'
                    });
                    response.data.musicas.map((item)=>{
                        musica.push({
                            titulo: item.title,
                            capa: 'http://localhost:8080/projects/imgs/'+response.data.playlist.img+'?jwt=Bearer '+localStorage.getItem('login'),
                            album: response.data.playlist.title,
                            artista: response.data.playlist.user.name,
                            src: 'http://localhost:8080/projects/music/'+item.title+'.flac?jwt=Bearer '+localStorage.getItem('login')
                            });
                    });
                    this.setState({
                        capa: 'http://localhost:8080/projects/imgs/'+response.data.playlist.img+'?jwt=Bearer '+localStorage.getItem('login'),
                        titulo: response.data.playlist.title,
                        autor: response.data.playlist.user.name
                    });
                }else{
                    this.setState({
                        capa: 'http://localhost:8080/projects/imgs/'+response.data.playlist.img+'?jwt=Bearer '+localStorage.getItem('login'),
                        titulo: response.data.playlist.title,
                        autor: response.data.playlist.user.name
                    });
                    const IDmusicas = response.data.musicas.map((item)=>{return item.assignedTo});
                    response = await api.post("projects/musics/show", {music: IDmusicas});
                    response.data.music.map((item)=>{
                        musica.push({
                            titulo: item.title,
                            capa: 'http://localhost:8080/projects/imgs/'+item.playlist.img+'?jwt=Bearer '+localStorage.getItem('login'),
                            album: item.playlist.title,
                            artista: item.assignedTo.name,
                            src: 'http://localhost:8080/projects/music/'+item.title+'.flac?jwt=Bearer '+localStorage.getItem('login')
                            });
                    });
                }

                if(musica[0]!=null){
                    this.setState({
                        musica: musica
                    });
                }
      }catch(response){
                console.log(response);
              };
    }

    render(){
        let modal;

        if(this.state.userID==localStorage.getItem('id')){
            modal = <Modal show={this.state.modal} alternarModal={this.alternarModal}>
                        <UploadFoto img={this.state.capa} processUpload={this.processUpload} fileInput={this.fileInput}/>
                    </Modal>
        }
        return <div>
            {modal}
            <div className="layout">
                <div className="parteCima">
                    <LateralBar/>
                    <main>
                        <Navbar src={this.state.src} user={this.state.user}/>
                        <div id="content">
                            <CabecalhoPerfilPlaylist alternarModal={this.alternarModal} img={this.state.capa} titulo={this.state.tipo} nome={this.state.titulo} subtitulo={this.state.autor+', '+this.state.musica.length+' musicas'}/>
                            <div id="fila">
                                <div>
                                    {this.state.musica.map((list, n)=><Fila trocarMusica={this.trocarMusica}list={list} n={n}/>)}
                                    </div>
                            </div>
                        </div>
                    </main>
                    <Aside/>
                    </div>
                    <Player capa={this.state.musica[this.state.index].capa} titulo={this.state.musica[this.state.index].titulo} artista={this.state.musica[this.state.index].artista} musica={this.state.musica[this.state.index].src} avancar={this.avancar} voltar={this.voltar}/>
            </div>
        </div>
    }
}

function Fila(props){
    if(props.list.titulo==''){
        return <div className="filaItem" onClick={props.trocarMusica} valor={props.n}>
                <h6 id="titulo" valor={props.n}>SEM MUSICAS</h6>
            </div>
    }
    return <div className="filaItem" onClick={props.trocarMusica} valor={props.n}>
    <h6 valor={props.n}>{props.n+1}</h6>
    <img src={props.list.capa} valor={props.n}/>
    <div className="textoFila" valor={props.n}>
        <h6 id="titulo" valor={props.n}>{props.list.titulo}</h6>
        <h6 valor={props.n}>{props.list.artista}</h6>
    </div>
    <h6 id="tituloAlbum" valor={props.n}>{props.list.album}</h6>
    <div className="tempoItem">
        <h6 valor={props.n}>4:56</h6>
    </div>
</div>
}