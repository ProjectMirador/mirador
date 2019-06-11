import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('search actions', () => {
  describe('requestSearch', () => {
    it('requests an search from given a url', () => {
      const targetId = 'foo';
      const searchId = 'abc123';
      const expectedAction = {
        searchId,
        targetId,
        type: ActionTypes.REQUEST_SEARCH,
      };
      expect(actions.requestSearch(targetId, searchId)).toEqual(expectedAction);
    });
  });
  describe('receiveSearch', () => {
    it('recieves an search', () => {
      const targetId = 'foo';
      const searchId = 'abc123';
      const json = {
        content: 'search request',
        searchId,
      };
      const expectedAction = {
        searchId,
        searchJson: json,
        targetId,
        type: ActionTypes.RECEIVE_SEARCH,
      };
      expect(actions.receiveSearch(targetId, searchId, json)).toEqual(expectedAction);
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
          'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
        ));
        expect(store.getActions()).toEqual([
          {
            searchId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
            targetId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
            type: 'REQUEST_SEARCH',
          },
        ]);
      });
      it('dispatches the REQUEST_SEARCH and then RECEIVE_SEARCH', () => {
        store.dispatch(actions.fetchSearch(
          'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
          'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
        ))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              {
                searchId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
                targetId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
                type: 'REQUEST_SEARCH',
              },
              {
                searchId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
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
          'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
        ))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              {
                searchId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
                targetId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
                type: 'REQUEST_SEARCH',
              },
              {
                error: new Error('invalid json response body at undefined reason: Unexpected end of JSON input'),
                searchId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
                targetId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
                type: 'RECEIVE_SEARCH_FAILURE',
              },
            ]);
          });
      });
    });
  });
});
