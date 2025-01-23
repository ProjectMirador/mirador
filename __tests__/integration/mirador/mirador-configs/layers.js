export default {
  catalog: [
    { manifestId: 'https://demos.biblissima.fr/iiif/metadata/BVMM/chateauroux/manifest.json' },
    { manifestId: 'https://iiif.biblissima.fr/chateauroux/B360446201_MS0005/manifest.json' },
    { manifestId: 'https://prtd.app/aom/manifest.json' },
    { manifestId: 'https://prtd.app/fv/manifest.json' },
    { manifestId: 'https://dvp.prtd.app/hamilton/manifest.json' },
    { manifestId: 'https://iiif.io/api/cookbook/recipe/0036-composition-from-multiple-images/manifest.json' },
    { manifestId: 'https://iiif.io/api/cookbook/recipe/0033-choice/manifest.json' },
    { manifestId: 'https://iiif.bodleian.ox.ac.uk/iiif/manifest/1fc3f35d-bbb5-4524-8fbe-a5bcb5468be2.json' },
    { manifestId: 'https://iiif.ub.uni-leipzig.de/exp/manifests/layers2/manifest.json' },
  ],
  id: 'mirador',
  requests: {
    preprocessors: [
      (url, options) => ({
        ...options,
        headers: {
          ...options.headers,
          Accept: (url.includes('bodleian.ox.ac.uk') && (url.endsWith('/info.json')
            ? 'application/ld+json;profile=http://iiif.io/api/image/3/context.json'
            : 'application/ld+json;profile=http://iiif.io/api/presentation/3/context.json')) || '',
        },
      }),
    ],
  },
  window: {
    defaultSideBarPanel: 'layers',
    panels: { // Configure which panels are visible in WindowSideBarButtons
      layers: true,
      search: true,
    },
    sideBarOpenByDefault: true,
  },
  windows: [
    { manifestId: 'https://dvp.prtd.app/hamilton/manifest.json' },
    { manifestId: 'https://iiif.io/api/cookbook/recipe/0036-composition-from-multiple-images/manifest.json' },
  ],
};
