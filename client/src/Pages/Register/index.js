import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
    return (
        <div>
            <div className='head'>
                <img className='logo' src='Spotify_Logo_RGB_Black.png' />
            </div>
            <div className='login'>
                

                <div className='row'>
                    <button type="button" id='botaoFacebook' class="btn btn-primary btn-lg btn-block rounded-pill font-weight-bold">
                        <div className='textoBotao'>INSCREVER-SE COM FACEBOOK</div>
                    </button>
                </div>

                <div className='row divisor'>
                    <div className='linhaMetade' />
                    <p className='font-weight-bold' id='textoDivisor'>OU</p>
                    <div className='linhaMetade' />
                </div>
                <p className='font-weight-bold text-center'>Inscrever-se com seu endereço de e-mail.</p>
                <form>
                    <div className='row'>
                        <input placeholder='E-mail' type="email" class="form-control input" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className='row'>
                        <input placeholder='Confirmar e-mail' type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className='row'>
                        <input placeholder='Senha' type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className='row'>
                        <input placeholder='Como devemos chamar você?' type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="row" id='meio'>
                        {/* <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Lembrar de mim</label> */}
                        <button type="button" class="button btn btn-primary btn-lg rounded-pill font-weight-bold" style={{padding: "2vh 15vh", margin:"0 auto"}}>
                            <div className='textoBotao' >INSCREVER-SE</div>
                        </button>
                    </div>
                </form>
                <div className='row divisor'>
                    <p>Já tem uma conta?
                        <Link to="/">
                        <span className='textoDestacado' style={{cursor: "pointer"}}> Entrar</span>
                        </Link>
                       
                    </p> 
                </div>
    
            </div>
        </div>

    )

}