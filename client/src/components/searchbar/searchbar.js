import React from "react";
import AlbumArt from "../AlbumArt/AlbumArt";
import Avatar from "../Avatar/avatar";
import style from './style.module.css';

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
    },
];

const artists = [
    {
        foto: 'http://localhost:8080/api/imgs/alice in chains.jpg?jwt=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMmI5YTAxNTlhODkwMTY5MGU0ZmRkZiIsImlhdCI6MTYzMjY2MTMxOSwiZXhwIjoxNjMyNzQ3NzE5fQ.HRlK6p3oLUcDVhVrmo4ZAbVe9ldpZhc9bcceJWA8LkY',
        nome: 'Alice In Chains'
    },
    {
        foto: 'http://localhost:8080/api/imgs/radiohead.jpg?jwt=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMmI5YTAxNTlhODkwMTY5MGU0ZmRkZiIsImlhdCI6MTYzMjY2MTMxOSwiZXhwIjoxNjMyNzQ3NzE5fQ.HRlK6p3oLUcDVhVrmo4ZAbVe9ldpZhc9bcceJWA8LkY',
        nome: 'Radiohead'
    }
];

export default function Searchbar(props) {
    return (
        <div className={style.main}>
            <div className={style.searchbar}>
                <i className="fas fa-search" style={{ color: 'black' }} />
                <input placeholder="Buscar" />
            </div>
            <div className={style.results}>
                {musics.map((music, index) => (
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
                {artists.map((artist, index) => (
                    <div className={style.item} key={index}>
                        <Avatar tam='60'>
                            <img src={artist.foto}/>
                        </Avatar>
                        <div className={style.infos}>
                            <h5>{artist.nome}</h5>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}