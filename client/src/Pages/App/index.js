import React from 'react';
import './home.css';
import Scroll from './Scroll/scroll';
import LateralBar from './LateralBar/lateralBar';
import Aside from './Aside/aside';
import Navbar from './Navbar/navbar';
import Player from './Player/player';
import {Perfil} from '../Perfil';
import api from '../../api';
import { Switch, Route } from 'react-router-dom';
import { PlaylistPrincipal } from '../PlaylistPrincipal';

var cont = 0;

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.avancar = this.avancar.bind(this);
    this.voltar = this.voltar.bind(this);
    this.state = {
      src: localStorage.getItem('perfil'),
      user: localStorage.getItem('user'),
      musica: [{
        album: '',
        capa: '',
        artista: '',
        src: ''
      }],
      index: 0
    };
  }

  avancar() {
    if (this.state.musica.length > cont + 1) {
      cont++;
      this.setState({ index: cont });
    }
  }

  voltar() {
    if (cont > 0) {
      cont--;
      this.setState({ index: cont });
    }
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
      <div className="layout">
        <div className="parteCima">
          <LateralBar />
          <main>
            <Navbar src={this.state.src} user={this.state.user} />
            <Switch>
              <Route path="/" exact>
                <div className="scroll">
                  <Scroll header="Tocados recentemente" list={this.state.musica} />
                  <Scroll header="Rock" list={this.state.rock} tipo={1} />
                  <Scroll header="Rap" list={this.state.rap} tipo={1} />
                  <Scroll header="Brasil" list={this.state.brasil} tipo={1} />
                </div>
              </Route>
              <Route path="/perfil/:id" component={Perfil}/>
              <Route path="/playlist/:id" component={PlaylistPrincipal}/>
            </Switch>
          </main>
          <Aside />
        </div>
        <Player capa={this.state.musica[this.state.index].capa} titulo={this.state.musica[this.state.index].titulo} artista={this.state.musica[this.state.index].artista} musica={this.state.musica[this.state.index].src} avancar={this.avancar} voltar={this.voltar} />
      </div>
    )
  }
}