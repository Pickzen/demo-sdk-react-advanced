import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css'
import * as serviceWorker from './serviceWorker';

const el = document.getElementById(window.pickzen.holder || 'pickzen');
el.className += " pickzen";
ReactDOM.render(<App />, el);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
