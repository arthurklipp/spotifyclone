import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../App';
import Avatar from '../Avatar/avatar';
import Searchbar from '../searchbar/searchbar';
import './style.css';

export default class Navbar extends React.Component {
    render() {
        return (
            <div className='navbar'>
                <div className='mr-1'>
                    <i className="seta fas fa-chevron-left"></i>
                    <i className="seta fas fa-chevron-right"></i>
                </div>
                <Searchbar/>
                <div id='navcontent'>
                    <button type="button" id='botaoUpgrade' className="btn btn-primary btn-block rounded-pill font-weight-bold">
                        <div className='textoBotao'>FAZER UPGRADE</div>
                    </button>
                    <Link to={"/perfil/" + localStorage.getItem('id')}>
                        <div className="d-flex ml-5">
                            <User.Consumer>
                                {({ img }) => (
                                    <Avatar tam='30'>
                                        <img src={img} />
                                    </Avatar>
                                )}
                            </User.Consumer>
                            <p id='nome' className="branco ml-2">{this.props.user}</p>
                        </div>
                    </Link>
                    <Link to="/login">
                        <i id="seta" className="fas fa-chevron-down"></i>
                    </Link>
                </div>
            </div>
        )
    }
};