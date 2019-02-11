import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import deepmerge from 'deepmerge';
import App from '../containers/App';
import createRootReducer from '../state/reducers/index';
import createStore from '../state/createStore';
import * as actions from '../state/actions';
import settings from '../config/settings';
import i18n from '../i18n';

/**
 * Default Mirador instantiation
 */
class MiradorViewer {
  /**
   */
  constructor(config) {
    this.store = createStore();
    this.config = config;
    this.processPlugins();
    this.processConfig();
    const viewer = {
      actions,
      store: this.store,
    };

    ReactDOM.render(
      <Provider store={this.store}>
        <I18nextProvider i18n={i18n}>
          <App config={config} />
        </I18nextProvider>
      </Provider>,
      document.getElementById(config.id),
    );

    return viewer;
  }

  /**
   * Process config into actions
   */
  processConfig() {
    const mergedConfig = deepmerge(settings, this.config);
    const action = actions.setConfig(mergedConfig);
    this.store.dispatch(action);

    mergedConfig.windows.forEach((miradorWindow) => {
      let thumbnailNavigationPosition;
      if (miradorWindow.thumbnailNavigationPosition !== undefined) {
        ({ thumbnailNavigationPosition } = miradorWindow);
      } else {
        thumbnailNavigationPosition = mergedConfig.thumbnailNavigation.defaultPosition;
      }
      this.store.dispatch(actions.fetchManifest(miradorWindow.loadedManifest));
      this.store.dispatch(actions.addWindow({
        canvasIndex: (miradorWindow.canvasIndex || 0),
        manifestId: miradorWindow.loadedManifest,
        thumbnailNavigationPosition,
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
    reducers.forEach((reducer) => { this.store.pluginReducers[reducer.name] = reducer.reducer; });
    this.store.replaceReducer(createRootReducer(this.store.pluginReducers));
  }
}

export default MiradorViewer;
