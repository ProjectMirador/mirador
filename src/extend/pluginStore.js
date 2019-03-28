import update from 'lodash/update';
import { validatePlugin } from '.';

export const pluginStore = {
  /**
  * Get plugins for target
  *
  * @param {String} targetName
  * @return {Object | undefined } - looks like:
  *
  *  {
  *    wrap:     [plugin1, ...],
  *    add:      [plugin2, ...],
  *  }
  */
  getPlugins(target) {
    return this.pluginMap[target];
  },
  /**
   * Store Plugins
   *
   * @param {Array} plugins
   */
  storePlugins(plugins = []) {
    const { validPlugins, invalidPlugins } = filterPlugins(plugins);
    logInvalidPlugins(invalidPlugins);
    this.pluginMap = mapPlugins(validPlugins);
  },
};

/**
 * Returns a mapping from plugins to targets and modes
 *
 * @param {Array} plugins
 * @return {Object} - looks like:
 *
 *
 *  {
 *    'WorkspacePanel': {
 *      wrap:     [plugin3, ...],
 *      add:      [plugin4, ...],
 *    },
 *    'Window': {
 *      wrap:     [plugin3, ...],
 *      add:      [plugin4, ...],
 *    }
 *  }
 */
function mapPlugins(plugins) {
  return plugins.reduce((map, plugin) => (
    update(map, [plugin.target, plugin.mode], x => [...x || [], plugin])
  ), {});
}

/** */
function filterPlugins(plugins) {
  const filteredPlugins = { invalidPlugins: [], validPlugins: [] };
  plugins.forEach(plugin => (
    validatePlugin(plugin)
      ? filteredPlugins.validPlugins.push(plugin)
      : filteredPlugins.invalidPlugins.push(plugin)
  ));
  return filteredPlugins;
}

/** */
function logInvalidPlugins(plugins) {
  plugins.forEach(plugin => (
    console.log('Mirador: Plugin ${plugin.name} is not valid and was rejected.')
  ));
}
