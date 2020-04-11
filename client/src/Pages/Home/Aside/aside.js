import React, {Component} from 'react';
import "./aside.css";

export class Aside extends Component{
    render(){
        return(
            <div id="aside">
                <div id="asideItem">
                    <p id="textoAside" className="branco font-weight-bold">Veja o que seus amigos estão tocando</p>
                    <button type="button" id='botaoAmigos' class="btn btn-primary btn-block rounded-pill font-weight-bold">
                    <div className='textoBotao'>ENCONTRAR AMIGOS</div>
                    </button>
                  </div>
            </div>
        )
    }
}
export default Aside;