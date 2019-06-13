import { searchesReducer } from '../../../src/state/reducers/search';
import ActionTypes from '../../../src/state/actions/action-types';

describe('search reducer', () => {
  it('should handle REQUEST_SEARCH', () => {
    expect(searchesReducer({}, {
      companionWindowId: 'abc123',
      query: 'search terms',
      targetId: 'foo',
      type: ActionTypes.REQUEST_SEARCH,
    })).toEqual({
      foo: {
        abc123: {
          isFetching: true,
          query: 'search terms',
        },
      },
    });
  });
  it('should handle RECEIVE_SEARCH', () => {
    expect(searchesReducer(
      {
        foo: {
          abc123: {
            isFetching: true,
          },
        },
      },
      {
        companionWindowId: 'abc123',
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
            isFetching: true,
          },
        },
      },
      {
        companionWindowId: 'abc123',
        error: "This institution didn't enable CORS.",
        targetId: 'foo',
        type: ActionTypes.RECEIVE_SEARCH_FAILURE,
      },
    )).toEqual({
      foo: {
        abc123: {
          error: "This institution didn't enable CORS.",
          isFetching: false,
        },
      },
    });
  });

  it('should handle REMOVE_SEARCH', () => {
    expect(searchesReducer(
      {
        foo: {
          abc123: {
            isFetching: false,
            json: {},
          },
          xyz321: {
            isFetching: false,
            json: {},
          },
        },
      },
      {
        companionWindowId: 'abc123',
        targetId: 'foo',
        type: ActionTypes.REMOVE_SEARCH,
      },
    )).toEqual({
      foo: {
        xyz321: {
          isFetching: false,
          json: {},
        },
      },
    });
  });

  it('should handle IMPORT_MIRADOR_STATE setting to clean state', () => {
    expect(searchesReducer(
      {
        foo: {
          abc123: {
            isFetching: true,
          },
        },
      },
      {
        state: { whatever: true },
        type: ActionTypes.IMPORT_MIRADOR_STATE,
      },
    )).toEqual({});
  });
  it('should handle REMOVE_WINDOW setting to clean state', () => {
    expect(searchesReducer(
      {
        foo: {
          abc123: {
            isFetching: true,
          },
        },
      },
      {
        type: ActionTypes.REMOVE_WINDOW,
        windowId: 'foo',
      },
    )).toEqual({});
  });
  it('should handle REMOVE_COMPANION_WINDOW setting to clean state', () => {
    expect(searchesReducer(
      {
        foo: {
          abc123: {
            isFetching: true,
          },
        },
      },
      {
        id: 'abc123',
        type: ActionTypes.REMOVE_COMPANION_WINDOW,
        windowId: 'foo',
      },
    )).toEqual({ foo: {} });
  });
});
