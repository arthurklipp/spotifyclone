import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default class Navbar extends React.Component {
    render() {
        return <div id='navbar'>
            <i className="seta fas fa-chevron-left"></i>
            <i className="seta fas fa-chevron-right"></i>
            <pesquisa>
                <i class="fas fa-search" />
                <input placeholder="Buscar" />
            </pesquisa>
            <button type="button" id='botaoUpgrade' className="btn btn-primary btn-block rounded-pill font-weight-bold">
                <div className='textoBotao'>FAZER UPGRADE</div>
            </button>
            <Link to={"/perfil/?id=" + localStorage.getItem('id')}>
                <a className="d-flex">
                    <img id='foto' src={this.props.src} />
                    <p id='nome' className="branco">{this.props.user}</p>
                </a>
            </Link>
            <i id="seta" className="fas fa-chevron-down"></i>
        </div>

    }
};