import {
  getSearchQuery,
  getSearchAnnotationsForWindow,
  getSortedSearchAnnotationsForCompanionWindow,
  getSortedSearchHitsForCompanionWindow,
  getSelectedContentSearchAnnotationIds,
  getSelectedContentSearchAnnotations,
  getResourceAnnotationForSearchHit,
  getResourceAnnotationLabel,
  getSearchIsFetching,
  getNextSearchId,
} from '../../../src/state/selectors';

jest.mock('../../../src/state/selectors/canvases', () => {
  const originalModule = jest.requireActual('../../../src/state/selectors/canvases');

  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    getCanvases: () => [
      { id: 'http://example.com/iiif/canvas1' },
      { id: 'http://example.com/iiif/canvas2' },
      { id: 'http://example.com/iiif/canvas3' },
    ],
  };
});

describe('getSearchQuery', () => {
  const companionWindowId = 'cwid';
  it('returns the search query performed', () => {
    const state = {
      searches: {
        a: {
          [companionWindowId]: {
            query: 'xyz',
          },
        },
      },
    };
    expect(
      getSearchQuery(state, { companionWindowId, windowId: 'a' }),
    ).toEqual('xyz');
    expect(
      getSearchQuery(state, { companionWindowId, windowId: 'b' }),
    ).toEqual(undefined);
  });
});

describe('getSearchIsFetching', () => {
  const companionWindowId = 'cwid';
  it('returns whether any search page is currently fetching', () => {
    const state = {
      searches: {
        a: {
          [companionWindowId]: {
            data: {
              'search?page=1': {
                isFetching: true,
              },
            },
          },
        },
        b: {
          [companionWindowId]: {
            data: {
              'search?page=1': {
                isFetching: false,
              },
            },
          },
        },
      },
    };
    expect(
      getSearchIsFetching(state, { companionWindowId, windowId: 'a' }),
    ).toEqual(true);
    expect(
      getSearchIsFetching(state, { companionWindowId, windowId: 'b' }),
    ).toEqual(false);
  });
});

describe('getNextSearchId', () => {
  const companionWindowId = 'cwid';
  it('it finds the next unrequested search page', () => {
    const state = {
      searches: {
        a: {
          [companionWindowId]: {
            data: {
              'search?page=1': {
                json: {
                  next: 'search?page=2',
                },
              },
              'search?page=2': {
                json: {
                  next: 'search?page=3',
                },
              },
            },
            query: 'xyz',
          },
        },
      },
    };
    expect(
      getNextSearchId(state, { companionWindowId, windowId: 'a' }),
    ).toEqual('search?page=3');
    expect(
      getSearchQuery(state, { companionWindowId, windowId: 'b' }),
    ).toEqual(undefined);
  });
});

describe('getSortedSearchHitsForCompanionWindow', () => {
  const companionWindowId = 'cwid';
  it('returns flattened and sorted (by canvas/target order) hits for a manifest', () => {
    const resources = [
      { '@id': 'http://example.com/iiif/canvas1', on: 'http://example.com/iiif/canvas1' },
      { '@id': 'http://example.com/iiif/canvas2', on: 'http://example.com/iiif/canvas2' },
      { '@id': 'http://example.com/iiif/canvas3', on: 'http://example.com/iiif/canvas3' },
    ];
    const state = {
      companionWindows: {
        [companionWindowId]: { position: 'left' },
      },
      searches: {
        a: {
          [companionWindowId]: {
            data: {
              'search?page=1': {
                json: {
                  hits: [
                    { annotations: ['http://example.com/iiif/canvas3'], id: 1 },
                    { annotations: ['http://example.com/iiif/canvas1'], id: 2 },
                    { annotations: ['http://example.com/iiif/canvas2'], id: 3 },
                  ],
                  resources,
                },
              },
              'search?page=2': {
                json: {
                  hits: [
                    { annotations: ['http://example.com/iiif/canvas3'], id: 4 },
                    { annotations: ['http://example.com/iiif/canvas1'], id: 5 },
                  ],
                  resources,
                },
              },
            },
          },
        },
        b: {
          [companionWindowId]: {
            data: {
              'search?page=1': {
                json: { foo: 'bar' },
              },
            },
          },
        },
      },
    };
    expect(
      getSortedSearchHitsForCompanionWindow(state, { companionWindowId, windowId: 'a' }),
    ).toEqual([
      { annotations: ['http://example.com/iiif/canvas1'], id: 2 },
      { annotations: ['http://example.com/iiif/canvas1'], id: 5 },
      { annotations: ['http://example.com/iiif/canvas2'], id: 3 },
      { annotations: ['http://example.com/iiif/canvas3'], id: 1 },
      { annotations: ['http://example.com/iiif/canvas3'], id: 4 },
    ]);
    expect(
      getSortedSearchHitsForCompanionWindow(state, { companionWindowId, windowId: 'b' }),
    ).toEqual([]);
    expect(
      getSortedSearchHitsForCompanionWindow({}, { companionWindowId, windowId: 'a' }),
    ).toEqual([]);
  });
});

