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
      const targetId = 'foo';
      const companionWindowId = 'abc123';
      const expectedAction = {
        companionWindowId,
        query,
        targetId,
        type: ActionTypes.REQUEST_SEARCH,
      };
      expect(actions.requestSearch(targetId, companionWindowId, query)).toEqual(expectedAction);
    });
  });
  describe('receiveSearch', () => {
    it('recieves an search', () => {
      const targetId = 'foo';
      const companionWindowId = 'abc123';
      const json = {
        companionWindowId,
        content: 'search request',
      };
      const expectedAction = {
        companionWindowId,
        searchJson: json,
        targetId,
        type: ActionTypes.RECEIVE_SEARCH,
      };
      expect(actions.receiveSearch(targetId, companionWindowId, json)).toEqual(expectedAction);
    });
  });

  describe('removeSearch', () => {
    it('sends the remove search action', () => {
      const targetId = 'foo';
      const companionWindowId = 'abc123';
      const expectedAction = {
        companionWindowId,
        targetId,
        type: ActionTypes.REMOVE_SEARCH,
      };
      expect(actions.removeSearch(targetId, companionWindowId)).toEqual(expectedAction);
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
          'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
          'companionWindowId',
          'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
          'search terms',
        ));
        expect(store.getActions()).toEqual([
          {
            companionWindowId: 'companionWindowId',
            query: 'search terms',
            targetId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
            type: 'REQUEST_SEARCH',
          },
        ]);
      });
      it('dispatches the REQUEST_SEARCH and then RECEIVE_SEARCH', () => {
        store.dispatch(actions.fetchSearch(
          'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
          'companionWindowId',
          'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
        ))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              {
                companionWindowId: 'companionWindowId',
                targetId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
                type: 'REQUEST_SEARCH',
              },
              {
                companionWindowId: 'companionWindowId',
                searchJson: { data: '12345' },
                targetId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
                type: 'RECEIVE_SEARCH',
              },
            ]);
          });
      });
    });
    describe('error response', () => {
      it('dispatches the REQUEST_SEARCH and then RECEIVE_SEARCH', () => {
        store.dispatch(actions.fetchSearch(
          'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
          'companionWindowId',
          'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
        ))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              {
                companionWindowId: 'companionWindowId',
                targetId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
                type: 'REQUEST_SEARCH',
              },
              {
                companionWindowId: 'companionWindowId',
                error: new Error('invalid json response body at undefined reason: Unexpected end of JSON input'),
                targetId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
                type: 'RECEIVE_SEARCH_FAILURE',
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
        windows: {
          foo: {
            manifestId: 'bar',
          },
        },
      });
      const windowId = 'foo';
      const annotationId = ['abc123'];
      const expectedAction = {
        annotationId,
        canvasIndex: 1,
        type: ActionTypes.SELECT_CONTENT_SEARCH_ANNOTATION,
        windowId,
      };
      store.dispatch(actions.selectContentSearchAnnotation(windowId, annotationId));
      const actualActions = store.getActions();
      expect(actualActions).toEqual([expectedAction]);
    });
  });
});
