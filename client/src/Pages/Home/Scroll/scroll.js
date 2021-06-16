import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './style.css';


// list of items
const list = [
  { capa: 'albums/albumArt.png',
    album:'Unplugged',
    artista:'Alice In Chains'},
  { capa: 'albums/The_Getaway.jpg',
    album:'The Gataway',
    artista:'Red Hot Chilli Peppers'},
  { capa: 'albums/albumArt3.png',
    album:'Use Your Ilusion II',
    artista:"Guns N' Roses"},
  { capa: 'albums/albumArt4.png',
    album:'In Rainbows',
    artista:'Radiohead'},
  { capa: 'albums/albumArt5.png',
    album:'Dolittle',
    artista:'Pixies'},
  { capa: 'albums/albumArt6.png',
    album:'In Utero',
    artista:"Nirvana"},
  { capa: 'albums/albumArt7.png',
    album:'Alive',
    artista:'Pearl Jam'},
  { capa: 'albums/albumArt8.png',
    album:'Surfer Rosa',
    artista:'Pixies'},
  { capa: 'albums/albumArt9.png',
    album:'Facelift',
    artista:"Alice In Chains"},
];

function Album(props){
        return(
          <div className='album'>
            <img className='albumArt'src={props.capa}/>
            <a href="/playlist">
              <div className='textoAlbum'>{props.album}</div>
            </a>
            <div className='texto'>{props.artista}</div>
        </div>
        );
}

function Pessoa(props){
        return(
          <div className='album'>
            <img className='albumArt perfil'src={props.capa}/>
            <a href="/playlist">
              <div className='textoAlbum textoAlbumPerfil'>{props.album}</div>
            </a>
        </div>
        );
}
// One item component
// selected prop will be passed
const MenuItem = ({capa,album, artista, tipo}) => {
  if(tipo!=1){
    return <Album capa={capa} album={album} artista={artista}/>
  }else{
    return <Pessoa capa={capa} album={album}/>
  }
};

// All items component
// Important! add unique key
export const Menu = (list, selected, tipo) =>
  list.map(el => {
    const {capa} = el;
    const {album} = el;
    const {artista} = el;

    return <MenuItem capa={capa} album={album} artista={artista} key={capa} selected={selected} tipo={tipo}/>;
  });


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
    // call it again if items count changes
    this.menuItems = Menu(list, selected, this.props.tipo);
  }

  state = {
    selected
  };

  onSelect = key => {
    this.setState({ selected: key });
  }


  render() {
    const { selected } = this.state;
    // Create menu from items
    const menu = this.menuItems;

    return (
        <div>
          <div className="textoAlbum">{this.props.header}</div>
        <ScrollMenu
        wheel={false}
        alignCenter={false}
          data={menu}
          selected={selected}
          onSelect={this.onSelect}
        />
        </div>
    );
  }
}

export default Scroll