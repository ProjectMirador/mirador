import miradorViewer from './lib/miradorViewer';
import settings from './config/settings';
import { pluginStore } from './extend';
import createStore from './state/createStore';
import * as actions from './state/actions';
import App from './containers/App';
import './styles/index.scss';
/**
 * Init mirador viewer
 */
export function initViewer(config, plugins) {
  return miradorViewer({
    config,
    settings,
    plugins,
    pluginStore,
    createStore,
    actions,
    App,
  });
}
