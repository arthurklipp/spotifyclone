import React from 'react';

export function CabecalhoPerfilPlaylist(props){
        return (<div className="headere">
                    <img onClick={props.alternarModal} src={props.img} id={props.titulo}/>
                    <div className="infosPerfil">
                        <p className='texto font-weight-bold'>{props.titulo}</p>
                        <h1>{props.nome}</h1>
                        <p>{props.subtitulo}</p>
                    </div>
                </div>)
}