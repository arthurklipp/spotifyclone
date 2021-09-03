import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { Link } from 'react-router-dom';
import './style.css';

// list of items
const list = [
  {
    capa: 'http://localhost:8080/projects/imgs/albumArt3.png?jwt=Bearer ' + localStorage.getItem('login'),
    album: 'Use Your Ilusion II',
    artista: "Guns N' Roses"
  },
  {
    capa: 'http://localhost:8080/projects/imgs/albumArt4.png?jwt=Bearer ' + localStorage.getItem('login'),
    album: 'In Rainbows',
    artista: 'Radiohead'
  },
  {
    capa: 'http://localhost:8080/projects/imgs/albumArt.png?jwt=Bearer ' + localStorage.getItem('login'),
    album: 'Unplugged',
    artista: 'Alice In Chains',
    id: '60f9a625cd374135bc7d2ebe'
  },
  {
    capa: 'http://localhost:8080/projects/imgs/ten.png?jwt=Bearer ' + localStorage.getItem('login'),
    album: 'Ten',
    artista: 'Pearl Jam',
    id: '60ffddbb65f2dd36004ec53a'
  },
  {
    capa: 'http://localhost:8080/projects/imgs/albumArt5.png?jwt=Bearer ' + localStorage.getItem('login'),
    album: 'Dolittle',
    artista: 'Pixies'
  },
  {
    capa: 'http://localhost:8080/projects/imgs/albumArt6.png?jwt=Bearer ' + localStorage.getItem('login'),
    album: 'In Utero',
    artista: "Nirvana"
  },
  {
    capa: 'http://localhost:8080/projects/imgs/ten.png?jwt=Bearer ' + localStorage.getItem('login'),
    album: 'Alive',
    artista: 'Pearl Jam'
  },
  {
    capa: 'http://localhost:8080/projects/imgs/albumArt8.png?jwt=Bearer ' + localStorage.getItem('login'),
    album: 'Surfer Rosa',
    artista: 'Pixies'
  },
  {
    capa: 'http://localhost:8080/projects/imgs/albumArt9.png?jwt=Bearer ' + localStorage.getItem('login'),
    album: 'Facelift',
    artista: "Alice In Chains"
  },
];

function Album(props) {
  return (
    <div className='album'>
      <Link to={'/playlist/' + props.id}>
        <img className='albumArt' src={props.capa} />
        <div className='textoAlbum'>{props.album}</div>
        <div className='texto'>{props.artista}</div>
      </Link>
    </div>
  );
}

function Pessoa(props) {
  return (
    <div className='album'>
      <Link to={"/perfil/" + props.id}>
        <img className='albumArt perfil' src={props.capa} />
        <div className='textoAlbum textoAlbumPerfil'>{props.album}</div>
      </Link>
    </div>
  );
}
// One item component
// selected prop will be passed
const MenuItem = ({ capa, album, artista, tipo, id }) => {
  if (tipo != 1) {
    return <Album capa={capa} album={album} artista={artista} id={id} />
  } else {
    return <Pessoa capa={capa} album={album} id={id} />
  }
};

const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};


const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const selected = 'item1';

export class Scroll extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    selected
  };

  onSelect = key => {
    this.setState({ selected: key });
  }

  render() {
    const { selected } = this.state;

    if (this.props.list[0].album == '') {
      return null;
    }

    return (
      <div>
        <div className="textoAlbum">{this.props.header}</div>
        <ScrollMenu
          wheel={false}
          alignCenter={false}
          data={
            this.props.list.map(item => {
              return <MenuItem capa={item.capa} album={item.album} id={item.id} artista={item.artista} key={this.props.capa} selected={selected} tipo={this.props.tipo} />;
            })
          }
          selected={selected}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}

Scroll.defaultProps = {
  list: list
};

export default Scroll