import {
  getSearchResultsForManifest,
  getSearchHitsForManifest,
} from '../../../src/state/selectors';

describe('getSearchResultsForManifest', () => {
  it('returns flattened results for a manifest', () => {
    const state = {
      manifests: {
        'http://example.com/manifest/1': {
          id: 'http://example.com/manifest/1',
        },
      },
      searches: {
        'http://example.com/manifest/1': {
          'http://example.com/search?q=help': {
            id: 'http://example.com/search?q=help',
            json: { foo: 'bar' },
          },
        },
        'http://example.com/manifest/2': {
          'http://example.com/search?q=help': {
            id: 'http://example.com/search?q=help',
            json: { foo: 'bar' },
          },
        },
      },
    };
    expect(
      getSearchResultsForManifest(state, { manifestId: 'http://example.com/manifest/1' }),
    ).toEqual([{
      id: 'http://example.com/search?q=help',
      json: { foo: 'bar' },
    }]);
    expect(
      getSearchResultsForManifest(state, { manifestId: 'http://example.com/manifest/foo' }),
    ).toEqual([]);
    expect(
      getSearchResultsForManifest({}, { manifestId: 'http://example.com/manifest/1' }),
    ).toEqual([]);
  });
});

describe('getSearchHitsForManifest', () => {
  it('returns flattened hits for a manifest', () => {
    const state = {
      manifests: {
        'http://example.com/manifest/1': {
          id: 'http://example.com/manifest/1',
        },
      },
      searches: {
        'http://example.com/manifest/1': {
          'http://example.com/search?q=help': {
            id: 'http://example.com/search?q=help',
            json: { hits: [1, 2, 3] },
          },
        },
        'http://example.com/manifest/2': {
          'http://example.com/search?q=help': {
            id: 'http://example.com/search?q=help',
            json: { foo: 'bar' },
          },
        },
      },
    };
    expect(
      getSearchHitsForManifest(state, { manifestId: 'http://example.com/manifest/1' }),
    ).toEqual([1, 2, 3]);
    expect(
      getSearchResultsForManifest(state, { manifestId: 'http://example.com/manifest/foo' }),
    ).toEqual([]);
    expect(
      getSearchResultsForManifest({}, { manifestId: 'http://example.com/manifest/1' }),
    ).toEqual([]);
  });
});
