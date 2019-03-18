import manifesto from 'manifesto.js';
import manifestFixture001 from '../../fixtures/version-2/001.json';
import manifestFixture002 from '../../fixtures/version-2/002.json';
import manifestFixture019 from '../../fixtures/version-2/019.json';
import manifestFixtureWithAProvider from '../../fixtures/version-3/with_a_provider.json';
import {
  getCanvasLabel,
  getCompanionWindowForPosition,
  getDestructuredMetadata,
  getAnnotationResourcesByMotivation,
  getIdAndContentOfResources,
  getLanguagesFromConfigWithCurrent,
  getSelectedCanvas,
  getSelectedCanvases,
  getWindowManifest,
  getManifestLogo,
  getManifestCanvases,
  getManifestDescription,
  getThumbnailNavigationPosition,
  getManifestProvider,
  getManifestTitle,
  getManifestThumbnail,
  getSelectedAnnotationIds,
  getSelectedTargetAnnotations,
  getSelectedTargetsAnnotations,
  getSelectedTargetAnnotationResources,
  getWindowViewType,
  getIdAndLabelOfCanvases,
  getCompanionWindowsOfWindow,
} from '../../../src/state/selectors';
import Annotation from '../../../src/lib/Annotation';
import AnnotationResource from '../../../src/lib/AnnotationResource';


describe('getWindowManifest()', () => {
  const state = {
    windows: {
      a: { id: 'a', manifestId: 'x' },
      b: { id: 'b', manifestId: 'y' },
      c: { id: 'c' },
    },
    manifests: {
      x: { id: 'x' },
    },
  };

  it('should return the manifest of a certain window', () => {
    const received = getWindowManifest(state, 'a');
    const expected = { id: 'x' };
    expect(received).toEqual(expected);
  });

  it('should return undefined if window doesnt exist', () => {
    const received = getWindowManifest(state, 'unknown');
    expect(received).toBeUndefined();
  });

  it('should return undefined if window has no manifest id', () => {
    const received = getWindowManifest(state, 'c');
    expect(received).toBeUndefined();
  });

  it('should return undefined if manifest does not exist', () => {
    const received = getWindowManifest(state, 'b');
    expect(received).toBeUndefined();
  });
});

describe('getManifestLogo()', () => {
  it('should return manifest logo id', () => {
    const manifest = { manifestation: manifesto.create(manifestFixture001) };
    const received = getManifestLogo(manifest);
    expect(received).toEqual(manifestFixture001.logo['@id']);
  });

  it('should return null if manifest has no logo', () => {
    const manifest = { manifestation: manifesto.create({}) };
    const received = getManifestLogo(manifest);
    expect(received).toBeNull();
  });
});

describe('getManifestThumbnail()', () => {
  it('should return manifest thumbnail id', () => {
    const manifest = { manifestation: manifesto.create(manifestFixture001) };
    const received = getManifestThumbnail(manifest);
    expect(received).toEqual(manifestFixture001.thumbnail['@id']);
  });

  it('returns the first canvas thumbnail id', () => {
    const manifest = {
      manifestation: {
        getThumbnail: () => (null),
        getSequences: () => [
          {
            getCanvases: () => [
              { getThumbnail: () => ({ id: 'xyz' }) },
            ],
          },
        ],
      },
    };

    const received = getManifestThumbnail(manifest);
    expect(received).toEqual('xyz');
  });

  it('returns a thumbnail sized image url from the first canvas', () => {
    const manifest = { manifestation: manifesto.create(manifestFixture019) };
    const received = getManifestThumbnail(manifest);
    expect(received).toEqual('https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/full/,80/0/default.jpg');
  });

  it('should return null if manifest has no thumbnail', () => {
    const manifest = { manifestation: manifesto.create({}) };
    const received = getManifestThumbnail(manifest);
    expect(received).toBeNull();
  });
});

describe('getManifestCanvases', () => {
  it('returns an empty array if the manifestation is not loaded', () => {
    const manifest = {};
    const received = getManifestCanvases(manifest);
    expect(received).toEqual([]);
  });

  it('returns canvases from the manifest', () => {
    const manifest = { manifestation: manifesto.create(manifestFixture001) };
    const received = getManifestCanvases(manifest);
    expect(received.length).toBe(1);
    expect(received[0].id).toBe('https://iiif.bodleian.ox.ac.uk/iiif/canvas/9cca8fdd-4a61-4429-8ac1-f648764b4d6d.json');
  });
});

