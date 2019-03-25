import update from 'lodash/update';

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
  storePlugins(plugins) {
    this.pluginMap = mapPlugins(plugins || []);
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
