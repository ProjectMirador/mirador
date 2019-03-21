import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('manifest actions', () => {
  describe('requestManifest', () => {
    it('requests a manifest given a url', () => {
      const id = 'abc123';
      const expectedAction = {
        manifestId: id,
        type: ActionTypes.REQUEST_MANIFEST,
      };
      expect(actions.requestManifest(id)).toEqual(expectedAction);
    });
  });
  describe('receiveManifest', () => {
    it('receives a manifest', () => {
      const id = 'abc123';
      const json = {
        content: 'lots of metadata, canvases, and other IIIFy things',
        id,
      };
      const expectedAction = {
        manifestId: id,
        manifestJson: json,
        type: ActionTypes.RECEIVE_MANIFEST,
      };
      expect(actions.receiveManifest(id, json)).toEqual(expectedAction);
    });
  });
  describe('fetchManifest', () => {
    let store = null;
    beforeEach(() => {
      store = mockStore({});
    });
    describe('success response', () => {
      beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify({ data: '12345' })); // eslint-disable-line no-undef
      });
      it('dispatches the REQUEST_MANIFEST action', () => {
        store.dispatch(actions.fetchManifest('https://purl.stanford.edu/sn904cj3429/iiif/manifest'));
        expect(store.getActions()).toEqual([
          {
            manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest',
            properties: { isFetching: true },
            type: 'REQUEST_MANIFEST',
          },
        ]);
      });
      it('dispatches the REQUEST_MANIFEST and then RECEIVE_MANIFEST', () => {
        store.dispatch(actions.fetchManifest('https://purl.stanford.edu/sn904cj3429/iiif/manifest'))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              {
                manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest',
                properties: { isFetching: true },
                type: 'REQUEST_MANIFEST',
              },
              {
                manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest',
                manifestJson: { data: '12345' },
                type: 'RECEIVE_MANIFEST',
              },
            ]);
          });
      });
    });
    describe('error response', () => {
      it('dispatches the REQUEST_MANIFEST and then RECEIVE_MANIFEST', () => {
        store.dispatch(actions.fetchManifest('https://purl.stanford.edu/sn904cj3429/iiif/manifest'))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              {
                manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest',
                properties: { isFetching: true },
                type: 'REQUEST_MANIFEST',
              },
              {
                error: 'FetchError: invalid json response body at undefined reason: Unexpected end of JSON input',
                manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest',
                type: 'RECEIVE_MANIFEST_FAILURE',
              },
            ]);
          });
      });
    });
  });
  describe('removeManifest', () => {
    it('removes an existing manifest', () => {
      const expectedAction = {
        manifestId: 'foo',
        type: ActionTypes.REMOVE_MANIFEST,
      };
      expect(actions.removeManifest('foo')).toEqual(expectedAction);
    });
  });
});
