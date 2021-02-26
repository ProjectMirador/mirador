import MiradorViewer from './lib/MiradorViewer';
/**
 * Default Mirador instantiation
 */

function viewer(config, pluginsOrStruct) {
  var struct;

  if (Array.isArray(pluginsOrStruct)) {
    struct = {
      plugins: pluginsOrStruct
    };
  } else {
    struct = pluginsOrStruct;
  }

  return new MiradorViewer(config, struct);
}

var exports = {
  viewer: viewer
};
export default exports;