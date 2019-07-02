import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import deepmerge from 'deepmerge';
import uuid from 'uuid/v4';
import PluginProvider from '../extend/PluginProvider';
import App from '../containers/App';
import createStore from '../state/createStore';
import createRootReducer from '../state/reducers/rootReducer';
import * as actions from '../state/actions';
import settings from '../config/settings';
import { getCompanionWindowIdsForPosition, getManifestSearchService } from '../state/selectors';

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

    mergedConfig.windows.forEach((miradorWindow, layoutOrder) => {
      const windowId = `window-${uuid()}`;
      const manifestId = miradorWindow.manifestId || miradorWindow.loadedManifest;
      const manifestAction = this.store.dispatch(actions.fetchManifest(manifestId));
      const windowAction = this.store.dispatch(actions.addWindow({
        // these are default values ...
        id: windowId,
        layoutOrder,
        manifestId,
        thumbnailNavigationPosition: mergedConfig.thumbnailNavigation.defaultPosition,
        // ... overridden by values from the window configuration ...
        ...miradorWindow,
      }));

      Promise.all([manifestAction, windowAction]).then(() => {
        if (miradorWindow.defaultSearchQuery) {
          const state = this.store.getState();
          const companionWindowId = getCompanionWindowIdsForPosition(state, { position: 'left', windowId })[0];
          const searchService = getManifestSearchService(state, { windowId });
          const searchId = searchService && `${searchService.id}?q=${miradorWindow.defaultSearchQuery}`;

          companionWindowId && searchId && this.store.dispatch(
            actions.fetchSearch(
              windowId,
              companionWindowId,
              searchId,
              miradorWindow.defaultSearchQuery,
            ),
          );
        }
      });
    });

    Object.keys(mergedConfig.manifests || {}).forEach((manifestId) => {
      this.store.dispatch(
        actions.requestManifest(manifestId, mergedConfig.manifests[manifestId]),
      );
    });
  }
}

export default MiradorViewer;
