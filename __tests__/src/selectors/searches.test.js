import {
  getSearchResultsForManifest,
  getSearchHitsForManifest,
  getSearchAnnotationsForManifest,
} from '../../../src/state/selectors';

describe('getSearchResultsForManifest', () => {
  const companionWindowId = 'cwid';

  it('returns flattened results for a manifest', () => {
    const state = {
      manifests: {
        'http://example.com/manifest/1': {
          id: 'http://example.com/manifest/1',
        },
      },
      searches: {
        'http://example.com/manifest/1': {
          [companionWindowId]: {
            json: { foo: 'bar' },
          },
        },
        'http://example.com/manifest/2': {
          [companionWindowId]: {
            json: { foo: 'bar' },
          },
        },
      },
    };
    expect(
      getSearchResultsForManifest(state, { companionWindowId, manifestId: 'http://example.com/manifest/1' }),
    ).toEqual({
      json: { foo: 'bar' },
    });
    expect(
      getSearchResultsForManifest(state, { companionWindowId, manifestId: 'http://example.com/manifest/foo' }),
    ).toEqual(null);
    expect(
      getSearchResultsForManifest({}, { companionWindowId, manifestId: 'http://example.com/manifest/1' }),
    ).toEqual(null);
    expect(
      getSearchResultsForManifest({}, { manifestId: 'http://example.com/manifest/1' }),
    ).toEqual(null);
  });
});

describe('getSearchHitsForManifest', () => {
  const companionWindowId = 'cwid';
  it('returns flattened hits for a manifest', () => {
    const state = {
      manifests: {
        'http://example.com/manifest/1': {
          id: 'http://example.com/manifest/1',
        },
      },
      searches: {
        'http://example.com/manifest/1': {
          [companionWindowId]: {
            json: { hits: [1, 2, 3] },
          },
        },
        'http://example.com/manifest/2': {
          [companionWindowId]: {
            json: { foo: 'bar' },
          },
        },
      },
    };
    expect(
      getSearchHitsForManifest(state, { companionWindowId, manifestId: 'http://example.com/manifest/1' }),
    ).toEqual([1, 2, 3]);
    expect(
      getSearchHitsForManifest(state, { companionWindowId, manifestId: 'http://example.com/manifest/foo' }),
    ).toEqual([]);
    expect(
      getSearchHitsForManifest({}, { companionWindowId, manifestId: 'http://example.com/manifest/1' }),
    ).toEqual([]);
  });
});

describe('getSearchAnnotationsForManifest', () => {
  const companionWindowId = 'cwid';

  it('returns results for a manifest', () => {
    const state = {
      manifests: {
        'http://example.com/manifest/1': {
          id: 'http://example.com/manifest/1',
        },
      },
      searches: {
        'http://example.com/manifest/1': {
          [companionWindowId]: {
            json: { '@id': 'yolo', resources: [{ '@id': 'annoId2' }] },
          },
        },
        'http://example.com/manifest/2': {
          [companionWindowId]: {
            json: { foo: 'bar' },
          },
        },
      },
    };
    expect(
      getSearchAnnotationsForManifest(state, { companionWindowId, manifestId: 'http://example.com/manifest/1' }),
    ).toEqual([{
      id: 'yolo',
      resources: [{ resource: { '@id': 'annoId2' } }],
    }]);
    expect(
      getSearchAnnotationsForManifest(state, { companionWindowId, manifestId: 'http://example.com/manifest/foo' }),
    ).toEqual([]);
    expect(
      getSearchAnnotationsForManifest({}, { companionWindowId, manifestId: 'http://example.com/manifest/1' }),
    ).toEqual([]);
    expect(
      getSearchAnnotationsForManifest({}, { manifestId: 'http://example.com/manifest/1' }),
    ).toEqual([]);
  });
});
