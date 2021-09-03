import React from 'react';
import axios from 'axios';
import Head from '../../components/head';

export default class Register extends React.Component {
    constructor(props){
        super(props);
        this.state={
          email:'',
          senha:'',
          nome:'',
          erro: null
        };
        this.enviarDados = this.enviarDados.bind(this);
      }

    async enviarDados(){
        try {
            const response = await axios.post("http://localhost:8080/auth/register",{email: this.state.email, password: this.state.senha, name: this.state.nome});
            
            localStorage.setItem('login', response.data.token);
            localStorage.setItem('user', response.data.user.name);
            localStorage.setItem('perfil', 'http://localhost:8080/api/imgs/'+response.data.user.perfil+'?jwt=Bearer '+response.data.token);
            localStorage.setItem('email', response.data.user.email);
            localStorage.setItem('id', response.data.user._id);
      
            if(response.data.queue!=null){
              var queue=[];
              response.data.queue.musics.map(music => queue.push(music.assignedTo));
              localStorage.setItem('fila', JSON.stringify(queue));
            }else{
              localStorage.setItem('fila', null);
            }
            
            window.location.href="/";
        }catch(err){
            this.setState({
                erro: 'Preencha todos os campos'
            });
        }
    }
    render(){
        return (
            <div>
                <Head/>
                <div className='login'>
                    <div className='row'>
                        <button type="button" id='botaoFacebook' className="btn btn-primary btn-lg btn-block rounded-pill font-weight-bold">
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
                            <input placeholder='Nome' type="text" className="form-control input" value={this.state.nome} onChange={(event)=>{this.setState({nome:event.target.value})}}/>
                        </div>
                        <div className='row'>
                            <input placeholder='E-mail' type="email" className="form-control" value={this.state.email} onChange={(event)=>{this.setState({email:event.target.value})}}/>
                        </div>
                        <div className='row'>
                            <input placeholder='Senha' type="password" className="form-control" value={this.state.senha} onChange={(event)=>{this.setState({senha:event.target.value})}} aria-describedby="emailHelp" />
                        </div>
                        <Err msg={this.state.erro}/>
                        <div className="row" id='meio'>
                            <button onClick={this.enviarDados} type="button" className="button btn btn-lg rounded-pill font-weight-bold mr-auto ml-auto" style={{width:"60%", height:"45px"}}>
                                <div className='textoBotao' style={{color:"white"}}>INSCREVER-SE</div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

function Err(props){
    return(
        <div className="row">
            <p className="text-danger">{props.msg}</p>
        </div>
    )
}