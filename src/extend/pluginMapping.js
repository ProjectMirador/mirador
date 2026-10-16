import { connect } from 'react-redux';
import CompanionWindowRegistry from '../lib/CompanionWindowRegistry';

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
  const map = {};

  plugins.forEach((plugin) => {
    const modes = (map[plugin.target] ||= {});
    modes[plugin.mode] = [...(modes[plugin.mode] || []), plugin];
  });

  return map;
}

/** */
export function connectPluginsToStore(plugins) {
  return plugins.map((plugin) => ({ ...plugin, component: connectPluginComponent(plugin) }));
}

/** */
export function addPluginsToCompanionWindowsRegistry(plugins) {
  plugins
    .filter((p) => p.companionWindowKey)
    .forEach((plugin) => {
      CompanionWindowRegistry[plugin.companionWindowKey] = plugin.component;
    });

  return CompanionWindowRegistry;
}

/** Connect plugin component to state */
function connectPluginComponent(plugin) {
  if (!plugin.mapStateToProps && !plugin.mapDispatchToProps) return plugin.component;

  return connect(plugin.mapStateToProps, plugin.mapDispatchToProps, ...(plugin.connectOptions || []))(plugin.component);
}
