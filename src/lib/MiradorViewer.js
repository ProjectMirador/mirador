import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { v4 as uuid } from 'uuid';
import HotApp from '../components/App';
import createStore from '../state/createStore';
import * as actions from '../state/actions';
import {
  filterValidPlugins,
  getReducersFromPlugins,
  getSagasFromPlugins,
} from '../extend/pluginPreprocessing';

/**
 * Default Mirador instantiation
 */
class MiradorViewer {
  /**
   */
  constructor(config, viewerConfig = {}) {
    this.config = config;
    this.plugins = filterValidPlugins(viewerConfig.plugins || []);
    this.store = viewerConfig.store
      || createStore(getReducersFromPlugins(this.plugins), getSagasFromPlugins(this.plugins));
    this.processConfig();

    const viewer = {
      actions,
      store: this.store,
    };

    ReactDOM.render(
      <Provider store={this.store}>
        <HotApp plugins={this.plugins} />
      </Provider>,
      document.getElementById(config.id),
    );

    return viewer;
  }

  /**
   * Process config into actions
   */
  processConfig() {
    /** merge type for arrays */
    const action = actions.importConfig(this.config);
    this.store.dispatch(action);
    const { config: storedConfig } = this.store.getState();

    storedConfig.windows.forEach((miradorWindow, layoutOrder) => {
      const windowId = `window-${uuid()}`;
      const manifestId = miradorWindow.manifestId || miradorWindow.loadedManifest;

      this.store.dispatch(actions.addWindow({
        // these are default values ...
        id: windowId,
        layoutOrder,
        manifestId,
        thumbnailNavigationPosition: storedConfig.thumbnailNavigation.defaultPosition,
        // ... overridden by values from the window configuration ...
        ...miradorWindow,
      }));
    });
  }
}

export default MiradorViewer;
