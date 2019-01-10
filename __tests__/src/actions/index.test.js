import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../../src/actions/index';
import ActionTypes from '../../../src/action-types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  describe('addWindow', () => {
    it('should create a new window with merged defaults', () => {
      const options = {
        id: 'helloworld',
        canvasIndex: 1,
      };

      const expectedAction = {
        type: ActionTypes.ADD_WINDOW,
        payload: {
          id: 'helloworld',
          canvasIndex: 1,
          collectionIndex: 0,
          manifestId: null,
          rangeId: null,
          xywh: [0, 0, 400, 400],
          rotation: null,
        },
      };
      expect(actions.addWindow(options)).toEqual(expectedAction);
    });
  });
  describe('removeWindow', () => {
    it('removes the window and returns windowId', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.REMOVE_WINDOW,
        windowId: id,
      };
      expect(actions.removeWindow(id)).toEqual(expectedAction);
    });
  });
  describe('nextCanvas', () => {
    it('moves to the next canvas', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.NEXT_CANVAS,
        windowId: id,
      };
      expect(actions.nextCanvas(id)).toEqual(expectedAction);
    });
  });
  describe('previousCanvas', () => {
    it('moves to the previous canvas', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.PREVIOUS_CANVAS,
        windowId: id,
      };
      expect(actions.previousCanvas(id)).toEqual(expectedAction);
    });
  });
  describe('requestManifest', () => {
    it('requests a manifest given a url', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.REQUEST_MANIFEST,
        manifestId: id,
      };
      expect(actions.requestManifest(id)).toEqual(expectedAction);
    });
  });
  describe('receiveManifest', () => {
    it('moves to the previous canvas', () => {
      const id = 'abc123';
      const json = {
        id,
        content: 'lots of metadata, canvases, and other IIIFy things',
      };
      const expectedAction = {
        type: ActionTypes.RECEIVE_MANIFEST,
        manifestId: id,
        manifestJson: json,
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
          { manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest', type: 'REQUEST_MANIFEST' },
        ]);
      });
      it('dispatches the REQUEST_MANIFEST and then RECEIVE_MANIFEST', () => {
        store.dispatch(actions.fetchManifest('https://purl.stanford.edu/sn904cj3429/iiif/manifest'))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              { manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest', type: 'REQUEST_MANIFEST' },
              { manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest', manifestJson: { data: '12345' }, type: 'RECEIVE_MANIFEST' },
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
              { manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest', type: 'REQUEST_MANIFEST' },
              { manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest', error: new Error('invalid json response body at undefined reason: Unexpected end of JSON input'), type: 'RECEIVE_MANIFEST_FAILURE' },
            ]);
          });
      });
    });
  });
  describe('removeManifest', () => {
    it('removes an existing manifest', () => {
      const expectedAction = {
        type: ActionTypes.REMOVE_MANIFEST,
        manifestId: 'foo',
      };
      expect(actions.removeManifest('foo')).toEqual(expectedAction);
    });
  });
  describe('requestInfoResponse', () => {
    it('requests an infoResponse from given a url', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.REQUEST_INFO_RESPONSE,
        infoId: id,
      };
      expect(actions.requestInfoResponse(id)).toEqual(expectedAction);
    });
  });
  describe('receiveInfoResponse', () => {
    it('recieves an infoResponse', () => {
      const id = 'abc123';
      const json = {
        id,
        content: 'image information request',
      };
      const expectedAction = {
        type: ActionTypes.RECEIVE_INFO_RESPONSE,
        infoId: id,
        infoJson: json,
      };
      expect(actions.receiveInfoResponse(id, json)).toEqual(expectedAction);
    });
  });
  describe('fetchInfoResponse', () => {
    let store = null;
    beforeEach(() => {
      store = mockStore({});
    });
    describe('success response', () => {
      beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify({ data: '12345' })); // eslint-disable-line no-undef
      });
      it('dispatches the REQUEST_MANIFEST action', () => {
        store.dispatch(actions.fetchInfoResponse('https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json'));
        expect(store.getActions()).toEqual([
          { infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json', type: 'REQUEST_INFO_RESPONSE' },
        ]);
      });
      it('dispatches the REQUEST_MANIFEST and then RECEIVE_MANIFEST', () => {
        store.dispatch(actions.fetchInfoResponse('https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json'))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              { infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json', type: 'REQUEST_INFO_RESPONSE' },
              { infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json', infoJson: { data: '12345' }, type: 'RECEIVE_INFO_RESPONSE' },
            ]);
          });
      });
    });
    describe('error response', () => {
      it('dispatches the REQUEST_INFO_RESPONSE and then RECEIVE_INFO_RESPONSE', () => {
        store.dispatch(actions.fetchInfoResponse('https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json'))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              { infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json', type: 'REQUEST_INFO_RESPONSE' },
              { infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json', error: new Error('invalid json response body at undefined reason: Unexpected end of JSON input'), type: 'RECEIVE_INFO_RESPONSE_FAILURE' },
            ]);
          });
      });
    });
  });
  describe('removeInfoResponse', () => {
    it('removes an existing infoResponse', () => {
      const expectedAction = {
        type: ActionTypes.REMOVE_INFO_RESPONSE,
        infoId: 'foo',
      };
      expect(actions.removeInfoResponse('foo')).toEqual(expectedAction);
    });
  });
});
