import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import deepmerge from 'deepmerge';
import App from '../containers/App';
import createStore from '../state/createStore';
import * as actions from '../state/actions';
import withMiradorAPI from './withMiradorAPI';
import settings from '../config/settings';
import createRootReducer from '../state/reducers';

/**
 * miradorDefaultImplementation.
 * @param config
 * @returns {{store, actions: {}}}
 */
export default function miradorDefaultImplementation(config) {
  const store = createStore();
  processPlugins(store, config);
  const mixinConfig = deepmerge(settings, config);
  const MiradorViewer = withMiradorAPI(store, mixinConfig)(App);
  const element = (
    <Provider store={store}>
      <MiradorViewer />
    </Provider>
  );
  ReactDOM.render(element, document.getElementById(mixinConfig.id));
  return { actions, store };
}

/**
 *
 * @param plugins
 */
function addPluginActions(plugins) {
  const actionCreators = [];
  // TODO this can be simplified
  plugins.forEach((pluginName) => {
    const plugin = window.Mirador.plugins[pluginName];
    if (plugin.actions) {
      Object.keys(plugin.actions)
        .forEach(actionName => actionCreators.push({
          name: actionName, action: plugin.actions[actionName],
        }));
    }
  });
  actionCreators.forEach((action) => { actions[action.name] = action.action; });
}

/**
 *
 * @param store
 * @param plugins
 */
function addPluginReducersToStore(store, plugins) {
  const reducers = [];
  const pluginReducers = {};
  // TODO this can be simplified
  plugins.forEach((pluginName) => {
    const plugin = window.Mirador.plugins[pluginName];
    if (plugin.reducers) {
      Object.keys(plugin.reducers)
        .forEach(reducerName => reducers.push({
          name: reducerName,
          reducer: plugin.reducers[reducerName],
        }));
    }
  });
  reducers.forEach((reducer) => { pluginReducers[reducer.name] = reducer.reducer; });
  store.replaceReducer(createRootReducer(pluginReducers));
}

/**
 * processPlugins
 */
function processPlugins(store, config) {
  const plugins = config.plugins || [];
  addPluginActions(plugins);
  addPluginReducersToStore(store, plugins);
}
