import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import deepmerge from 'deepmerge';
import App from './components/App';
import { actions, store } from './store';
import settings from './config/settings';
import './styles/index.scss';

/**
 * Default Mirador instantiation
 */
export default function Mirador(config) {
  const action = actions.setConfig(deepmerge(settings, config));
  store.dispatch(action);
  ReactDOM.render(
    <Provider store={store}>
      <App config={config} />
    </Provider>,
    document.getElementById(config.id),
  );
  return {
    actions,
    store,
  };
}
