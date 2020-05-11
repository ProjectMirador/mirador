import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import uuid from 'uuid/v4';
import { App } from '../components/App';
import createStore from '../state/createStore';
import * as actions from '../state/actions';
import { getCompanionWindowIdsForPosition, getManifestSearchService } from '../state/selectors';

/**
 * Default Mirador instantiation
 */
class MiradorViewer {
  /**
   */
  constructor(config, viewerConfig = {}) {
    this.config = config;
    this.plugins = viewerConfig.plugins || [];
    this.store = viewerConfig.store || createStore();
    this.processConfig();

    const viewer = {
      actions,
      store: this.store,
    };

    ReactDOM.render(
      <Provider store={this.store}>
        <App plugins={this.plugins} />
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
      const manifestAction = this.store.dispatch(actions.fetchManifest(manifestId));
      const windowAction = this.store.dispatch(actions.addWindow({
        // these are default values ...
        id: windowId,
        layoutOrder,
        manifestId,
        thumbnailNavigationPosition: storedConfig.thumbnailNavigation.defaultPosition,
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

    Object.keys(storedConfig.manifests || {}).forEach((manifestId) => {
      this.store.dispatch(
        actions.requestManifest(manifestId, storedConfig.manifests[manifestId]),
      );
    });
  }
}

export default MiradorViewer;