describe('getSortedSearchAnnotationsForCompanionWindow', () => {
  it('sorts the search annotations for the companion window based on the "on" target', () => {
    const companionWindowId = 'cwid';
    const resources = [
      { '@id': 'http://example.com/iiif/canvas3', on: 'http://example.com/iiif/canvas3' },
      { '@id': 'http://example.com/iiif/canvas1', on: 'http://example.com/iiif/canvas1' },
      { '@id': 'http://example.com/iiif/canvas2', on: 'http://example.com/iiif/canvas2' },
    ];
    const state = {
      companionWindows: {
        [companionWindowId]: { position: 'left' },
      },
      searches: {
        a: {
          [companionWindowId]: {
            data: {
              'search?page=1': { json: { resources } },
            },
          },
        },
      },
    };

    expect(
      getSortedSearchAnnotationsForCompanionWindow(state, { companionWindowId, windowId: 'a' }).map(r => r.id),
    ).toEqual([
      'http://example.com/iiif/canvas1',
      'http://example.com/iiif/canvas2',
      'http://example.com/iiif/canvas3',
    ]);
  });
});

describe('getSearchAnnotationsForWindow', () => {
  const companionWindowId = 'cwid';

  it('returns results for a manifest', () => {
    const state = {
      searches: {
        a: {
          [companionWindowId]: {
            data: {
              'search?page=1': {
                json: { '@id': 'yolo', resources: [{ '@id': 'annoId2' }] },
              },
              'search?page=2': {
                json: { '@id': 'another', resources: [{ '@id': 'annoId3' }] },
              },
            },
          },
        },
        b: {
          [companionWindowId]: {
            data: {
              'search?page=1': {
                json: { foo: 'bar' },
              },
            },
          },
        },
      },
    };
    expect(
      getSearchAnnotationsForWindow(state, { companionWindowId, windowId: 'a' }),
    ).toEqual([{
      id: 'yolo',
      resources: [
        { resource: { '@id': 'annoId2' } },
        { resource: { '@id': 'annoId3' } },
      ],
    }]);
    expect(
      getSearchAnnotationsForWindow(state, { companionWindowId, windowId: 'b' }),
    ).toEqual([]);
    expect(
      getSearchAnnotationsForWindow({}, { companionWindowId, windowId: 'a' }),
    ).toEqual([]);
    expect(
      getSearchAnnotationsForWindow({}, { windowId: 'a' }),
    ).toEqual([]);
  });
});

