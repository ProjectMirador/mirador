import { searchesReducer } from '../../../src/state/reducers/search';
import ActionTypes from '../../../src/state/actions/action-types';

describe('search reducer', () => {
  it('should handle REQUEST_SEARCH', () => {
    expect(searchesReducer({}, {
      searchId: 'abc123',
      targetId: 'foo',
      type: ActionTypes.REQUEST_SEARCH,
    })).toEqual({
      foo: {
        abc123: {
          id: 'abc123',
          isFetching: true,
        },
      },
    });
  });
  it('should handle RECEIVE_SEARCH', () => {
    expect(searchesReducer(
      {
        foo: {
          abc123: {
            id: 'abc123',
            isFetching: true,
          },
        },
      },
      {
        searchId: 'abc123',
        searchJson: {
          '@type': 'sc:AnnotationList',
          content: 'anno stuff',
          id: 'abc123',
        },
        targetId: 'foo',
        type: ActionTypes.RECEIVE_SEARCH,
      },
    )).toMatchObject({
      foo: {
        abc123: {
          id: 'abc123',
          isFetching: false,
          json: {},
        },
      },
    });
  });
  it('should handle RECEIVE_SEARCH_FAILURE', () => {
    expect(searchesReducer(
      {
        foo: {
          abc123: {
            id: 'abc123',
            isFetching: true,
          },
        },
      },
      {
        error: "This institution didn't enable CORS.",
        searchId: 'abc123',
        targetId: 'foo',
        type: ActionTypes.RECEIVE_SEARCH_FAILURE,
      },
    )).toEqual({
      foo: {
        abc123: {
          error: "This institution didn't enable CORS.",
          id: 'abc123',
          isFetching: false,
        },
      },
    });
  });
  it('should handle IMPORT_MIRADOR_STATE setting to clean state', () => {
    expect(searchesReducer({}, {
      state: { searchs: { new: 'stuff' } },
      type: ActionTypes.IMPORT_MIRADOR_STATE,
    })).toEqual({});
  });
});
