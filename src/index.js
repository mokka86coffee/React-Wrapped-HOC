import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import App from './App';
import {injectStore, regularStore} from './stores';
import './index.css';

ReactDOM.render(
  <Provider store={regularStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);

