import React, { Component } from 'react';
import "./aside.css";
import Avatar from '../Avatar/avatar';

export function Aside(props) {
    return (
        true === false ? <SemAmigos /> : <Amigos amigos={amigos} />
    )
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

const amigos = [
    {
        nome: 'Arthur',
        foto: localStorage.getItem('perfil'),
        musica: 'Medo da chuva',
        artista: 'Raul Seixas'
    },
    {
        nome: 'Joao',
        foto: localStorage.getItem('perfil'),
        musica: 'Medo da chuva',
        artista: 'Raul Seixas'
    },
    {
        nome: 'Pedrao',
        foto: localStorage.getItem('perfil'),
        musica: 'Medo da chuva',
        artista: 'Raul Seixas'
    },
    {
        nome: 'Antonio',
        foto: localStorage.getItem('perfil'),
        musica: 'Medo da chuva',
        artista: 'Raul Seixas'
    },
    {
        nome: 'Rafaela',
        foto: localStorage.getItem('perfil'),
        musica: 'Medo da chuva',
        artista: 'Raul Seixas'
    },
    {
        nome: 'Pietra',
        foto: localStorage.getItem('perfil'),
        musica: 'Medo da chuva',
        artista: 'Raul Seixas'
    },
    {
        nome: 'Gabriela',
        foto: localStorage.getItem('perfil'),
        musica: 'Medo da chuva',
        artista: 'Raul Seixas'
    },
    {
        nome: 'Maria',
        foto: localStorage.getItem('perfil'),
        musica: 'Medo da chuva',
        artista: 'Raul Seixas'
    },
    {
        nome: 'Joaquina',
        foto: localStorage.getItem('perfil'),
        musica: 'Medo da chuva',
        artista: 'Raul Seixas'
    }
];

function Amigos(props) {
    return (
        <div className='amigos'>
            <div className="d-flex mt-1 align-items-center justify-content-center" style={{height:'50px'}}>
                <h5 className='font-weight-bold text-light'>Lista de amigos</h5>
            </div>
            {props.amigos.map((usuario) =>
                <div key={usuario.nome} className='usuario'>
                    <Avatar tam='45'>
                        <img src={usuario.foto}/>
                    </Avatar>
                    <div style={{ display: 'block' }}>
                        <div className='textoAlbum mb-1'>{usuario.nome}</div>
                        <h6>{usuario.musica}</h6>
                        <h6>{usuario.artista}</h6>
                    </div>
                </div>
            )}
        </div>
    )
}