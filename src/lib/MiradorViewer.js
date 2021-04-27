import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import HotApp from '../components/App';
import {
  filterValidPlugins,
} from '../extend/pluginPreprocessing';
import createPluggableStore from '../state/createPluggableStore';

/**
 * Default Mirador instantiation
 */
class MiradorViewer {
  /**
   */
  constructor(config, viewerConfig = {}) {
    this.plugins = filterValidPlugins(viewerConfig.plugins);
    this.config = config;
    this.store = viewerConfig.store
      || createPluggableStore(this.config, this.plugins);

    config.id && ReactDOM.render(
      <Provider store={this.store}>
        <HotApp plugins={this.plugins} />
      </Provider>,
      document.getElementById(config.id),
    );
  }

  /**
   * Cleanup method to unmount Mirador from the dom
   */
  unmount() {
    this.config.id && ReactDOM.unmountComponentAtNode(document.getElementById(this.config.id));
  }
}

export default MiradorViewer;
