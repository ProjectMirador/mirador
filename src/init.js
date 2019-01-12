import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import deepmerge from 'deepmerge';
import App from './components/App';
import { store, actions } from './store';
import settings from './config/settings';
import processPlugins from './lib/processPlugins';
import './styles/index.scss';

/**
 * Default Mirador instantiation
 */
export default function (config) {
  processPlugins(window.Mirador.plugins, config.plugins);

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
