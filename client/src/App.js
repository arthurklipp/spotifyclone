import React from 'react';
import LateralBar from './components/LateralBar/lateralBar';
import Aside from './components/Aside/aside';
import Navbar from './components/Navbar/navbar';
import Player from './components/Player/player';
import { Home } from './Pages/Home';
import { Perfil } from './Pages/Perfil';
import { Switch, Route } from 'react-router-dom';
import { PlaylistPrincipal } from './Pages/PlaylistPrincipal';
import api from './services/api';

export const User = React.createContext();

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.processUpload=(event)=> {
            event.preventDefault();
            const data = new FormData();
        
            data.append("file", this.fileInput.current.files[0]);
        
            api.post("api/post", data)
              .then(response => {
                localStorage.setItem('perfil', 'http://localhost:8080/api/imgs/' + response.data.perfil + '?jwt=Bearer ' + localStorage.getItem('login'));
                this.setState({
                    img: 'http://localhost:8080/api/imgs/' + response.data.perfil + '?jwt=Bearer ' + localStorage.getItem('login')
                });
              })
              .catch(() => {
                console.log("erro");
              });
          };
        this.state = {
            img: localStorage.getItem('perfil'),
            upload: this.processUpload,
            fileInput: this.fileInput
        };
    }
    render() {
        return (
            <div className="layout">
                <div className="parteCima">
                    <LateralBar />
                    <main>
                        <User.Provider value={this.state}>
                            <Navbar user={localStorage.getItem('user')} />
                            <Switch>
                                <Route path="/" exact component={Home} />
                                <Route path="/perfil/:id" component={Perfil} />
                                <Route path="/playlist/:id" component={PlaylistPrincipal} />
                            </Switch>
                        </User.Provider>
                    </main>
                    <Aside />
                </div>
                <Player />
            </div>
        )
    }
}