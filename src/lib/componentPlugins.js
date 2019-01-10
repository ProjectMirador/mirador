/**
 * componentPlugins - gets window plugins based on a component parent
 */
export default function componentPlugins(componentName, plugins = []) {
  // TODO: Figure out how to handle when not running under window. Probably not
  // a pressing priority, but relevant for tests
  return plugins.map((pluginName) => {
    if (window.Mirador.plugins[pluginName]
        && window.Mirador.plugins[pluginName].parent === componentName) {
      return window.Mirador.plugins[pluginName];
    }
    return null;
  }).filter(plugin => (plugin !== (undefined || null)));
}
