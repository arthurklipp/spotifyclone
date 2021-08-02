import React from 'react';
import Scroll from '../Home/Scroll/scroll';
import "./style.css";
import api from '../../api';

export class Playlist extends React.Component{
    constructor(props){
        super(props);
        this.state={
            playlists: [{
                capa: '',
                titulo: '',
                id: ''
            }]
        }
    }

    async componentDidMount(){
        try {
            const response = await api.get('/projects/'+localStorage.getItem('id'));
            var playlists = [];
            
            response.data.playlists.map((item)=>{
                playlists.push({
                    album: item.title,
                    capa: 'http://localhost:8080/projects/imgs/'+item.img+'?jwt=Bearer '+localStorage.getItem('login'),
                    id: item._id
                })
            })
            if(playlists[0]!=null){
                this.setState({
                    playlists: playlists
                });
            }
        } catch (error) {
            
        }
    }

    render(){
        return <div className="musica">
            <Scroll header="Playlists" list={this.state.playlists}/>
            <Scroll header="Seguidores" tipo={1}/>
            <Scroll header="Seguindo" tipo={1}/>
        </div>
    }
}