describe('getSelectedContentSearchAnnotationIds', () => {
  it('returns the currently selected content search annotations for the window', () => {
    const state = {
      windows: {
        foo: {
          selectedContentSearchAnnotation: ['bar'],
        },
      },
    };

    expect(
      getSelectedContentSearchAnnotationIds(state, { windowId: 'foo' }),
    ).toEqual(['bar']);

    expect(
      getSelectedContentSearchAnnotationIds(state, { windowId: 'baz' }),
    ).toEqual([]);
  });

  it('returns the selected content search annotation for the search', () => {
    const state = {
      searches: {
        foo: {
          bar: {
            selectedContentSearchAnnotation: ['baz'],
          },
        },
      },
      windows: {
        foo: {
          selectedContentSearchAnnotation: ['unused'],
        },
      },
    };

    expect(
      getSelectedContentSearchAnnotationIds(state, { companionWindowId: 'bar', windowId: 'foo' }),
    ).toEqual(['baz']);

    expect(
      getSelectedContentSearchAnnotationIds(state, { windowId: 'baz' }),
    ).toEqual([]);
  });
});


describe('getSelectedContentSearchAnnotations', () => {
  it('returns the currently selected content search annotations for the window', () => {
    const state = {
      searches: {
        foo: {
          bar: {
            data: {
              'search?page=1': {
                json: { '@id': 'yolo', resources: [{ '@id': 'annoId2' }] },
              },
            },
          },
          baz: {
            data: {
              'search?page=1': {
                json: { '@id': 'nope', resources: [{ '@id': 'notthisone' }] },
              },
            },
          },
        },
      },
      windows: {
        foo: {
          selectedContentSearchAnnotation: ['annoId2'],
        },
      },
    };

    expect(
      getSelectedContentSearchAnnotations(state, { windowId: 'foo' })[0].resources.length,
    ).toEqual(1);

    expect(
      getSelectedContentSearchAnnotations(state, { windowId: 'foo' })[0].resources[0].id,
    ).toEqual('annoId2');

    expect(
      getSelectedContentSearchAnnotations(state, { windowId: 'baz' }),
    ).toEqual([]);
  });
});

describe('getResourceAnnotationForSearchHit', () => {
  const companionWindowId = 'cwid';
  const annoId = 'annoId2';
  it('returns the resource annotation connected to the hit by ID', () => {
    const state = {
      searches: {
        a: {
          [companionWindowId]: {
            data: {
              'search?page=1': {
                json: {
                  '@id': 'yolo',
                  resources: [{ '@id': annoId }],
                },
              },
            },
          },
        },
      },
    };

    expect(
      getResourceAnnotationForSearchHit(
        state, { annotationUri: annoId, companionWindowId, windowId: 'a' },
      ).resource['@id'],
    ).toEqual(annoId);
  });
});

describe('getResourceAnnotationLabel', () => {
  const companionWindowId = 'cwid';
  const annoId = 'annoId2';
  it('returns the label from a LanguageMap JSON object', () => {
    const state = {
      companionWindows: {
        [companionWindowId]: { locale: 'en' },
      },
      searches: {
        a: {
          [companionWindowId]: {
            data: {
              'search?page=1': {
                json: {
                  '@id': 'yolo',
                  resources: [{
                    '@id': annoId,
                    label: { '@language': 'en', '@value': 'The Annotation Label' },
                  }],
                },
              },
            },
          },
        },
      },
    };

    expect(
      getResourceAnnotationLabel(
        state, { annotationUri: annoId, companionWindowId, windowId: 'a' },
      ),
    ).toEqual(['The Annotation Label']);
  });

  it('returns an empty array if the annotation resource does not have a label (to be consistent w/ the return of LanguageMap.parse)', () => {
    const state = {
      companionWindows: {
        [companionWindowId]: { locale: 'en' },
      },
      searches: {
        a: {
          [companionWindowId]: {
            data: {
              'search?page=1': {
                json: { '@id': 'yolo', resources: [{ '@id': annoId }] },
              },
            },
          },
        },
      },
    };

    expect(
      getResourceAnnotationLabel(
        state, { annotationUri: annoId, companionWindowId, windowId: 'a' },
      ),
    ).toEqual([]);
  });
});
