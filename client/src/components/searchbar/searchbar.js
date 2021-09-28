import React from "react";
import AlbumArt from "../AlbumArt/AlbumArt";
import Avatar from "../Avatar/avatar";
import style from './style.module.css';
import OnClickOut from "react-onclickoutside";

const musics = [
    {
        capa: 'http://localhost:8080/api/imgs/albumArt3.png?jwt=Bearer ' + localStorage.getItem('login'),
        album: 'Use Your Ilusion II',
        artista: "Guns N' Roses",
        titulo: 'November Rain'
    },
    {
        capa: 'http://localhost:8080/api/imgs/albumArt4.png?jwt=Bearer ' + localStorage.getItem('login'),
        album: 'In Rainbows',
        artista: 'Radiohead',
        titulo: 'Jigsaw Falling Into Place'
    },
    {
        capa: 'http://localhost:8080/api/imgs/albumArt.png?jwt=Bearer ' + localStorage.getItem('login'),
        album: 'Unplugged',
        artista: 'Alice In Chains',
        titulo: "Down In a Hole",
        id: '60f9a625cd374135bc7d2ebe'
    },
    {
        capa: 'http://localhost:8080/api/imgs/ten.png?jwt=Bearer ' + localStorage.getItem('login'),
        album: 'Ten',
        artista: 'Pearl Jam',
        titulo: 'Alive',
        id: '60ffddbb65f2dd36004ec53a'
    },
    {
        capa: 'http://localhost:8080/api/imgs/albumArt5.png?jwt=Bearer ' + localStorage.getItem('login'),
        album: 'Dolittle',
        titulo: 'Hey',
        artista: 'Pixies'
    },
    {
        capa: 'http://localhost:8080/api/imgs/albumArt6.png?jwt=Bearer ' + localStorage.getItem('login'),
        album: 'In Utero',
        titulo: 'Heart Shaped Box',
        artista: "Nirvana"
    },
    {
        capa: 'http://localhost:8080/api/imgs/ten.png?jwt=Bearer ' + localStorage.getItem('login'),
        album: 'Alive',
        artista: 'Pearl Jam',
        titulo: 'Black'
    },
    {
        capa: 'http://localhost:8080/api/imgs/albumArt8.png?jwt=Bearer ' + localStorage.getItem('login'),
        album: 'Surfer Rosa',
        titulo: 'Gigantic',
        artista: 'Pixies'
    },
    {
        capa: 'http://localhost:8080/api/imgs/albumArt9.png?jwt=Bearer ' + localStorage.getItem('login'),
        album: 'Facelift',
        titulo: 'Man In The Box',
        artista: "Alice In Chains"
    }
];

const artists = [
    {
        foto: 'http://localhost:8080/api/imgs/alice in chains.jpg?jwt=Bearer ' + localStorage.getItem('login'),
        nome: 'Alice In Chains'
    },
    {
        foto: 'http://localhost:8080/api/imgs/radiohead.jpg?jwt=Bearer ' + localStorage.getItem('login'),
        nome: 'Radiohead'
    }
];

class Searchbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.apagarDados = this.apagarDados.bind(this);
    }

    handleChange(e) {
        if (e.target.value) {
            this.setState({
                text: e.target.value,
                data: { musics, artists }
            });
        } else {
            this.apagarDados();
        }
    }

    apagarDados(){
        this.setState({
            text:'',
            data: null
        });
    }

    handleClickOutside(){
        this.setState({
            data: null
        });
    }

    render() {
        return (
            <div className={style.main}>
                <div className={style.searchbar}>
                    <i className="fas fa-search" style={{ color: 'black' }} />
                    <input placeholder="Buscar" onChange={this.handleChange} value={this.state.text} />
                </div>
                {this.state.data ? <Results musics={this.state.data.musics} artists={this.state.data.artists} /> : null}
            </div>
        )
    }
}
export default OnClickOut(Searchbar);

function Results(props) {
    return (
        <div className={style.results}>
            {props.musics.map((music, index) => (
                <div className={style.item} key={index}>
                    <AlbumArt tam='60'>
                        <img src={music.capa} />
                    </AlbumArt>
                    <div className={style.infos}>
                        <h5>{music.titulo}</h5>
                        <h6>{music.album}</h6>
                        <h6>{music.artista}</h6>
                    </div>
                </div>
            ))}
            {props.artists.map((artist, index) => (
                <div className={style.item} key={index}>
                    <Avatar tam='60'>
                        <img src={artist.foto} />
                    </Avatar>
                    <div className={style.infos}>
                        <h5>{artist.nome}</h5>
                    </div>
                </div>
            ))}
        </div>
    )
}