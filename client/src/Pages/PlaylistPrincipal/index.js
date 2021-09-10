import React from 'react';
import { CabecalhoPerfilPlaylist } from '../Perfil/cabecalhoPerfilPlaylist';
import "./style.css";
import api from '../../services/api';

export class PlaylistPrincipal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: null,
            foto: null,
            tipo: null,
            autor: null,
            musicas: []
        };
        this.processUpload = this.processUpload.bind(this);
        this.apagarPlaylist = this.apagarPlaylist.bind(this);
        this.fileInput = React.createRef();
    }

    processUpload(event) {
        event.preventDefault();
        const data = new FormData();

        data.append("file", this.fileInput.current.files[0]);

        api.post("api/playlistimg/" + this.props.match.params.id, data)
            .then(response => {
                window.location.reload();
            })
            .catch(() => {
                console.log("erro");
            });
    };

    async apagarPlaylist(){
        try {
            await api.delete('/api/'+this.props.match.params.id);
            this.props.history.push('/perfil/'+this.state.id);
        } catch (error) {
            console.log(error);
        }
    }

    async componentDidMount() {
        try {
            const res = await api.get('/api/playlists/' + this.props.match.params.id);

            this.setState({
                nome: res.data.playlist.title,
                foto: 'http://localhost:8080/api/imgs/' + res.data.playlist.img + '?jwt=Bearer ' + localStorage.getItem('login'),
                tipo: res.data.playlist.description,
                autor: res.data.playlist.user.name,
                id: res.data.playlist.user._id
            });

            this.setState({
                musicas: res.data.musicas
            });

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let opcoes;
        if(this.state.id===localStorage.getItem('id')){
            opcoes=<Opcoes funcao={this.apagarPlaylist}/>
        }
        return (
            <div>
                <CabecalhoPerfilPlaylist processUpload={this.processUpload} fileInput={this.fileInput} id={this.state.id} img={this.state.foto} titulo={this.state.tipo} nome={this.state.nome} subtitulo={this.state.autor + ', ' + this.state.musicas.length + ' musicas'} />
                {opcoes}
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
            {props.children.map((musica, i) => (
                <div className="filaItem" key={musica._id}>
                    <span className="texto">{i + 1}</span>
                    <img src={'http://localhost:8080/api/imgs/' + musica.playlist.img + '?jwt=Bearer ' + localStorage.getItem('login')} />
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

class Opcoes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdown: false
        }
        this.altDropdown = this.altDropdown.bind(this);
    }

    altDropdown(){
        this.setState({
            dropdown: !this.state.dropdown
        });
    }

    render() {
        return (
            <div>
                <div onClick={this.altDropdown} className="opcoes">
                    <p>...</p>
                </div>
                <Dropdown apagarPlaylist={this.props.funcao} display={this.state.dropdown}/>
            </div>
        )
    }
}

function Dropdown(props){
    
    let classe;

    if(props.display){
        classe = "dropdown";
    }else{
        classe = "dropdown d-none";
    }

    return(
        <div className={classe}>
                    <div onClick={props.apagarPlaylist} className="item">
                        <h6>Apagar playlist</h6>
                    </div>
                </div>
    )
}