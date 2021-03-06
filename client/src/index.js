import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { isAuthenticated } from './services/auth';
import Login from './Pages/Login/index';
import { App } from './App';
import Register from './Pages/Register/index';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )
  )} />
)

localStorage.setItem('URL', 'http://localhost:8080/api/imgs/');

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute path="/" component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
