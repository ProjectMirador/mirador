import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ConnectedApp from './components/App';
import { store, actions } from './store';
import loadPlugins from './lib/loadPlugins';
import loadConfig from './lib/loadConfig';
import miradorViewer from './lib/miradorViewer';
import './styles/index.scss';

/**
 * Default Mirador instantiation
 *
 * Loads initial state and plugins into the
 * store, reducers, and actions as side-effects
 * and returns an API wrapper object for this viewer
 */
export default function (config) {
  // Load all plugin reducers and actions into
  // global application.
  loadPlugins(window.Mirador.plugins, config.plugins);

  // load config into the redux store
  // by translating the config into
  // initial state and dispatched actions
  loadConfig(config);

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedApp config={config} />
    </Provider>,
    document.getElementById(config.id),
  );

  return miradorViewer();
}
