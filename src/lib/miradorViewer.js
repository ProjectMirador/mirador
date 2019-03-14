import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import deepmerge from 'deepmerge';

/** Default Mirador instantiation */
export default function ({
  config,
  settings,
  plugins,
  pluginStore,
  createStore,
  actions,
  App,
}) {
  pluginStore.storePlugins(plugins);
  const store = createStore(getReducersFromPlugins(plugins));
  processConfig(store, actions, config, settings);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById(config.id),
  );

  return { store, actions };
}

/** Return reducers from plugins */
function getReducersFromPlugins(plugins) {
  return plugins && plugins.reduce((acc, plugin) => ({ ...acc, ...plugin.reducers }), {});
}

/** Process config */
function processConfig(store, actions, config, settings) { // eslint-disable-line no-shadow
  const mergedConfig = writeConfigToState(store, actions, config, settings);
  processWindowsFromConfig(store, actions, mergedConfig);
  processManifestsFromConfig(store, actions, mergedConfig);
}

/** Write config to state */
function writeConfigToState(store, actions, config, settings) { // eslint-disable-line no-shadow
  const mergedConfig = deepmerge(settings, config);
  store.dispatch(actions.setConfig(mergedConfig));
  return mergedConfig;
}

/** Process windows from config */
function processWindowsFromConfig(store, actions, config) { // eslint-disable-line no-shadow
  config.windows.forEach((win) => {
    store.dispatch(actions.fetchManifest(win.loadedManifest));
    store.dispatch(actions.addWindow({
      canvasIndex: win.canvasIndex || 0,
      manifestId: win.loadedManifest,
      thumbnailNavigationPosition:
        win.thumbnailNavigationPosition || config.thumbnailNavigation.defaultPosition,
      view: win.view || config.window.defaultView,
    }));
  });
}

/** Process manifests from config */
function processManifestsFromConfig(store, actions, config) { // eslint-disable-line no-shadow
  Object.keys(config.manifests || {}).forEach((manifestId) => {
    store.dispatch(actions.requestManifest(manifestId, config.manifests[manifestId]));
  });
}
