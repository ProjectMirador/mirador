import * as actions from '../state/actions';
import createRootReducer from '../state/reducers';

/**
 *
 * @param config
 * @param store
 */
export const loadWindows = (config, store) => {
  // TODO simplify / fix unassignables / refactor dispatch
  config.windows.forEach((miradorWindow) => {
    let thumbnailNavigationPosition;
    if (miradorWindow.thumbnailNavigationPosition !== undefined) {
      ({ thumbnailNavigationPosition } = miradorWindow);
    } else {
      thumbnailNavigationPosition = config.thumbnailNavigation.defaultPosition;
    }
    store.dispatch(actions.fetchManifest(miradorWindow.loadedManifest));
    store.dispatch(actions.addWindow({
      manifestId: miradorWindow.loadedManifest, thumbnailNavigationPosition,
    }));
  });
};

/**
 *
 * @param config
 * @param store
 */
export const processPlugins = (config, store) => {
  // TODO simplify / fix unassignables / remove window
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
  reducers.forEach((reducer) => { store.pluginReducers[reducer.name] = reducer.reducer; }); //eslint-disable-line
  store.replaceReducer(createRootReducer(store.pluginReducers));
};
