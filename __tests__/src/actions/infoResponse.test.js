import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('infoResponse actions', () => {
  describe('requestInfoResponse', () => {
    it('requests an infoResponse from given a url', () => {
      const id = 'abc123';
      const expectedAction = {
        infoId: id,
        type: ActionTypes.REQUEST_INFO_RESPONSE,
      };
      expect(actions.requestInfoResponse(id)).toEqual(expectedAction);
    });
  });
  describe('receiveInfoResponse', () => {
    it('recieves an infoResponse', () => {
      const id = 'abc123';
      const json = {
        content: 'image information request',
        id,
      };
      const expectedAction = {
        infoId: id,
        infoJson: json,
        type: ActionTypes.RECEIVE_INFO_RESPONSE,
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
      it('dispatches the REQUEST_INFO_RESPONSE action', () => {
        store.dispatch(actions.fetchInfoResponse({ imageId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000' }));
        expect(store.getActions()).toEqual([
          { infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000', type: 'REQUEST_INFO_RESPONSE' },
        ]);
      });
      it('dispatches the REQUEST_INFO_RESPONSE and then RECEIVE_INFO_RESPONSE', () => {
        store.dispatch(actions.fetchInfoResponse({ imageId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000' }))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              { infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000', type: 'REQUEST_INFO_RESPONSE' },
              {
                infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000', infoJson: { data: '12345' }, ok: true, type: 'RECEIVE_INFO_RESPONSE',
              },
            ]);
          });
      });
      it('dispatches the REQUEST_INFO_RESPONSE with an existing access token', () => {
        store = mockStore({
          accessTokens: { a_token_service: { json: { accessToken: 'TOKEN' } } },
          infoResponses: {
            a: {
              isFetching: false,
              json: {
                service: {
                  profile: 'http://iiif.io/api/auth/1/some_auth_service',
                  service: [{
                    '@id': 'a_token_service',
                    profile: 'http://iiif.io/api/auth/1/token',
                  }],
                },
              },
            },
          },
        });
        // TODO: I've got no idea how to test if we used an acceess token
        store.dispatch(actions.fetchInfoResponse({ imageId: 'a' }))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              { infoId: 'a', type: 'REQUEST_INFO_RESPONSE' },
              {
                infoId: 'a', infoJson: { data: '12345' }, ok: true, type: 'RECEIVE_INFO_RESPONSE',
              },
            ]);
          });
      });
    });
    describe('error response', () => {
      it('dispatches the REQUEST_INFO_RESPONSE and then RECEIVE_INFO_RESPONSE', () => {
        store.dispatch(actions.fetchInfoResponse({ imageId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000' }))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              { infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000', type: 'REQUEST_INFO_RESPONSE' },
              { error: new Error('invalid json response body at undefined reason: Unexpected end of JSON input'), infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000', type: 'RECEIVE_INFO_RESPONSE_FAILURE' },
            ]);
          });
      });
    });
  });
  describe('removeInfoResponse', () => {
    it('removes an existing infoResponse', () => {
      const expectedAction = {
        infoId: 'foo',
        type: ActionTypes.REMOVE_INFO_RESPONSE,
      };
      expect(actions.removeInfoResponse('foo')).toEqual(expectedAction);
    });
  });
});
