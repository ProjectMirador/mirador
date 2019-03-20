import manifesto from 'manifesto.js';
import manifestFixture001 from '../../fixtures/version-2/001.json';
import manifestFixture002 from '../../fixtures/version-2/002.json';
import manifestFixture019 from '../../fixtures/version-2/019.json';
import manifestFixtureWithAProvider from '../../fixtures/version-3/with_a_provider.json';
import {
  getCanvasLabel,
  getCompanionWindowForPosition,
  getAnnotationResourcesByMotivation,
  getIdAndContentOfResources,
  getLanguagesFromConfigWithCurrent,
  getSelectedCanvas,
  getSelectedCanvases,
  getThumbnailNavigationPosition,
  getSelectedAnnotationIds,
  getSelectedTargetAnnotations,
  getSelectedTargetsAnnotations,
  getSelectedTargetAnnotationResources,
  getWindowViewType,
  getIdAndLabelOfCanvases,
  getCompanionWindowsOfWindow,
  getWindowTitles,
} from '../../../src/state/selectors';
import Annotation from '../../../src/lib/Annotation';
import AnnotationResource from '../../../src/lib/AnnotationResource';

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

describe('getWindowViewType', () => {
  const state = {
    windows: {
      a: { id: 'a', view: 'single' },
      b: { id: 'b' },
    },
  };

  it('should return view type if window exists', () => {
    const received = getWindowViewType(state, { windowId: 'a' });
    expect(received).toBe('single');
  });

  it('should return undefined if view type does not exist in window', () => {
    const received = getWindowViewType(state, { windowId: 'b' });
    expect(received).toBeUndefined();
  });

  it('should return undefined if window does not exists', () => {
    const received = getWindowViewType(state, { windowId: 'c' });
    expect(received).toBeUndefined();
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
    const received = getCompanionWindowForPosition(state, { windowId: 'a', position: 'right' });

    expect(received.id).toEqual('abc');
  });

  it('returns undefined if the given window does not exist', () => {
    const received = getCompanionWindowForPosition(state, { windowId: 'c', position: 'right' });

    expect(received).toBeUndefined();
  });

  it('returns undefined if a companion window at the given position does not exist', () => {
    const received = getCompanionWindowForPosition(state, { windowId: 'a', position: 'bottom' });

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
    const received = getCompanionWindowsOfWindow(state, { windowId: 'abc123' });

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
