import React from 'react';

import * as actions from '../state/actions';

/*
eslint max-len: ["error", { "ignoreComments": true }]
*/

/**
 * HoC that initializes a Mirador Application
 * @param store
 * @param config
 * @returns {function(*): {contextType?: React.Context<any>, new(props: Readonly<P>): HOC, new(props: P, context?: any): HOC, prototype: HOC}}
 */
export default function withMiradorAPI(store, config) {
  // TODO validate config schema before processing / handle invalid or missing configuration
  // validateConfig(config);

  doInitialization();

  /**
   * doInitialization
   */
  function doInitialization() {
    dispatchSetConfig(config);
    fetchManifests();
    addWindows(config);
  }

  /**
   * dispatchSetConfig
   */
  function dispatchSetConfig() {
    const action = actions.setConfig(config);
    store.dispatch(action);
  }

  /**
   * fetchManifests
   */
  function fetchManifests() {
    config.windows.forEach(win => dispatchFetchManifest(win.loadedManifest));
  }

  /**
   * dispatchFetchManifest
   * @param uri
   */
  function dispatchFetchManifest(uri) {
    store.dispatch(actions.fetchManifest(uri));
  }

  /**
   * addWindows
   */
  function addWindows() {
    const thumbnailPositions = getThumbnailNavigationPositions(config);
    thumbnailPositions.forEach((thumbnailNavigationPosition, index) => {
      dispatchAddWindow({
        canvasIndex: (config.windows[index].canvasIndex || 0),
        manifestId: config.windows[index].loadedManifest,
        thumbnailNavigationPosition,
      });
    });
  }

  /**
   * dispatchAddWindow
   * @param options
   */
  function dispatchAddWindow(options) {
    store.dispatch(actions.addWindow(options));
  }

  /**
   * getThumbnailNavigationPositions
   */
  function getThumbnailNavigationPositions() {
    const positions = [];
    config.windows.forEach((val) => {
      if (val.thumbnailNavigationPosition) {
        positions.push(val.thumbnailNavigationPosition);
      } else {
        positions.push(config.thumbnailNavigation.defaultPosition);
      }
    });
    return positions;
  }

  return function HOCFactory(WrappedComponent) {
    return class HOC extends React.Component {
      /**
       *
       * @returns {*}
       */
      render() {
        return <WrappedComponent {...this.props} />;
      }
    };
  };
}
