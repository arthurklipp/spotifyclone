import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Pages/Login/index';
import {Home} from './Pages/Home/index';
import {Scroll} from './Pages/Home/scroll';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Scroll />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
