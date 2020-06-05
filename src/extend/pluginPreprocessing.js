import { validatePlugin } from './pluginValidation';

/** */
export function filterValidPlugins(plugins) {
  const { validPlugins, invalidPlugins } = splitPluginsByValidation(plugins);
  logInvalidPlugins(invalidPlugins);
  return validPlugins;
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

/**  */
export function getReducersFromPlugins(plugins) {
  return plugins && plugins.reduce((acc, plugin) => ({ ...acc, ...plugin.reducers }), {});
}

/**  */
export function getSagasFromPlugins(plugins) {
  return plugins && plugins.filter(plugin => plugin.saga).map(plugin => plugin.saga);
}