describe('getThumbnailNavigationPosition', () => {
  const state = {
    windows: {
      a: { id: 'a', thumbnailNavigationId: 'cw_a' },
      b: { id: 'b', thumbnailNavigationId: 'cw_b' },
    },
    companionWindows: {
      cw_a: { position: 'bottom' },
    },
  };

  it('should return thumbnail navigation position if window exists', () => {
    const received = getThumbnailNavigationPosition(state, 'a');
    expect(received).toBe('bottom');
  });

  it('should return undefined if position does not exist in window', () => {
    const received = getThumbnailNavigationPosition(state, 'b');
    expect(received).toBeUndefined();
  });

  it('should return undefined if window does not exists', () => {
    const received = getThumbnailNavigationPosition(state, 'c');
    expect(received).toBeUndefined();
  });
});

describe('getManifestTitle', () => {
  it('should return manifest title', () => {
    const manifest = { manifestation: manifesto.create(manifestFixture001) };
    const received = getManifestTitle(manifest);
    expect(received).toBe('Bodleian Library Human Freaks 2 (33)');
  });

  it('should return undefined if manifest undefined', () => {
    const received = getManifestTitle(undefined);
    expect(received).toBeUndefined();
  });

  it('should return undefined if no manifestation', () => {
    const manifest = {};
    const received = getManifestTitle(manifest);
    expect(received).toBeUndefined();
  });
});

describe('getWindowViewType', () => {
  const state = {
    windows: {
      a: { id: 'a', view: 'single' },
      b: { id: 'b' },
    },
  };

  it('should return view type if window exists', () => {
    const received = getWindowViewType(state, 'a');
    expect(received).toBe('single');
  });

  it('should return undefined if view type does not exist in window', () => {
    const received = getWindowViewType(state, 'b');
    expect(received).toBeUndefined();
  });

  it('should return undefined if window does not exists', () => {
    const received = getWindowViewType(state, 'c');
    expect(received).toBeUndefined();
  });
});

describe('getManifestDescription', () => {
  it('should return manifest description', () => {
    const manifest = { manifestation: manifesto.create(manifestFixture001) };
    const received = getManifestDescription(manifest);
    expect(received).toBe('[Handbill of Mr. Becket, [1787] ]');
  });

  it('should return undefined if manifest undefined', () => {
    const received = getManifestDescription(undefined);
    expect(received).toBeUndefined();
  });

  it('should return undefined if no manifestation', () => {
    const manifest = {};
    const received = getManifestDescription(manifest);
    expect(received).toBeUndefined();
  });
});

describe('getManifestProvider', () => {
  it('should return manifest provider label', () => {
    const manifest = { manifestation: manifesto.create(manifestFixtureWithAProvider) };
    const received = getManifestProvider(manifest);
    expect(received).toBe('Example Organization');
  });

  it('should return undefined if manifest undefined', () => {
    const received = getManifestProvider(undefined);
    expect(received).toBeUndefined();
  });

  it('should return undefined if no manifestation', () => {
    const manifest = {};
    const received = getManifestProvider(manifest);
    expect(received).toBeUndefined();
  });
});
describe('getSelectedCanvas', () => {
  const state = {
    windows: {
      a: {
        id: 'a',
        manifestId: 'x',
        canvasIndex: 1,
      },
    },
    manifests: {
      x: {
        id: 'x',
        manifestation: manifesto.create(manifestFixture019),
      },
    },
  };

  const noManifestationState = {
    windows: {
      a: {
        id: 'a',
        manifestId: 'x',
        canvasIndex: 1,
      },
    },
    manifests: {
      x: {
        id: 'x',
      },
    },
  };

  it('should return canvas based on the canvas index stored window state', () => {
    const selectedCanvas = getSelectedCanvas(state, 'a');

    expect(selectedCanvas.id).toEqual(
      'https://purl.stanford.edu/fr426cg9537/iiif/canvas/fr426cg9537_1',
    );
  });

  it('should return undefined when there is no manifestation to get a canvas from', () => {
    const selectedCanvas = getSelectedCanvas(noManifestationState, 'a');

    expect(selectedCanvas).toBeUndefined();
  });
});

describe('getSelectedCanvases', () => {
  const state = {
    windows: {
      a: {
        id: 'a',
        manifestId: 'x',
        canvasIndex: 1,
        view: 'book',
      },
    },
    manifests: {
      x: {
        id: 'x',
        manifestation: manifesto.create(manifestFixture019),
      },
    },
  };

  const noManifestationState = {
    windows: {
      a: {
        id: 'a',
        manifestId: 'x',
        canvasIndex: 1,
      },
    },
    manifests: {
      x: {
        id: 'x',
      },
    },
  };

  it('should return canvas groupings based on the canvas index stored window state', () => {
    const selectedCanvases = getSelectedCanvases(state, 'a');

    expect(selectedCanvases.length).toEqual(2);
    expect(selectedCanvases.map(canvas => canvas.id)).toEqual([
      'https://purl.stanford.edu/fr426cg9537/iiif/canvas/fr426cg9537_1',
      'https://purl.stanford.edu/rz176rt6531/iiif/canvas/rz176rt6531_1',
    ]);
  });

  it('should return undefined when there is no manifestation to get a canvas from', () => {
    const selectedCanvas = getSelectedCanvases(noManifestationState, 'a');

    expect(selectedCanvas).toBeUndefined();
  });
});

