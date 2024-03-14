import { createRoot } from 'react-dom/client';
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
    this.plugins = filterValidPlugins(viewerConfig.plugins || []);
    this.config = config;
    this.store = viewerConfig.store
      || createPluggableStore(this.config, this.plugins);

    if (config.id) {
      this.container = document.getElementById(config.id);
      this.root = createRoot(this.container);

      this.root.render(this.render());
    }
  }

  /**
   * Render the mirador viewer
   */
  render(props = {}) {
    return (
      <Provider store={this.store}>
        <HotApp plugins={this.plugins} {...props} />
      </Provider>
    );
  }

  /**
   * Cleanup method to unmount Mirador from the dom
   */
  unmount() {
    if (!this.root) return;

    this.root.unmount();
  }
}

export default MiradorViewer;
