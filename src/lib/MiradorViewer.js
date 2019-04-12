import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import deepmerge from 'deepmerge';
import { PluginProvider } from '../extend';
import App from '../containers/App';
import createStore from '../state/createStore';
import createRootReducer from '../state/reducers/rootReducer';
import * as actions from '../state/actions';
import settings from '../config/settings';

/**
 * Default Mirador instantiation
 */
class MiradorViewer {
  /**
   */
  constructor(config, plugins) {
    this.store = createStore();
    this.config = config;
    this.processConfig();
    const viewer = {
      actions,
      store: this.store,
    };

    ReactDOM.render(
      <Provider store={this.store}>
        <PluginProvider plugins={plugins} createRootReducer={createRootReducer}>
          <App />
        </PluginProvider>
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
      let view;
      if (miradorWindow.thumbnailNavigationPosition !== undefined) {
        ({ thumbnailNavigationPosition } = miradorWindow);
      } else {
        thumbnailNavigationPosition = mergedConfig.thumbnailNavigation.defaultPosition;
      }
      if (miradorWindow.view !== undefined) {
        ({ view } = miradorWindow);
      } else {
        view = mergedConfig.window.defaultView;
      }
      this.store.dispatch(actions.fetchManifest(miradorWindow.loadedManifest));
      this.store.dispatch(actions.addWindow({
        canvasIndex: (miradorWindow.canvasIndex || 0),
        manifestId: miradorWindow.loadedManifest,
        thumbnailNavigationPosition,
        view,
      }));
    });

    Object.keys(mergedConfig.manifests || {}).forEach((manifestId) => {
      this.store.dispatch(
        actions.requestManifest(manifestId, mergedConfig.manifests[manifestId]),
      );
    });
  }
}

export default MiradorViewer;
