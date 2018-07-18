import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import m3core from '../../../index.umd';

ReactDOM.render(
  <Provider store={m3core.store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
