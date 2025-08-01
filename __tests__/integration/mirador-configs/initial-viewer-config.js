import { PRIMARY_MANIFEST_FIXTURE_URL, PRIMARY_CANVAS_FIXTURE_URL } from '../constants';

export default {
  id: 'mirador',
  windows: [{
    canvasId: PRIMARY_CANVAS_FIXTURE_URL,
    initialViewerConfig: {
      thumbnailNavigationPosition: 'far-bottom',
      x: 934,
      y: 782,
      // you need to specify zoom for this to look good
      zoom: 0.0007,
    },
    manifestId: PRIMARY_MANIFEST_FIXTURE_URL,
  }],
};