describe('getCanvasLabel', () => {
  it('should return label of the canvas', () => {
    const canvas = manifesto
      .create(manifestFixture001)
      .getSequences()[0]
      .getCanvases()[0];

    const received = getCanvasLabel(canvas);
    expect(received).toBe('Whole Page');
  });

  it('should return undefined if the canvas is undefined', () => {
    expect(getCanvasLabel(undefined)).toBeUndefined();
  });

  it('should return the canvas index as (+1) as string if no label given', () => {
    const canvas = { getLabel: () => [] };
    const received = getCanvasLabel(canvas, 42);
    expect(received).toBe('43');
  });
});

describe('getDestructuredMetadata', () => {
  it('should return the first value of label/value attributes for each object in the array ', () => {
    const iiifResource = manifesto.create(manifestFixture002);
    const received = getDestructuredMetadata(iiifResource);
    const expected = [{
      label: 'date',
      value: 'some date',
    }];

    expect(received).toEqual(expected);
  });

  it('returns an empty array if there is no metadata', () => {
    const iiifResource = manifesto.create(manifestFixture019);
    const received = getDestructuredMetadata(iiifResource);

    expect(received).toEqual([]);
  });
});

describe('getSelectedTargetAnnotations', () => {
  it('returns annotations for the given canvasId that have resources', () => {
    const state = {
      annotations: {
        abc123: {
          annoId1: { '@id': 'annoId1', json: { resources: ['aResource'] } },
          annoId2: { '@id': 'annoId2' },
          annoId3: { '@id': 'annoId3', json: { resources: [] } },
        },
      },
    };

    expect(getSelectedTargetAnnotations(state, 'abc123').length).toEqual(1);
  });

  it('returns an empty array if there are no annotations', () => {
    const state = { annotations: { xyz321: {} } };
    const expected = [];

    expect(getSelectedTargetAnnotations({}, 'abc123')).toEqual(expected);
    expect(getSelectedTargetAnnotations(state, 'abc123')).toEqual(expected);
  });
});

describe('getSelectedTargetsAnnotations', () => {
  it('returns annotations for multiple canvasIds', () => {
    const state = {
      annotations: {
        abc123: {
          annoId1: { '@id': 'annoId1', json: { resources: ['aResource'] } },
          annoId2: { '@id': 'annoId2' },
          annoId3: { '@id': 'annoId3', json: { resources: [] } },
        },
        def456: {
          annoId4: { '@id': 'annoId4', json: { resources: ['helloWorld'] } },
        },
      },
    };

    expect(getSelectedTargetsAnnotations(state, ['abc123', 'def456']).length).toEqual(2);
  });

  it('returns an empty array if there are no annotations', () => {
    const state = { annotations: { xyz321: {} } };
    const expected = [];

    expect(getSelectedTargetsAnnotations({}, ['abc123'])).toEqual(expected);
    expect(getSelectedTargetsAnnotations(state, ['abc123'])).toEqual(expected);
  });
});

describe('getAnnotationResourcesByMotivation', () => {
  const annotations = [
    new Annotation({ resources: [{ motivation: 'oa:commenting' }] }),
    new Annotation({ resources: [{ motivation: 'oa:not-commenting' }] }),
    new Annotation({ resources: [{ motivation: ['sc:something-else', 'oa:commenting'] }] }),
  ];

  it('returns an array of annotation resources (filtered by the passed in array of motiviations)', () => {
    const expected = [
      ['oa:commenting'],
      ['sc:something-else', 'oa:commenting'],
    ];

    expect(
      getAnnotationResourcesByMotivation(annotations, ['something', 'oa:commenting']).map(r => r.motivations),
    ).toEqual(expected);
  });
});

