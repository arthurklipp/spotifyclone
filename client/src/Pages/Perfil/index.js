import React from 'react';
import Scroll from '../../components/Scroll/scroll';
import { CabecalhoPerfilPlaylist } from './cabecalhoPerfilPlaylist';
import "./perfil.css";
import api from "../../services/api";

export class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
      nome: '',
      playlists: [{
        capa: '',
        album: '',
        id: ''
      }]
    };
    this.processUpload = this.processUpload.bind(this);
    this.fileInput = React.createRef();
  }

  processUpload(event) {
    event.preventDefault();
    const data = new FormData();

    data.append("file", this.fileInput.current.files[0]);

    api.post("api/post", data)
      .then(response => {
        localStorage.setItem('perfil', 'http://localhost:8080/api/imgs/' + response.data.perfil + '?jwt=Bearer ' + localStorage.getItem('login'));
        window.location.reload();
      })
      .catch(() => {
        console.log("erro");
      });
  };

  async componentDidMount() {
    try {
      const res = await api.get('/api/' + this.props.match.params.id);

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

  async componentDidUpdate(prevProps) {
    if (this.props.match.params.id === prevProps.match.params.id) {
      return
    }

    try {
      const res = await api.get('/api/' + this.props.match.params.id);

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
        <CabecalhoPerfilPlaylist processUpload={this.processUpload} fileInput={this.fileInput} id={this.props.match.params.id} img={this.state.src} titulo="Perfil" nome={this.state.nome} subtitulo="1 playlist * 7 seguidores * 14 seguindo" />
        <Scroll header="Playlists" list={this.state.playlists} />
      </div>
    )
  }
}

function definirPlaylists(playlists) {

  var playlistDefinida = [];

  playlists.map(item => {
    playlistDefinida.push({
      capa: 'http://localhost:8080/api/imgs/' + item.img + '?jwt=Bearer ' + localStorage.getItem('login'),
      album: item.title,
      id: item._id
    });
  })

  return playlistDefinida
}