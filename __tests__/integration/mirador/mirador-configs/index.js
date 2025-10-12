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
    { manifestId: 'https://files.tetras-libre.fr/dev/cats_video_with_annot.json' },
    { manifestId: 'https://files.tetras-libre.fr/dev/Heterogeneous-media-on-several-canvases.json' },
    { manifestId: 'https://dzkimgs.l.u-tokyo.ac.jp/videos/cat2020/manifest.json' },
    { manifestId: 'https://files.tetras-libre.fr/dev/vertical_video_with_annot.json' },
    { manifestId: 'https://files.tetras-libre.fr/dev/youtube.json' },
    { manifestId: 'https://files.tetras-libre.fr/dev/youtube_withannot.json' },
    { manifestId: 'https://files.tetras-libre.fr/dev/peertube.json' },
    { manifestId: 'https://files.tetras-libre.fr/dev/cats_simplify_video_with_annot.json' },
    { manifestId: 'https://files.tetras-libre.fr/dev/milansanremo25.json' },
    { manifestId: 'https://files.tetras-libre.fr/dev/sun-400x400-with-svg-target.json' },
  ],
  debug: true,
  id: 'mirador',
  theme: {
    transitions: {},
  },
  windows: [{ manifestId: 'https://files.tetras-libre.fr/dev/peertube.json' }],
};
