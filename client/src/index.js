import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { isAuthenticated } from './auth';
import Login from './Pages/Login/index';
import {Home} from './Pages/Home/index';
import Register from './Pages/Register/index';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

const PrivateRoute = ({component: Component, ... rest}) => (
  <Route {... rest} render={props =>(
    isAuthenticated() ? (
      <Component {... props} />
    ) : (
      <Redirect to={{ pathname:'/', state: { from: props.location } }} />
    )
  )}/>
)
ReactDOM.render(
  <BrowserRouter>
    <Switch>
            <Route path="/" exact={true} component={Login} />
            <Route  path="/register" component={Register}/>
            <PrivateRoute  path="/home" component={Home}/>
        </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
