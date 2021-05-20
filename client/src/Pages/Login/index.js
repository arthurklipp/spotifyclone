import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import './Login.css';


function Head(){
  
    return (<div className='head'>
              <img className='logo' src='Spotify_Logo_RGB_Black.png'/>
            </div>
    );
}

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
    let request = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'email':this.state.email,
        'password':this.state.senha
      })
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
        <Head/>
        <div className='login'>
              <p className='font-weight-bold text-center'>Para continuar, faça login no Spotify.</p>
              
                <div className='row'>
                  <img className='icon' src='facebook.png'></img>
                    <button type="button" id='botaoFacebook' class="btn btn-primary btn-lg btn-block rounded-pill font-weight-bold">
                      <div className='textoBotao'>CONTINUAR COM O FACEBOOK.</div>
                    </button>
                </div>
              
                <div className='row'>
                    <img className='icon' src='apple.png'></img>
                    <button type="button" id='botaoApple' class="btn btn-primary btn-lg btn-block rounded-pill font-weight-bold">
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
                <input value={this.state.email} onChange={(event)=>{this.setState({email:event.target.value})}} placeholder='Endereço de e-mail ou nome de usuário' type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
              <div className='row'>
                <input value={this.state.senha} onChange={(event)=>{this.setState({senha:event.target.value})}} placeholder='Senha' type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="row" id='meio'>
                    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" for="exampleCheck1">Lembrar de mim</label>
                  <button onClick={this.login}type="button" id='botaoLogin' class="btn btn-primary btn-lg rounded-pill font-weight-bold">
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
                    <button type="button" id='botaoCadastro' class="btn btn-primary btn-lg btn-block rounded-pill font-weight-bold">
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