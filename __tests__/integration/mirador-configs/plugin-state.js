import { stateDependentPlugin } from '../plugins/index';
import { PRIMARY_MANIFEST_FIXTURE_URL, PRIMARY_CANVAS_FIXTURE_URL } from './constants';

export default {
  config: {
    id: 'mirador',
    windows: [
      {
        canvasId: PRIMARY_CANVAS_FIXTURE_URL,
        loadedManifest: PRIMARY_MANIFEST_FIXTURE_URL,
        thumbnailNavigationPosition: 'far-bottom',
      },
    ],
  },
  plugins: [stateDependentPlugin],
};
