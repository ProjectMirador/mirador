import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import deepmerge from 'deepmerge';
import App from './components/App';
import createRootReducer from './reducers/index';
import { store, actions } from './store';
import settings from './config/settings';
import './styles/index.scss';

/**
 * Process Plugins
 */
const processPlugins = (plugins = []) => {
  const actionCreators = [];
  const reducers = [];

  plugins.forEach((pluginName) => {
    const plugin = window.Mirador.plugins[pluginName];

    // Add Actions
    if (plugin.actions) {
      Object.keys(plugin.actions)
        .forEach(actionName => actionCreators.push({
          name: actionName,
          action: plugin.actions[actionName],
        }));
    }
    // Add Reducers
    if (plugin.reducers) {
      Object.keys(plugin.reducers)
        .forEach(reducerName => reducers.push({
          name: reducerName,
          reducer: plugin.reducers[reducerName],
        }));
    }
  });

  actionCreators.forEach((action) => { actions[action.name] = action.action; });
  reducers.forEach((reducer) => { store.pluginReducers[reducer.name] = reducer.reducer; });
  store.replaceReducer(createRootReducer(store.pluginReducers));
};

/**
 * Default Mirador instantiation
 */
export default function (config) {
  processPlugins(config.plugins);

  const viewer = {
    actions,
    store,
  };

  const action = actions.setConfig(deepmerge(settings, config));
  store.dispatch(action);

  ReactDOM.render(
    <Provider store={store}>
      <App config={config} />
    </Provider>,
    document.getElementById(config.id),
  );

  return viewer;
}
