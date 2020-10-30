import React from 'react';
import './style.css';

export default class Navbar extends React.Component{
    render(){
        return <div id='navbar'>
            <i class="seta fas fa-chevron-left"></i>
            <i class="seta fas fa-chevron-right"></i>
            <input id="barraPesquisa" placeholder='Buscar'></input>
            <button type="button" id='botaoUpgrade'class="btn btn-primary btn-block rounded-pill font-weight-bold">
                    <div className='textoBotao'>FAZER UPGRADE</div>
            </button>
            <a className="d-flex"href="/perfil">
                <img id='foto' src='HIHI.png'/>
                <p id='nome' className="branco">Arthur Klipp Zenzeluk</p>
                </a>
                <i id="seta" class="fas fa-chevron-down"></i>
        </div>
        
    }
};