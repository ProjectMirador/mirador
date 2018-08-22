import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from '../components/App';
import { store } from '../index';
import '../styles/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('mirador'),
);
