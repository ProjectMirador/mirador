import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';
import manifestFixture015 from '../../fixtures/version-2/015.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('search actions', () => {
  describe('requestSearch', () => {
    it('requests an search from given a url', () => {
      const query = 'search terms';
      const windowId = 'foo';
      const companionWindowId = 'abc123';
      const searchId = 'search?page=1';
      const expectedAction = {
        companionWindowId,
        query,
        searchId,
        type: ActionTypes.REQUEST_SEARCH,
        windowId,
      };
      expect(
        actions.requestSearch(windowId, companionWindowId, searchId, query),
      ).toEqual(expectedAction);
    });
  });
  describe('receiveSearch', () => {
    let store = null;
    beforeEach(() => {
      store = mockStore({});
    });

    it('recieves an search', () => {
      const windowId = 'foo';
      const companionWindowId = 'abc123';
      const searchId = 'search?page=1';
      const json = {
        companionWindowId,
        content: 'search request',
      };
      const expectedAction = {
        companionWindowId,
        searchId,
        searchJson: json,
        type: ActionTypes.RECEIVE_SEARCH,
        windowId,
      };
      store.dispatch(
        actions.receiveSearch(windowId, companionWindowId, searchId, json),
      );
      expect(store.getActions()).toEqual([expectedAction]);
    });

    it('provides the first annotation id and its canvas', () => {
      store = mockStore({
        manifests: {
          bar: {
            json: manifestFixture015,
          },
        },
        windows: {
          foo: {
            manifestId: 'bar',
          },
        },
      });

      const windowId = 'foo';
      const companionWindowId = 'abc123';
      const searchId = 'search?page=1';
      const json = {
        resources: [
          {
            '@id': 'abc123',
            on: 'http://iiif.io/api/presentation/2.0/example/fixtures/canvas/15/c2.json#0,2,4,5',
          },
        ],
      };
      const expectedAction = {
        annotationId: 'abc123',
        canvasId: 'http://iiif.io/api/presentation/2.0/example/fixtures/canvas/15/c2.json',
        companionWindowId,
        searchId,
        searchJson: json,
        type: ActionTypes.RECEIVE_SEARCH,
        windowId,
      };
      store.dispatch(
        actions.receiveSearch(windowId, companionWindowId, searchId, json),
      );
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  describe('removeSearch', () => {
    it('sends the remove search action', () => {
      const windowId = 'foo';
      const companionWindowId = 'abc123';
      const expectedAction = {
        companionWindowId,
        type: ActionTypes.REMOVE_SEARCH,
        windowId,
      };
      expect(actions.removeSearch(windowId, companionWindowId)).toEqual(expectedAction);
    });
  });

  describe('fetchSearch', () => {
    let store = null;
    beforeEach(() => {
      store = mockStore({});
    });
    describe('success response', () => {
      beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify({ data: '12345' })); // eslint-disable-line no-undef
      });
      it('dispatches the REQUEST_SEARCH action', () => {
        store.dispatch(actions.fetchSearch(
          'windowId',
          'companionWindowId',
          'searchId',
          'search terms',
        ));
        expect(store.getActions()).toEqual([
          {
            companionWindowId: 'companionWindowId',
            query: 'search terms',
            searchId: 'searchId',
            type: 'mirador/REQUEST_SEARCH',
            windowId: 'windowId',
          },
        ]);
      });
      it('dispatches the REQUEST_SEARCH and then RECEIVE_SEARCH', () => {
        store.dispatch(actions.fetchSearch(
          'windowId',
          'companionWindowId',
          'searchId',
        ))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              {
                companionWindowId: 'companionWindowId',
                searchId: 'searchId',
                type: 'mirador/REQUEST_SEARCH',
                windowId: 'windowId',
              },
              {
                companionWindowId: 'companionWindowId',
                searchId: 'searchId',
                searchJson: { data: '12345' },
                type: 'mirador/RECEIVE_SEARCH',
                windowId: 'windowId',
              },
            ]);
          });
      });
    });
    describe('error response', () => {
      it('dispatches the REQUEST_SEARCH and then RECEIVE_SEARCH', () => {
        store.dispatch(actions.fetchSearch(
          'windowId',
          'companionWindowId',
          'searchId',
        ))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              {
                companionWindowId: 'companionWindowId',
                searchId: 'searchId',
                type: 'mirador/REQUEST_SEARCH',
                windowId: 'windowId',
              },
              {
                companionWindowId: 'companionWindowId',
                error: new Error('invalid json response body at undefined reason: Unexpected end of JSON input'),
                searchId: 'searchId',
                type: 'mirador/RECEIVE_SEARCH_FAILURE',
                windowId: 'windowId',
              },
            ]);
          });
      });
    });
  });
  describe('selectContentSearchAnnotation', () => {
    it('dispatches the SELECT_CONTENT_SEARCH_ANNOTATION action with the right canvas index', () => {
      const store = mockStore({
        manifests: {
          bar: {
            json: manifestFixture015,
          },
        },
        searches: {
          foo: {
            cwid: {
              data: {
                'search?page=1': {
                  json: {
                    resources: [
                      {
                        '@id': 'abc123',
                        on: 'http://iiif.io/api/presentation/2.0/example/fixtures/canvas/15/c2.json#0,2,4,5',
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        windows: {
          foo: {
            manifestId: 'bar',
          },
        },
      });
      const windowId = 'foo';
      const companionWindowId = 'cwid';
      const annotationId = ['abc123'];
      const expectedAction = {
        annotationId,
        canvasId: 'http://iiif.io/api/presentation/2.0/example/fixtures/canvas/15/c2.json',
        companionWindowId,
        type: ActionTypes.SELECT_CONTENT_SEARCH_ANNOTATION,
        windowId,
      };
      store.dispatch(
        actions.selectContentSearchAnnotation(windowId, companionWindowId, annotationId),
      );
      const actualActions = store.getActions();
      expect(actualActions).toEqual([expectedAction]);
    });
  });
});
