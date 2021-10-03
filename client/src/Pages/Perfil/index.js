import React from 'react';
import Scroll from '../../components/Scroll/scroll';
import { CabecalhoPerfil } from './cabecalhoPerfil';
import "./perfil.css";
import api from "../../services/api";
import { User } from '../../App';

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
  }

  async componentDidMount() {
    try {
      const res = await api.get('/api/listplaylist/' + this.props.match.params.id);

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
      const res = await api.get('/api/listplaylist/' + this.props.match.params.id);

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
        {
        this.props.match.params.id===localStorage.getItem('id')?
        <User.Consumer>
          {({img, upload, fileInput})=>(
            <CabecalhoPerfil processUpload={upload} fileInput={fileInput} id={this.props.match.params.id} img={img} titulo="Perfil" nome={this.state.nome} subtitulo="1 playlist * 7 seguidores * 14 seguindo" />
          )}
        </User.Consumer>
        :
        <CabecalhoPerfil id={this.props.match.params.id} img={this.state.src} titulo="Perfil" nome={this.state.nome} subtitulo="1 playlist * 7 seguidores * 14 seguindo" />
      }
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