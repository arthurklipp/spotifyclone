import React from 'react';
import './Login.css';


function Head(){
  
    return (<div className='head'>
              <img className='logo' src='Spotify_Logo_RGB_Black.png'/>
            </div>
    );
}

export default function Login(){

    return (
    <div>
        <Head/>
        <div className='login'>
              <p className='font-weight-bold'>Para continuar, faça login no Spotify.</p>
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
                <input placeholder='Endereço de e-mail ou nome de usuário' type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
              <div className='row'>
                <input placeholder='Senha' type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div class="row" id='meio'>
                  <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                  <label class="form-check-label" for="exampleCheck1">Lembrar de mim</label>
                  <button type="button" id='botaoLogin' class="btn btn-primary btn-lg rounded-pill font-weight-bold">
                  <div className='textoBotao'>ENTRAR</div>
                  </button>
                </div>
              </form>
              <div className='row divisor'>
                  <p className='textoDestacado'>Esqueceu sua senha?</p>
                </div>
                <div className='row divisor'>
                  <div className='linha'/>
                </div>
                <div className='row rodape'>
                  <h6 id='textoRodape'>Não tem uma conta?</h6>
                  <button type="button" id='botaoCadastro' class="btn btn-primary btn-lg btn-block rounded-pill font-weight-bold">
                  <div className='textoBotao'>INSCREVER-SE NO SPOTIFY</div>
                </button>
                <p className='finalRodape'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices et velit quis condimentum. Morbi placerat suscipit posuere. Curabitur tincidunt lectus sit amet dapibus pretium. Aliquam tristique quis sem ac
                </p>
                </div>
          </div>
    </div>
   
  );

}
