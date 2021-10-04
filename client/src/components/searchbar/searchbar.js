import React from "react";
import AlbumArt from "../AlbumArt/AlbumArt";
import Avatar from "../Avatar/avatar";
import style from './style.module.css';
import OnClickOut from "react-onclickoutside";
import api from '../../services/api';
import { Link } from "react-router-dom";


class Searchbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.apagarDados = this.apagarDados.bind(this);
        this.buscarDados = this.buscarDados.bind(this);
    }

    handleChange(e) {
        if (e.target.value) {
            this.setState({
                text: e.target.value
            });
            this.buscarDados(e.target.value);
        } else {
            this.apagarDados();
        }
    }

    async buscarDados(e) {
        try {
            const res = await api.get('/api/search/' + e);
            const musics = res.data.music;
            const artists = res.data.artists;
            this.setState({
                data: { musics, artists }
            });
        } catch (error) {
            console.log(error);
        }
    }

    apagarDados() {
        this.setState({
            text: '',
            data: null
        });
    }

    handleClickOutside() {
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

    const url = localStorage.getItem('URL');
    const token = '?jwt=Bearer ' + localStorage.getItem('login');

    return (
        <div className={style.results}>
            {props.musics.map((music, index) => (
                <div className={style.item} key={index}>
                    <AlbumArt tam='60'>
                        <img src={url + music.playlist.img + token} />
                    </AlbumArt>
                    <div className={style.infos}>
                        <h5 className='text-truncate'>{music.title}</h5>
                        <h6>{music.playlist.title}</h6>
                        <h6>{music.assignedTo.name}</h6>
                    </div>
                </div>
            ))}
            {props.artists.map((artist, index) => (
                <Link to={'/perfil/'+artist._id}>
                    <div className={style.item} key={index}>
                        <Avatar tam='60'>
                            <img src={url + artist.perfil + token} />
                        </Avatar>
                        <div className={style.infos}>
                            <h5>{artist.name}</h5>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}