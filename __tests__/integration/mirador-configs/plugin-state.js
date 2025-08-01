import { stateDependentPlugin } from '../plugins/index';
import { PRIMARY_MANIFEST_FIXTURE_URL } from '../constants';

export default {
  config: {
    id: 'mirador',
    windows: [{
      canvasIndex: 2,
      loadedManifest: PRIMARY_MANIFEST_FIXTURE_URL,
      thumbnailNavigationPosition: 'far-bottom',
    }],
  },
  plugins: [stateDependentPlugin],
};
