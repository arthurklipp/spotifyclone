import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Head from '../../components/head';

export class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      email:'arthurklipp10@gmail.com',
      senha:'123'
    };
    this.login = this.login.bind(this);
  }

  async login(){
    try {
      const response = await axios.post('http://localhost:8080/auth/login',{email: this.state.email, password: this.state.senha});
      
      localStorage.setItem('login', response.data.token);
      localStorage.setItem('user', response.data.user.name);
      localStorage.setItem('perfil', 'http://localhost:8080/projects/imgs/'+response.data.user.perfil+'?jwt=Bearer '+response.data.token);
      localStorage.setItem('email', response.data.user.email);
      localStorage.setItem('id', response.data.user._id);

      if(response.data.queue!=null){
        var queue=[];
        response.data.queue.musics.map(music => queue.push(music.assignedTo));
        localStorage.setItem('fila', JSON.stringify(queue));
      }else{
        localStorage.setItem('fila', null);
      }

      window.location.href="/home";

    } catch (err) {
      console.log(err);
    }
  }

    render(){
    return (
    <div>
        <Head/>
        <div className='login'>
              <p className='font-weight-bold text-center'>Para continuar, faça login no Spotify.</p>
                <div className='row'>
                  <img className='icon' src='facebook.png'></img>
                    <button type="button" id='botaoFacebook' className="btn btn-primary btn-lg btn-block rounded-pill font-weight-bold">
                      <div className='textoBotao'>CONTINUAR COM O FACEBOOK.</div>
                    </button>
                </div>
              
                <div className='row'>
                    <img className='icon' src='apple.png'></img>
                    <button type="button" id='botaoApple' className="btn btn-primary btn-lg btn-block rounded-pill font-weight-bold">
                      <div className='textoBotao'>CONTINUAR COM A APPLE</div>
                    </button>
                </div>
                
              <div className='row divisor'>
                <div className='linhaMetade'/>
                <p className='font-weight-bold' id='textoDivisor'>OU</p>
                <div className='linhaMetade'/>
              </div>
              <form>
              <div className='row'>
                <input value={this.state.email} onChange={(event)=>{this.setState({email:event.target.value})}} placeholder='Endereço de e-mail ou nome de usuário' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
              <div className='row'>
                <input value={this.state.senha} onChange={(event)=>{this.setState({senha:event.target.value})}} placeholder='Senha' type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="row" id='meio'>
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" for="exampleCheck1">Lembrar de mim</label>
                  <button onClick={this.login}type="button" id='botaoLogin' className="btn btn-primary btn-lg rounded-pill font-weight-bold">
                      <div className='textoBotao' >ENTRAR</div>
                    </button>
                </div>
              </form>
              <div className='row divisor'>
                  <p className='textoDestacado'>Esqueceu sua senha?</p>
                </div>
                <div className='row divisor'>
                  <div className='linha'/>
                </div>

                <div>
                 
                    <h6 style={{textAlign: "center"}} id='textoRodape'>Não tem uma conta?</h6>
                 
                  <Link to="/register">
                    <button type="button" id='botaoCadastro' className="btn btn-primary btn-lg btn-block rounded-pill font-weight-bold">
                      <div className='textoBotao'>INSCREVER-SE NO SPOTIFY</div>
                    </button>
                  </Link>
                  
                <p className='finalRodape'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices et velit quis condimentum. Morbi placerat suscipit posuere. Curabitur tincidunt lectus sit amet dapibus pretium. Aliquam tristique quis sem ac
                </p>
                </div>
          </div>
    </div>
   
  )
}
}
export default Login;