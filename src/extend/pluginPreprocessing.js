import update from 'lodash/update';
import { connect } from 'react-redux';
import { validatePlugin } from './pluginValidation';

/**
 * Returns a mapping from targets to plugins and modes
 *
 * @param {Array} plugins
 * @return {Object} - looks like:
 *
 *  {
 *    'WorkspacePanel': {
 *      wrap:     [plugin3, ...],
 *      add:      [plugin4, ...],
 *    },
 *    ...
 *  }
 */
export function createTargetToPluginMapping(plugins) {
  return plugins.reduce((map, plugin) => (
    update(map, [plugin.target, plugin.mode], x => [...x || [], plugin])
  ), {});
}

/** */
export function filterValidPlugins(plugins) {
  const { validPlugins, invalidPlugins } = splitPluginsByValidation(plugins);
  logInvalidPlugins(invalidPlugins);
  return validPlugins;
}

/** */
export function connectPluginsToStore(plugins) {
  return plugins.map(plugin => (
    { ...plugin, component: connectPluginComponent(plugin) }
  ));
}

/** */
export function addPluginReducersToStore(store, createRootReducer, plugins) {
  const pluginReducers = getReducersFromPlugins(plugins);
  store.replaceReducer(createRootReducer(pluginReducers));
}

/** */
function splitPluginsByValidation(plugins) {
  const splittedPlugins = { invalidPlugins: [], validPlugins: [] };
  plugins.forEach(plugin => (
    validatePlugin(plugin)
      ? splittedPlugins.validPlugins.push(plugin)
      : splittedPlugins.invalidPlugins.push(plugin)
  ));
  return splittedPlugins;
}

/** */
function logInvalidPlugins(plugins) {
  plugins.forEach(plugin => (
    console.log(`Mirador: Plugin ${plugin.name} is not valid and was rejected.`)
  ));
}

/** Connect plugin component to state */
function connectPluginComponent(plugin) {
  return connect(plugin.mapStateToProps, plugin.mapDispatchToProps)(plugin.component);
}

/**  */
function getReducersFromPlugins(plugins) {
  return plugins && plugins.reduce((acc, plugin) => ({ ...acc, ...plugin.reducers }), {});
}
