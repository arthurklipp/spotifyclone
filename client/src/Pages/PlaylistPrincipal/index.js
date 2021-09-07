import React from 'react';
import { CabecalhoPerfilPlaylist } from '../Perfil/cabecalhoPerfilPlaylist';
import "./style.css";
import api from '../../api';

export class PlaylistPrincipal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: null,
            foto: null,
            tipo: null,
            autor: null,
            musicas:[]
        };
    }

    async componentDidMount() {
        try {
            const res = await api.get('/api/playlists/' + this.props.match.params.id);

            this.setState({
                nome: res.data.playlist.title,
                foto: 'http://localhost:8080/api/imgs/' + res.data.playlist.img + '?jwt=Bearer ' + localStorage.getItem('login'),
                tipo: res.data.playlist.description,
                autor: res.data.playlist.user.name
            });

            this.setState({
                musicas: res.data.musicas
            });

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div id="content">
                <CabecalhoPerfilPlaylist img={this.state.foto} titulo={this.state.tipo} nome={this.state.nome} subtitulo={this.state.autor+', '+this.state.musicas.length+' musicas'} />
                <div id="fila">
                    <Musicas>
                        {this.state.musicas}
                    </Musicas>
                </div>
            </div>
        )
    }
}

function Musicas(props) {
    return (
        <div>
            {props.children.map((musica, id) => (
                <div className="filaItem" key={id}>
                    <span className="texto">{id + 1}</span>
                    <img src={'http://localhost:8080/api/imgs/' + musica.playlist.img + '?jwt=Bearer ' + localStorage.getItem('login')}/>
                    <div className="infos-musica">
                        <span className="titulo">{musica.title}</span>
                        <span className="texto">{musica.assignedTo.name}</span>
                    </div>
                    <span className="texto">2:53</span>
                </div>
            ))}
        </div>
    )
}