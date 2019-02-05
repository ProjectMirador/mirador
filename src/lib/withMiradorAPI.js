import React from 'react';

import * as actions from '../state/actions';
import createRootReducer from '../state/reducers';

/**
 * HoC that initializes a Mirador Application
 * @param store
 * @param config
 * @returns {function(*): {contextType?: React.Context<any>,
 * new(props: Readonly<P>): HOC, new(props: P, context?: any): HOC, prototype: HOC}}
 */
export default function withMiradorAPI(store, config) {
  // TODO validate config schema before processing / handle invalid or missing configuration
  // validateConfig(config);

  doInitialization();

  /**
   * doInitialization
   */
  function doInitialization() {
    processPlugins();
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

  /**
   * processPlugins
   */
  function processPlugins() {
    // TODO refactor / remove window dependency
    const plugins = config.plugins || [];
    const actionCreators = [];
    const reducers = [];

    plugins.forEach((pluginName) => {
      const plugin = window.Mirador.plugins[pluginName];

      // Add Actions
      if (plugin.actions) {
        Object.keys(plugin.actions)
          .forEach(actionName => actionCreators.push({
            name: actionName,
            action: plugin.actions[actionName],
          }));
      }
      // Add Reducers
      if (plugin.reducers) {
        Object.keys(plugin.reducers)
          .forEach(reducerName => reducers.push({
            name: reducerName,
            reducer: plugin.reducers[reducerName],
          }));
      }
    });
    actionCreators.forEach((action) => { actions[action.name] = action.action; });
    reducers.forEach((reducer) => { store.pluginReducers[reducer.name] = reducer.reducer; }); // eslint-disable-line
    store.replaceReducer(createRootReducer(store.pluginReducers));
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
