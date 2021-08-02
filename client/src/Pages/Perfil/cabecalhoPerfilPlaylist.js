import React from 'react';

export class CabecalhoPerfilPlaylist extends React.Component{

    render(){
        return <div className="headere">
                    <img onClick={this.props.alternarModal} src={this.props.img} id={this.props.titulo}/>
                    <div className="infosPerfil">
                        <p className='texto font-weight-bold'>{this.props.titulo}</p>
                        <h1>{this.props.nome}</h1>
                        <p>{this.props.subtitulo}</p>
                    </div>
                </div>
    }
}