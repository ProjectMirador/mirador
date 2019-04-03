import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth actions', () => {
  describe('addAuthenticationRequest', () => {
    it('requests an authentication attempt from given a url', () => {
      const id = 'abc123';
      const windowId = 'windowId';
      const infoId = 'infoId';

      const expectedAction = {
        id,
        infoId,
        type: ActionTypes.ADD_AUTHENTICATION_REQUEST,
        windowId,
      };
      expect(actions.addAuthenticationRequest(windowId, infoId, id)).toEqual(expectedAction);
    });
  });
  describe('resolveAuthenticationRequest', () => {
    let store = null;
    beforeEach(() => {
      store = mockStore({});
    });

    it('triggers an access token fetch', () => {
      const authId = 'abc123';
      const infoId = 'x';
      const serviceId = 'xyz';

      store = mockStore({
        auth: {
          [authId]: {
            infoId: [infoId],
          },
        },
        infoResponses: {
          [infoId]: {
            json: {
              service: {
                '@id': authId,
                service: {
                  '@id': serviceId,
                  profile: 'http://iiif.io/api/auth/1/token',
                },
              },
            },
          },
        },
      });

      const expectedAction = {
        authId,
        infoIds: [infoId],
        serviceId,
        type: ActionTypes.REQUEST_ACCESS_TOKEN,
      };

      store.dispatch(actions.resolveAuthenticationRequest(authId));
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  describe('requestAccessToken', () => {
    it('requests an infoResponse from given a url', () => {
      const authId = 'abc123';
      const infoIds = ['x'];
      const serviceId = 'xyz';

      const expectedAction = {
        authId,
        infoIds,
        serviceId,
        type: ActionTypes.REQUEST_ACCESS_TOKEN,
      };
      expect(actions.requestAccessToken(serviceId, authId, infoIds)).toEqual(expectedAction);
    });
  });

  describe('receiveAccessToken', () => {
    it('recieves an access token', () => {
      const serviceId = 'abc123';
      const json = {
        content: 'image information request',
        serviceId,
      };

      const expectedAction = {
        json,
        serviceId,
        type: ActionTypes.RECEIVE_ACCESS_TOKEN,
      };
      expect(actions.receiveAccessToken(serviceId, json)).toEqual(expectedAction);
    });
  });

  describe('receiveAccessTokenFailure', () => {
    it('fails to receive an access token', () => {
      const serviceId = 'abc123';
      const error = 'some error';

      const expectedAction = {
        error,
        serviceId,
        type: ActionTypes.RECEIVE_ACCESS_TOKEN_FAILURE,
      };
      expect(actions.receiveAccessTokenFailure(serviceId, error)).toEqual(expectedAction);
    });
  });

  describe('resolveAccessTokenRequest', () => {
    let store = null;
    beforeEach(() => {
      store = mockStore({});
    });

    it('resolves the auth request, receives the access token, and re-dispatches fetching info responses', () => {
      const authId = 'abc123';
      const infoId = 'x';
      const messageId = 'xyz';
      const json = { accessToken: 1 };

      store = mockStore({
        accessTokens: {
          [messageId]: {
            authId,
            infoIds: [infoId],
          },
        },
      });

      store.dispatch(actions.resolveAccessTokenRequest({ messageId, ...json }));
      expect(store.getActions()).toEqual([
        { id: authId, ok: true, type: ActionTypes.RESOLVE_AUTHENTICATION_REQUEST },
        { json, serviceId: messageId, type: ActionTypes.RECEIVE_ACCESS_TOKEN },
        { infoId, type: ActionTypes.REQUEST_INFO_RESPONSE },
      ]);
    });

    it('without an access token, resolves the auth request unsuccessfully', () => {
      const authId = 'abc123';
      const infoId = 'x';
      const messageId = 'xyz';
      const json = { error: 'xyz' };

      store = mockStore({
        accessTokens: {
          [messageId]: {
            authId,
            infoIds: [infoId],
          },
        },
      });

      store.dispatch(actions.resolveAccessTokenRequest({ messageId, ...json }));
      expect(store.getActions()).toEqual([
        { id: authId, ok: false, type: ActionTypes.RESOLVE_AUTHENTICATION_REQUEST },
        { error: json, serviceId: messageId, type: ActionTypes.RECEIVE_ACCESS_TOKEN_FAILURE },
      ]);
    });
  });
});
