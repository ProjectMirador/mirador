import { PRIMARY_CANVAS_FIXTURE_URL, PRIMARY_MANIFEST_FIXTURE_URL } from '../constants';

// has 2 windows, one gaugin and one bodleian
export default {
  annotation: {
    tagsSuggestions: ['Mirador', 'IIIF', 'Video', 'Annotation', 'Canyon'],
  },
  annotations: {
    htmlSanitizationRuleSet: 'liberal',
  },
  catalog: [
    { manifestId: 'https://files.tetras-libre.fr/dev/vertical_video_with_annot.json' },
    { manifestId: 'https://files.tetras-libre.fr/dev/Heterogeneous-media-on-several-canvases.json' },
    { manifestId: 'https://files.tetras-libre.fr/dev/youtube.json' },
    { manifestId: 'https://files.tetras-libre.fr/dev/youtube_withannot.json' },
    { manifestId: 'https://files.tetras-libre.fr/dev/peertube.json' },
  ],
  debug: false,
  id: 'mirador',
  theme: {
    transitions: {},
  },
  window: {
    defaultSideBarPanel: 'annotations',
    sideBarOpenByDefault: true,
  },
  windows: [{
    canvasIndex: 0,
    loadedManifest: 'https://files.tetras-libre.fr/dev/vertical_video_with_annot.json',
    sideBarOpen: true,
    view: 'single',
  }],
};
