import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import deepmerge from 'deepmerge';
import App from '../containers/App';
import { loadWindows, processPlugins } from './initUtils';
import createStore from '../state/createStore';
import * as actions from '../state/actions';
import settings from '../config/settings';

const store = createStore();
/**
 * Default Mirador instantiation
 */
class MiradorViewer {
  /**
   */
  constructor(config) {
    this.config = config;
    processPlugins(config, store);
    this.processConfig();
    const viewer = {
      actions,
      store,
    };

    ReactDOM.render(
      <Provider store={store}>
        <App config={config} />
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
    store.dispatch(action);
    loadWindows(mergedConfig, store);
  }
}

export default MiradorViewer;
