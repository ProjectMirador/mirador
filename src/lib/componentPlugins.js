/**
 * componentPlugins - gets window plugins based on a component parent
 */
export default function componentPlugins(componentName) {
  // TODO: Figure out how to handle when not running under window. Probably not
  // a pressing priority, but relevant for tests
  if (!window.Mirador) return [];
  return Object.keys(window.Mirador.plugins)
    .reduce((result, component) => {
      // TODO: add a condition to only grab plugins from the config
      if (window.Mirador.plugins[component].parent === componentName) {
        result.push(window.Mirador.plugins[component]);
      }
      return result;
    }, []);
}
