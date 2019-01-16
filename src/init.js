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
 * Generate action creators for a plugin
 */
const getActionCreators = pluginActions => {
  const actionCreators = [];
  if (pluginActions) {
    Object.keys(pluginActions).forEach(actionName =>
      actionCreators.push({
        name: actionName,
        action: pluginActions[actionName]
      })
    );
  }
  return actionCreators;
};

/**
 * Generate reducers for a plugin
 */
const getReducers = pluginReducers => {
  const reducers = [];
  if (pluginReducers) {
    Object.keys(pluginReducers).forEach(reducerName =>
      reducers.push({
        name: reducerName,
        reducer: reducers[reducerName]
      })
    );
  }
  return reducers;
};

/**
 * Process Plugins
 */
const processPlugins = (plugins = []) => {
  const actionCreators = [];
  const reducers = [];

  plugins.forEach(pluginName => {
    const plugin = window.Mirador.plugins[pluginName];

    // Add Actions
    actionCreators.concat(getActionCreators(plugin.actions));
    // Add Reducers
    reducers.concat(getReducers(plugin.reducers));
  });

  actionCreators.forEach(action => {
    actions[action.name] = action.action;
  });
  reducers.forEach(reducer => {
    store.pluginReducers[reducer.name] = reducer.reducer;
  });
  store.replaceReducer(createRootReducer(store.pluginReducers));
};

/**
 * Default Mirador instantiation
 */
export default function(config) {
  processPlugins(config.plugins);

  const viewer = {
    actions,
    store
  };

  const action = actions.setConfig(deepmerge(settings, config));
  store.dispatch(action);

  ReactDOM.render(
    <Provider store={store}>
      <App config={config} />
    </Provider>,
    document.getElementById(config.id)
  );

  return viewer;
}
