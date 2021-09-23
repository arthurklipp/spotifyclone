import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../App';
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
            <Link to={"/perfil/" + localStorage.getItem('id')}>
                <div className="d-flex">
                    <User.Consumer>
                        {({ img }) => (
                            <div id='foto'>
                                <img src={img}/>
                            </div>
                        )}
                    </User.Consumer>
                    <p id='nome' className="branco">{this.props.user}</p>
                </div>
            </Link>
            <Link to="/login">
                <i id="seta" className="fas fa-chevron-down"></i>
            </Link>
        </div>

    }
};