import MiradorViewer from './lib/MiradorViewer';

/**
 * Default Mirador instantiation
 */
export default function (config, plugins) {
  return new MiradorViewer(config, plugins);
}
