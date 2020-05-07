import MiradorViewer from './lib/MiradorViewer';

/**
 * Default Mirador instantiation
 */
export default function (config, pluginsOrStruct) {
  let struct;

  if (Array.isArray(pluginsOrStruct)) {
    struct = { plugins: pluginsOrStruct };
  } else {
    struct = pluginsOrStruct;
  }

  return new MiradorViewer(config, struct);
}
