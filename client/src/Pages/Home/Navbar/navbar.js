import React from 'react';
import './style.css';

export default class Navbar extends React.Component{
    render(){
        return <div id='navbar'>
            <i className="seta fas fa-chevron-left"></i>
            <i className="seta fas fa-chevron-right"></i>
            <input id="barraPesquisa" placeholder='Buscar'></input>
            <button type="button" id='botaoUpgrade' className="btn btn-primary btn-block rounded-pill font-weight-bold">
                    <div className='textoBotao'>FAZER UPGRADE</div>
            </button>
            <a className="d-flex"href="/perfil">
                <img id='foto' src={this.props.src}/>
                <p id='nome' className="branco">{this.props.user}</p>
                </a>
                <i id="seta" className="fas fa-chevron-down"></i>
        </div>
        
    }
};