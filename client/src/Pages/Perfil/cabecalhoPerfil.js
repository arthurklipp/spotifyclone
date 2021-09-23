import React from 'react';
import Modal from '../../components/modal/modal';
import Avatar from '../../components/Avatar/avatar';

function UploadFoto(props) {
    return (
        <item>
            <h1 className="textoAlbum">Atualizar foto</h1>
            <img src={props.img} />
            <form onSubmit={props.processUpload}>
                <input id='select' type='file' name='file' ref={props.fileInput} />
                <input type='submit' value='enviar' />
            </form>
        </item>
    )
}

export function CabecalhoPerfil(props) {
    return (
        <div className="headere">
            <HeaderImg processUpload={props.processUpload} fileInput={props.fileInput} id={props.id} img={props.img} titulo={props.titulo}/>
            <div className="infosPerfil">
                <p className='texto font-weight-bold'>{props.titulo}</p>
                <h1>{props.nome}</h1>
                <p>{props.subtitulo}</p>
            </div>
        </div>
    )
}

class HeaderImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.alternarModal = this.alternarModal.bind(this);
        this.esconderModal = this.esconderModal.bind(this);
    }

    alternarModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    esconderModal(e) {
        if (e.target.tagName == 'MODAL') {
            this.setState({ modal: !this.state.modal });
        };
    }

    render() {
        //operador ternario para renderizar o header com ou sem o modal
        let header = this.props.id === localStorage.getItem('id') ?
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Modal show={this.state.modal} alternarModal={this.esconderModal}>
                    <UploadFoto img={this.props.img} processUpload={this.props.processUpload} fileInput={this.props.fileInput} />
                </Modal>
                <Avatar tam='230'>
                    <img src={this.props.img} onClick={this.alternarModal} />
                </Avatar>
            </div> :
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar tam='230'>
                    <img src={this.props.img} />
                </Avatar>
            </div>

        return header
    }
}