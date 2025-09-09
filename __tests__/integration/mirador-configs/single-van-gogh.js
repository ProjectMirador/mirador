import { PRIMARY_CANVAS_FIXTURE_URL, PRIMARY_MANIFEST_FIXTURE_URL } from './constants';

export default {
  id: 'mirador',
  theme: {
    transitions: {},
  },
  thumbnailNavigation: {
    defaultPosition: 'far-bottom',
  },
  windows: [{
    canvasId: PRIMARY_CANVAS_FIXTURE_URL,
    manifestId: PRIMARY_MANIFEST_FIXTURE_URL,
  }],
};
