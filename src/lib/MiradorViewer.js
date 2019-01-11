import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import deepmerge from 'deepmerge';
import App from '../components/App';
import createRootReducer from '../reducers/index';
import { store, actions } from '../store';
import settings from '../config/settings';

/**
 * Default Mirador instantiation
 */
class MiradorViewer {
  /**
   */
  constructor(config) {
    this.config = config;
    this.processPlugins();
    this.processWindows();

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

  /**
   * Process Window
   */
  processWindows() {
    const miradorWindows = this.config.miradorWindows || [];
    miradorWindows.forEach((miradorWindow) => {
      store.dispatch(actions.fetchManifest(miradorWindow.loadedManifest));
      store.dispatch(actions.addWindow({
        manifestId: miradorWindow.loadedManifest,
      }));
    });
  }

  /**
   * Process Plugins
   */
  processPlugins() {
    const plugins = this.config.plugins || [];
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
  }
}

export default MiradorViewer;
