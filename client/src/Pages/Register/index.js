import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state={
          email:'',
          senha:'',
          nome:''
        };
        this.enviarDados = this.enviarDados.bind(this);
      }

    async enviarDados(){
        const request = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers :{'Content-type': 'application/json'},
            body:JSON.stringify({password:this.state.senha, email:this.state.email, name:this.state.nome})
        })
    const resposta = await request.json();
    if(resposta.token!== null){
      localStorage.setItem('login', resposta.token);
      localStorage.setItem('user', resposta.user.name);
      localStorage.setItem('email', resposta.user.email);
      localStorage.setItem('id', resposta.user._id);
      window.location.href="/home";
    }else{
      localStorage.removeItem('login');
      localStorage.removeItem('user');
      localStorage.removeItem('email');
      localStorage.removeItem('id');
    }
    }
    render(){
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
                            <input placeholder='Nome' type="text" class="form-control input" value={this.state.nome} onChange={(event)=>{this.setState({nome:event.target.value})}}/>
                        </div>
                        <div className='row'>
                            <input placeholder='E-mail' type="email" class="form-control" value={this.state.email} onChange={(event)=>{this.setState({email:event.target.value})}}/>
                        </div>
                        <div className='row'>
                            <input placeholder='Senha' type="password" class="form-control" value={this.state.senha} onChange={(event)=>{this.setState({senha:event.target.value})}} aria-describedby="emailHelp" />
                        </div>
                        <div class="row" id='meio'>
                            {/* <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                            <label class="form-check-label" for="exampleCheck1">Lembrar de mim</label> */}
                            <button onClick={this.enviarDados} type="button" class="button btn btn-lg rounded-pill font-weight-bold mr-auto ml-auto" style={{width:"60%", height:"45px"}}>
                                <div className='textoBotao' style={{color:"white"}}>INSCREVER-SE</div>
                            </button>
                        </div>
                    </form>
                    {/*<div className='row divisor'>
                        <p>Já tem uma conta?
                            <Link to="/">
                            <span className='textoDestacado' style={{cursor: "pointer"}}> Entrar</span>
                            </Link>
                        
                        </p> 
                        </div>*/}
        
                </div>
            </div>

        )
    }
}