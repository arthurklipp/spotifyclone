import React, { Component } from 'react';
import "./aside.css";
import Avatar from '../Avatar/avatar';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export class Aside extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            following: []
        };
    }

    async componentDidMount() {
        const following = await api.get('/api/follow');

        this.setState({
            following: following.data.resp
        });
    }
    render() {
        return (
            this.state.following[0] ? <Amigos amigos={this.state.following} /> : <SemAmigos />
        )
    }
}

function SemAmigos(props) {
    return (
        <div id="aside">
            <div id="asideItem">
                <p id="textoAside" className="branco font-weight-bold">Veja o que seus amigos estão tocando</p>
                <button type="button" id='botaoAmigos' className="btn btn-primary btn-block rounded-pill font-weight-bold">
                    <div className='textoBotao'>ENCONTRAR AMIGOS</div>
                </button>
            </div>
        </div>
    )
}

function Amigos(props) {

    const url = localStorage.getItem('URL');
    const token = '?jwt=Bearer ' + localStorage.getItem('login');

    return (
        <div className='amigos'>
            <div className="d-flex mt-1 align-items-center justify-content-center" style={{ height: '50px' }}>
                <h5 className='font-weight-bold text-light'>Lista de amigos</h5>
            </div>
            {props.amigos.map((usuario) =>
                <div key={usuario.name} className='usuario'>
                    <Avatar tam='45'>
                        <img src={url + usuario.perfil + token} />
                    </Avatar>
                    <div style={{ display: 'block' }}>
                        <Link to={'/perfil/' + usuario._id}>
                            <div className='textoAlbum mb-1'>{usuario.name}</div>
                        </Link>
                        <h6>Medo da chuva</h6>
                        <h6>Raul Seixas</h6>
                    </div>
                </div>
            )}
        </div>
    )
}