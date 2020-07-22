import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import deepmerge from 'deepmerge';
import HotApp from '../components/App';
import createStore from '../state/createStore';
import { importConfig } from '../state/actions/config';
import {
  filterValidPlugins,
  getConfigFromPlugins,
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
   * Process config with plugin configs into actions
   */
  processConfig() {
    this.store.dispatch(
      importConfig(
        deepmerge(getConfigFromPlugins(this.plugins), this.config),
      ),
    );
  }
}

export default MiradorViewer;
