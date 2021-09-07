import React from 'react';
import LateralBar from './components/LateralBar/lateralBar';
import Aside from './components/Aside/aside';
import Navbar from './components/Navbar/navbar';
import Player from './components/Player/player';
import { Home } from './Pages/Home';
import { Perfil } from './Pages/Perfil';
import { Switch, Route } from 'react-router-dom';
import { PlaylistPrincipal } from './Pages/PlaylistPrincipal';

export function App(){
        return (
            <div className="layout">
                <div className="parteCima">
                    <LateralBar/>
                    <main>
                        <Navbar src={localStorage.getItem('perfil')} user={localStorage.getItem('user')}/>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/perfil/:id" component={Perfil}/>
                            <Route path="/playlist/:id" component={PlaylistPrincipal}/>
                        </Switch>
                    </main>
                    <Aside />
                </div>
                <Player/>
            </div>
        )
}