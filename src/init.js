import MiradorViewer from './lib/MiradorViewer';
import './styles/index.scss';

/**
 * Default Mirador instantiation
 */
export default function (config) {
  return new MiradorViewer(config);
}
