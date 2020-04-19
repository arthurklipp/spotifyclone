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

    enviarDados(){
        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers :{'Content-type': 'application/json'},
            body:JSON.stringify({password:this.state.senha, email:this.state.email, name:this.state.nome})
        }).then((res) => res.json())
        .then((data) =>  console.log(data))
        .catch((err)=>console.log(err))
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
                            <input placeholder='E-mail' type="email" class="form-control input" value={this.state.email} onChange={(event)=>{this.setState({email:event.target.value})}} aria-describedby="emailHelp" />
                        </div>
                        <div className='row'>
                            <input placeholder='Confirmar e-mail' type="email" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" />
                        </div>
                        <div className='row'>
                            <input placeholder='Senha' type="password" class="form-control" value={this.state.senha} onChange={(event)=>{this.setState({senha:event.target.value})}} aria-describedby="emailHelp" />
                        </div>
                        <div className='row'>
                            <input placeholder='Como devemos chamar você?' type="text" class="form-control" value={this.state.nome} onChange={(event)=>{this.setState({nome:event.target.value})}} aria-describedby="emailHelp" />
                        </div>
                        <div class="row" id='meio'>
                            {/* <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                            <label class="form-check-label" for="exampleCheck1">Lembrar de mim</label> */}
                            <button onClick={this.enviarDados}type="button" class="button btn btn-primary btn-lg rounded-pill font-weight-bold" style={{padding: "2vh 15vh", margin:"0 auto"}}>
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
}