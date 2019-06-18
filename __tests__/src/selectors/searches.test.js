import {
  getSearchQuery,
  getSearchHitsForCompanionWindow,
  getSearchAnnotationsForWindow,
  getSelectedContentSearchAnnotationIds,
  getSelectedContentSearchAnnotations,
  getResourceAnnotationForSearchHit,
  getResourceAnnotationLabel,
  getSearchIsFetching,
  getNextSearchId,
} from '../../../src/state/selectors';

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

describe('getSearchHitsForCompanionWindow', () => {
  const companionWindowId = 'cwid';
  it('returns flattened hits for a manifest', () => {
    const state = {
      searches: {
        a: {
          [companionWindowId]: {
            data: {
              'search?page=1': {
                json: { hits: [1, 2, 3] },
              },
              'search?page=2': {
                json: { hits: [4, 5] },
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
      getSearchHitsForCompanionWindow(state, { companionWindowId, windowId: 'a' }),
    ).toEqual([1, 2, 3, 4, 5]);
    expect(
      getSearchHitsForCompanionWindow(state, { companionWindowId, windowId: 'b' }),
    ).toEqual([]);
    expect(
      getSearchHitsForCompanionWindow({}, { companionWindowId, windowId: 'a' }),
    ).toEqual([]);
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