describe('getIdAndContentOfResources', () => {
  it('returns an array if id/content objects from the annotation resources', () => {
    const annotations = [
      new AnnotationResource({ '@id': 'theId', on: 'example.com', resource: { chars: 'The Content' } }),
    ];
    const expected = [
      { id: 'theId', targetId: 'example.com', content: 'The Content' },
    ];

    expect(getIdAndContentOfResources(annotations)).toEqual(expected);
  });

  it('provides an ID as a UUID if the annotation does not have one', () => {
    const annotations = [
      new AnnotationResource({ resource: { chars: 'The Content' } }),
    ];

    expect(getIdAndContentOfResources(annotations)[0].id).toEqual(
      expect.stringMatching(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/),
    );
  });

  it('handles resource arrays', () => {
    const annotations = [
      new AnnotationResource({ '@id': 'theId', on: 'example.com', resource: [{ chars: 'The' }, { chars: 'Content' }] }),
    ];
    const expected = [
      { id: 'theId', targetId: 'example.com', content: 'The Content' },
    ];

    expect(getIdAndContentOfResources(annotations)).toEqual(expected);
  });
});

describe('getIdAndLabelOfCanvases', () => {
  it('should return id and label of each canvas in manifest', () => {
    const canvases = manifesto
      .create(manifestFixture019)
      .getSequences()[0]
      .getCanvases();
    const received = getIdAndLabelOfCanvases(canvases);
    const expected = [
      {
        id: 'http://iiif.io/api/presentation/2.0/example/fixtures/canvas/24/c1.json',
        label: 'Test 19 Canvas: 1',
      },
      {
        id: 'https://purl.stanford.edu/fr426cg9537/iiif/canvas/fr426cg9537_1',
        label: 'Image 1',
      },
      {
        id: 'https://purl.stanford.edu/rz176rt6531/iiif/canvas/rz176rt6531_1',
        label: 'Image 2',
      },
    ];
    expect(received).toEqual(expected);
  });

  it('should return empty array if canvas if empty', () => {
    const received = getIdAndLabelOfCanvases([]);
    expect(received).toEqual([]);
  });
});

describe('getCompanionWindowForPosition', () => {
  const state = {
    windows: { a: { companionWindowIds: ['abc'] } },
    companionWindows: {
      abc: { id: 'abc', position: 'right' },
      xyz: { id: 'xyz', position: 'bottom' },
    },
  };

  it('the companion window type based on the given position', () => {
    const received = getCompanionWindowForPosition(state, 'a', 'right');

    expect(received.id).toEqual('abc');
  });

  it('returns undefined if the given window does not exist', () => {
    const received = getCompanionWindowForPosition(state, 'c', 'right');

    expect(received).toBeUndefined();
  });

  it('returns undefined if a companion window at the given position does not exist', () => {
    const received = getCompanionWindowForPosition(state, 'a', 'bottom');

    expect(received).toBeUndefined();
  });
});

describe('getLanguagesFromConfigWithCurrent', () => {
  it('returns an array of objects with locale, label, and current properties', () => {
    const state = {
      config: { language: 'epo', availableLanguages: { epo: 'Esparanto', tlh: 'Klingon' } },
    };

    const expected = [
      { locale: 'epo', label: 'Esparanto', current: true },
      { locale: 'tlh', label: 'Klingon', current: false },
    ];

    expect(getLanguagesFromConfigWithCurrent(state)).toEqual(expected);
  });
});

describe('getCompanionWindowsOfWindow', () => {
  const state = {
    windows: {
      abc123: {
        companionWindowIds: ['foo', 'bar'],
      },
    },
    companionWindows: {
      foo: {
        id: 'foo',
        content: 'info',
      },
      bar: {
        id: 'bar',
        content: 'canvas',
      },
    },
  };

  it('should return companion windows for a given window id', () => {
    const received = getCompanionWindowsOfWindow(state, 'abc123');

    expect(received).toEqual([
      { id: 'foo', content: 'info' },
      { id: 'bar', content: 'canvas' },
    ]);
  });
});

it('getSelectedAnnotationIds returns an array of selected annotation IDs from state', () => {
  const state = {
    windows: {
      wid: {
        selectedAnnotations: {
          tid1: ['aid1', 'aid2'],
          tid2: ['aid3'],
        },
      },
    },
  };

  expect(getSelectedAnnotationIds(state, 'wid', ['tid2'])).toEqual(
    ['aid3'],
  );
  expect(getSelectedAnnotationIds(state, 'wid', ['tid1', 'tid2'])).toEqual(
    ['aid1', 'aid2', 'aid3'],
  );
});

it('getSelectedTargetAnnotationResources filters the annotation resources by the annotationIds passed in', () => {
  const state = {
    annotations: {
      cid1: {
        annoId1: { id: 'annoId1', json: { resources: [{ '@id': 'annoId1' }, { '@id': 'annoId2' }] } },
      },
    },
  };

  expect(
    getSelectedTargetAnnotationResources(state, ['cid1'], ['annoId1'])[0].resources.length,
  ).toBe(1);

  expect(
    getSelectedTargetAnnotationResources(state, ['cid1'], ['annoId1', 'annoId2'])[0].resources.length,
  ).toBe(2);
});
