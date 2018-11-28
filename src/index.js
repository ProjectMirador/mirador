import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { store } from './store';
import './styles/index.scss';

/**
 * Default Mirador instantiation
 */
export default function Mirador(config) {
  ReactDOM.render(
    <Provider store={store}>
      <App config={config} />
    </Provider>,
    document.getElementById(config.id),
  );
}

module.exports = Mirador;
