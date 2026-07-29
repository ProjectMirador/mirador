import { connect } from 'react-redux';
import CompanionWindowRegistry from '../lib/CompanionWindowRegistry';
import { updatePath } from '../lib/utils';

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
  return plugins.reduce(
    (map, plugin) => updatePath([plugin.target, plugin.mode], (current) => [...(current || []), plugin], map),
    {},
  );
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
