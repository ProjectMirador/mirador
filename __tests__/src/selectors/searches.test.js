import {
  getSearchQuery,
  getSearchResultsForWindow,
  getSearchHitsForCompanionWindow,
  getSearchAnnotationsForWindow,
  getSelectedContentSearchAnnotationIds,
  getSelectedContentSearchAnnotations,
  getSearchAnnotationForCompanionWindow,
  getResourceAnnotationForSearchHit,
  getResourceAnnotationLabel,
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

describe('getSearchResultsForWindow', () => {
  const companionWindowId = 'cwid';

  it('returns flattened results for a manifest', () => {
    const state = {
      searches: {
        a: {
          [companionWindowId]: {
            json: { foo: 'bar' },
          },
        },
        b: {
          [companionWindowId]: {
            json: { foo: 'bar' },
          },
        },
      },
    };
    expect(
      getSearchResultsForWindow(state, { windowId: 'a' }),
    ).toEqual({
      cwid: { json: { foo: 'bar' } },
    });
    expect(
      getSearchResultsForWindow({}, { windowId: 'a' }),
    ).toEqual([]);
  });
});

describe('getSearchHitsForCompanionWindow', () => {
  const companionWindowId = 'cwid';
  it('returns flattened hits for a manifest', () => {
    const state = {
      searches: {
        a: {
          [companionWindowId]: {
            json: { hits: [1, 2, 3] },
          },
        },
        b: {
          [companionWindowId]: {
            json: { foo: 'bar' },
          },
        },
      },
    };
    expect(
      getSearchHitsForCompanionWindow(state, { companionWindowId, windowId: 'a' }),
    ).toEqual([1, 2, 3]);
    expect(
      getSearchHitsForCompanionWindow(state, { companionWindowId, windowId: 'b' }),
    ).toEqual([]);
    expect(
      getSearchHitsForCompanionWindow({}, { companionWindowId, windowId: 'a' }),
    ).toEqual([]);
  });
});

describe('getSearchAnnotationForCompanionWindow', () => {
  const companionWindowId = 'cwid';

  it('returns results for a manifest', () => {
    const state = {
      searches: {
        a: {
          [companionWindowId]: {
            json: { '@id': 'yolo', resources: [{ '@id': 'annoId2' }] },
          },
        },
      },
    };
    expect(
      getSearchAnnotationForCompanionWindow(state, { companionWindowId, windowId: 'a' }),
    ).toEqual({
      id: 'yolo',
      resources: [{ resource: { '@id': 'annoId2' } }],
    });
    expect(
      getSearchAnnotationForCompanionWindow(state, { companionWindowId, windowId: 'b' }),
    ).toEqual(undefined);
    expect(
      getSearchAnnotationForCompanionWindow({}, { companionWindowId, windowId: 'a' }),
    ).toEqual(undefined);
    expect(
      getSearchAnnotationForCompanionWindow({}, { windowId: 'a' }),
    ).toEqual(undefined);
  });
});

describe('getSearchAnnotationsForWindow', () => {
  const companionWindowId = 'cwid';

  it('returns results for a manifest', () => {
    const state = {
      searches: {
        a: {
          [companionWindowId]: {
            json: { '@id': 'yolo', resources: [{ '@id': 'annoId2' }] },
          },
        },
        b: {
          [companionWindowId]: {
            json: { foo: 'bar' },
          },
        },
      },
    };
    expect(
      getSearchAnnotationsForWindow(state, { companionWindowId, windowId: 'a' }),
    ).toEqual([{
      id: 'yolo',
      resources: [{ resource: { '@id': 'annoId2' } }],
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
            json: { '@id': 'yolo', resources: [{ '@id': 'annoId2' }] },
          },
          baz: {
            json: { '@id': 'nope', resources: [{ '@id': 'notthisone' }] },
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
            json: {
              '@id': 'yolo',
              resources: [{ '@id': annoId }],
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
            json: { '@id': 'yolo', resources: [{ '@id': annoId }] },
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
