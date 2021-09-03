import React from 'react';
import Scroll from '../App/Scroll/scroll';
import { CabecalhoPerfilPlaylist } from './cabecalhoPerfilPlaylist';
import "./perfil.css";
import api from "../../api";

function UploadFoto(props) {
  return <item>
    <h1 className="textoAlbum">Atualizar foto</h1>
    <img src={props.img} />
    <form onSubmit={props.processUpload}>
      <input id='select' type='file' name='file' ref={props.fileInput} />
      <input type='submit' value='enviar' />
    </form>
  </item>;
}


export class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src:'',
      nome:'',
      playlists:[{
        capa:'',
        album:'',
        id:''
      }]
    };
    this.fileInput = React.createRef();
  }

  processUpload(event) {
    event.preventDefault();
    const data = new FormData();

    data.append("file", this.fileInput.current.files[0]);

    api.post("projects/post", data)
      .then(response => {
        this.setState({ src: 'http://localhost:8080/projects/imgs/' + response.data.perfil + '?jwt=Bearer ' + localStorage.getItem('login') });
        localStorage.setItem('perfil', 'http://localhost:8080/projects/imgs/' + response.data.perfil + '?jwt=Bearer ' + localStorage.getItem('login'));
      })
      .catch(() => {
        console.log("erro");
      });
  };

  alternarModal(e) {
    if (e.target.tagName == 'MODAL' || e.target.id == 'Perfil') {
      this.setState({ modal: !this.state.modal });
    };
  }

  async componentDidMount() {
    try {
      const res = await api.get('/api/'+this.props.match.params.id);

      this.setState({
        src: 'http://localhost:8080/api/imgs/' + res.data.user.perfil + '?jwt=Bearer ' + localStorage.getItem('login'),
        nome: res.data.user.name
      });

      let playlists = definirPlaylists(res.data.playlists);

      this.setState({
        playlists: playlists
      });

    } catch (error) {
      console.log(error);
    }
  }

  async componentDidUpdate(prevProps){
    if(this.props.match.params.id===prevProps.match.params.id){
      return
    }

    try {
      const res = await api.get('/api/'+this.props.match.params.id);
      
      this.setState({
        src: 'http://localhost:8080/api/imgs/' + res.data.user.perfil + '?jwt=Bearer ' + localStorage.getItem('login'),
        nome: res.data.user.name
      });

      let playlists = definirPlaylists(res.data.playlists);

      this.setState({
        playlists: playlists
      });

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    
    return (
      <div id="content">
        <CabecalhoPerfilPlaylist img={this.state.src} titulo="Perfil" nome={this.state.nome} subtitulo="1 playlist * 7 seguidores * 14 seguindo" />
        <Scroll header="Playlists" list={this.state.playlists}/>
      </div>
    )
  }
}

function definirPlaylists(playlists){

  var playlistDefinida=[];

  playlists.map(item =>{
    playlistDefinida.push({
      capa: 'http://localhost:8080/api/imgs/' + item.img + '?jwt=Bearer ' + localStorage.getItem('login'),
      album: item.title,
      id: item._id
    });
  })

  return playlistDefinida
}