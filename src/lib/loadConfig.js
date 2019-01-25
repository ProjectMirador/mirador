import deepmerge from 'deepmerge';
import { store, actions } from '../store';
import settings from '../config/settings';

/**
 * Translate config into initial actions
 */
export default function loadConfig(config) {

  // Can probably do this using initialstate from
  const action = actions.setConfig(deepmerge(settings, config));
  store.dispatch(action);

  // Can probably do this using initialstate from
  config.windows.forEach((miradorWindow) => {
    store.dispatch(actions.fetchManifest(miradorWindow.loadedManifest));
    store.dispatch(actions.addWindow({
      manifestId: miradorWindow.loadedManifest,
    }));
  });
}
