import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../../src/actions/index';
import ActionTypes from '../../../src/action-types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('infoResponse actions', () => {
  describe('requestInfoResponse', () => {
    it('requests an infoResponse from given a url', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.REQUEST_INFO_RESPONSE,
        infoId: id
      };
      expect(actions.requestInfoResponse(id)).toEqual(expectedAction);
    });
  });
  describe('receiveInfoResponse', () => {
    it('recieves an infoResponse', () => {
      const id = 'abc123';
      const json = {
        id,
        content: 'image information request'
      };
      const expectedAction = {
        type: ActionTypes.RECEIVE_INFO_RESPONSE,
        infoId: id,
        infoJson: json
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
        store.dispatch(
          actions.fetchInfoResponse(
            'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json'
          )
        );
        expect(store.getActions()).toEqual([
          {
            infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json',
            type: 'REQUEST_INFO_RESPONSE'
          }
        ]);
      });
      it('dispatches the REQUEST_MANIFEST and then RECEIVE_MANIFEST', () => {
        store
          .dispatch(
            actions.fetchInfoResponse(
              'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json'
            )
          )
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              {
                infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json',
                type: 'REQUEST_INFO_RESPONSE'
              },
              {
                infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json',
                infoJson: { data: '12345' },
                type: 'RECEIVE_INFO_RESPONSE'
              }
            ]);
          });
      });
    });
    describe('error response', () => {
      it('dispatches the REQUEST_INFO_RESPONSE and then RECEIVE_INFO_RESPONSE', () => {
        store
          .dispatch(
            actions.fetchInfoResponse(
              'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json'
            )
          )
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              {
                infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json',
                type: 'REQUEST_INFO_RESPONSE'
              },
              {
                infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json',
                error: new Error(
                  'invalid json response body at undefined reason: Unexpected end of JSON input'
                ),
                type: 'RECEIVE_INFO_RESPONSE_FAILURE'
              }
            ]);
          });
      });
    });
  });
  describe('removeInfoResponse', () => {
    it('removes an existing infoResponse', () => {
      const expectedAction = {
        type: ActionTypes.REMOVE_INFO_RESPONSE,
        infoId: 'foo'
      };
      expect(actions.removeInfoResponse('foo')).toEqual(expectedAction);
    });
  });
});
