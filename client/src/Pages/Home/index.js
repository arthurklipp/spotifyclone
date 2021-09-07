import React from 'react';
import './home.css';
import Scroll from '../../components/Scroll/scroll';
import api from '../../services/api';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musica: [{
        album: '',
        capa: '',
        artista: '',
        src: ''
      }]
    };
  }

  async componentDidMount() {
    try {
      var musica = [];

      const response = await api.post("api/musics/show", { music: JSON.parse(localStorage.getItem('fila')) });

      response.data.music.map((item) => {
        musica.push({
          titulo: item.title,
          capa: 'http://localhost:8080/api/imgs/' + item.playlist.img + '?jwt=Bearer ' + localStorage.getItem('login'),
          album: item.playlist.title,
          id: item.playlist._id,
          artista: item.assignedTo.name,
          src: 'http://localhost:8080/api/music/' + item.title + '.flac?jwt=Bearer ' + localStorage.getItem('login')
        });
      });

      if (musica[0] != null) {
        this.setState({
          musica: musica
        });
      }

      musica = [];
      var rap = [], brasil = [];

      response.data.rock.map((item) => {
        musica.push({
          album: item.name,
          capa: 'http://localhost:8080/api/imgs/' + item.perfil + '?jwt=Bearer ' + localStorage.getItem('login'),
          id: item._id
        })
      })
      response.data.rap.map((item) => {
        rap.push({
          album: item.name,
          capa: 'http://localhost:8080/api/imgs/' + item.perfil + '?jwt=Bearer ' + localStorage.getItem('login'),
          id: item._id
        })
      })
      response.data.brasil.map((item) => {
        brasil.push({
          album: item.name,
          capa: 'http://localhost:8080/api/imgs/' + item.perfil + '?jwt=Bearer ' + localStorage.getItem('login'),
          id: item._id
        })
      })
      this.setState({
        rock: musica,
        rap: rap,
        brasil: brasil
      });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <div className="scroll">
        <Scroll header="Tocados recentemente" list={this.state.musica} />
        <Scroll header="Rock" list={this.state.rock} tipo={1} />
        <Scroll header="Rap" list={this.state.rap} tipo={1} />
        <Scroll header="Brasil" list={this.state.brasil} tipo={1} />
      </div>
    )
  }
}