import { call, select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import settings from '../../../src/config/settings';
import ActionTypes from '../../../src/state/actions/action-types';
import {
  refetchInfoResponses,
  refetchInfoResponsesOnLogout,
  doAuthWorkflow,
  rerequestOnAccessTokenFailure,
  invalidateInvalidAuth,
} from '../../../src/state/sagas/auth';
import { getAccessTokens, getAuth, getConfig } from '../../../src/state/selectors';
import { iiifApi } from '../../../src/state/api/iiifApi';

describe('IIIF Authentication sagas', () => {
  describe('refetchInfoResponsesOnLogout', () => {
    it('delays and then refetches info responses', () => {
      const tokenServiceId = 'whatever';
      /** stub out delay... ugh. */
      const provideDelay = ({ fn }, next) => (fn.name === 'delayP' ? null : next());

      return expectSaga(refetchInfoResponsesOnLogout, { tokenServiceId })
        .provide([{ call: provideDelay }, [call(refetchInfoResponses, { serviceId: tokenServiceId }), {}]])
        .call(refetchInfoResponses, { serviceId: tokenServiceId })
        .run();
    });
  });
  describe('refetchInfoResponses', () => {
    it('invalidates the TokenService tag for this service', () => {
      const serviceId = 'https://authentication.example.org/token';

      return expectSaga(refetchInfoResponses, { serviceId })
        .put(iiifApi.util.invalidateTags([{ id: serviceId, type: 'TokenService' }]))
        .run();
    });
  });
  describe('doAuthWorkflow', () => {
    it('kicks off the first external auth from the info.json', () => {
      const infoJson = {
        service: [
          {
            '@context': 'http://iiif.io/api/auth/1/context.json',
            '@id': 'https://authentication.example.com/external',
            profile: 'http://iiif.io/api/auth/1/external',
            service: [
              {
                '@id': 'https://authentication.example.com/token',
                profile: 'http://iiif.io/api/auth/1/token',
              },
            ],
          },
        ],
      };
      const windowId = 'window';
      return expectSaga(doAuthWorkflow, { infoJson, windowId })
        .provide([
          [select(getAuth), {}],
          [select(getConfig), { auth: settings.auth }],
        ])
        .put({
          id: 'https://authentication.example.com/external',
          profile: 'http://iiif.io/api/auth/1/external',
          type: ActionTypes.ADD_AUTHENTICATION_REQUEST,
          windowId,
        })
        .put({
          id: 'https://authentication.example.com/external',
          ok: true,
          tokenServiceId: 'https://authentication.example.com/token',
          type: ActionTypes.RESOLVE_AUTHENTICATION_REQUEST,
        })
        .put({
          authId: 'https://authentication.example.com/external',
          serviceId: 'https://authentication.example.com/token',
          type: ActionTypes.REQUEST_ACCESS_TOKEN,
        })
        .run();
    });

    it('does nothing if the auth service has been tried already', () => {
      const infoJson = {
        service: [
          {
            '@context': 'http://iiif.io/api/auth/1/context.json',
            '@id': 'https://authentication.example.com/external',
            profile: 'http://iiif.io/api/auth/1/external',
            service: [
              {
                '@id': 'https://authentication.example.com/token',
                profile: 'http://iiif.io/api/auth/1/token',
              },
            ],
          },
        ],
      };
      const windowId = 'window';
      return expectSaga(doAuthWorkflow, { infoJson, windowId })
        .provide([
          [select(getAuth), { 'https://authentication.example.com/external': { ok: false } }],
          [select(getConfig), { auth: settings.auth }],
        ])
        .not.put.like({ type: ActionTypes.RESOLVE_AUTHENTICATION_REQUEST })
        .not.put.like({ type: ActionTypes.REQUEST_ACCESS_TOKEN })
        .run();
    });

    it('does nothing if the auth service is "interactive"', () => {
      const infoJson = {
        service: [
          {
            '@context': 'http://iiif.io/api/auth/1/context.json',
            '@id': 'https://authentication.example.com/login',
            profile: 'http://iiif.io/api/auth/1/login',
            service: [
              {
                '@id': 'https://authentication.example.com/token',
                profile: 'http://iiif.io/api/auth/1/token',
              },
            ],
          },
        ],
      };
      const windowId = 'window';
      return expectSaga(doAuthWorkflow, { infoJson, windowId })
        .provide([
          [select(getAuth), {}],
          [select(getConfig), { auth: settings.auth }],
        ])
        .not.put.like({ type: ActionTypes.RESOLVE_AUTHENTICATION_REQUEST })
        .not.put.like({ type: ActionTypes.REQUEST_ACCESS_TOKEN })
        .run();
    });

    it('kicks off the kiosk auth from the info.json', () => {
      const infoJson = {
        service: [
          {
            '@context': 'http://iiif.io/api/auth/1/context.json',
            '@id': 'https://authentication.example.com/kiosk',
            profile: 'http://iiif.io/api/auth/1/kiosk',
            service: [
              {
                '@id': 'https://authentication.example.com/token',
                profile: 'http://iiif.io/api/auth/1/token',
              },
            ],
          },
        ],
      };
      const windowId = 'window';
      return expectSaga(doAuthWorkflow, { infoJson, windowId })
        .provide([
          [select(getAuth), {}],
          [select(getConfig), { auth: settings.auth }],
        ])
        .put({
          id: 'https://authentication.example.com/kiosk',
          profile: 'http://iiif.io/api/auth/1/kiosk',
          type: ActionTypes.ADD_AUTHENTICATION_REQUEST,
          windowId,
        })
        .run();
    });
  });

  describe('rerequestOnAccessTokenFailure', () => {
    it('does nothing if no access token was used', () => {
      const infoJson = {};
      const windowId = 'window';
      const tokenServiceId = undefined;
      return expectSaga(rerequestOnAccessTokenFailure, { infoJson, tokenServiceId, windowId })
        .provide([[select(getAccessTokens), {}]])
        .not.put.like({ type: ActionTypes.REQUEST_ACCESS_TOKEN })
        .run();
    });

    it('does nothing if the access token has never worked', () => {
      const infoJson = {
        service: [
          {
            '@context': 'http://iiif.io/api/auth/1/context.json',
            '@id': 'https://authentication.example.com/kiosk',
            profile: 'http://iiif.io/api/auth/1/kiosk',
            service: [
              {
                '@id': 'https://authentication.example.com/token',
                profile: 'http://iiif.io/api/auth/1/token',
              },
            ],
          },
        ],
      };
      const windowId = 'window';
      const tokenServiceId = 'https://authentication.example.com/token';
      return expectSaga(rerequestOnAccessTokenFailure, { infoJson, tokenServiceId, windowId })
        .provide([[select(getAccessTokens), { [tokenServiceId]: { success: false } }]])
        .not.put.like({ type: ActionTypes.REQUEST_ACCESS_TOKEN })
        .run();
    });

    it('re-requests the access token if it might be reneweable', () => {
      const infoJson = {
        service: [
          {
            '@context': 'http://iiif.io/api/auth/1/context.json',
            '@id': 'https://authentication.example.com/kiosk',
            profile: 'http://iiif.io/api/auth/1/kiosk',
            service: [
              {
                '@id': 'https://authentication.example.com/token',
                profile: 'http://iiif.io/api/auth/1/token',
              },
            ],
          },
        ],
      };
      const windowId = 'window';
      const tokenServiceId = 'https://authentication.example.com/token';
      return expectSaga(rerequestOnAccessTokenFailure, { infoJson, tokenServiceId, windowId })
        .provide([[select(getAccessTokens), { [tokenServiceId]: { success: true } }]])
        .put({
          authId: 'https://authentication.example.com/kiosk',
          serviceId: 'https://authentication.example.com/token',
          type: ActionTypes.REQUEST_ACCESS_TOKEN,
        })
        .run();
    });
  });

  describe('invalidateInvalidAuth', () => {
    it('resets the auth service if the auth cookie might have expired', () => {
      const authId = 'authId';
      const serviceId = 'serviceId';

      return expectSaga(invalidateInvalidAuth, { serviceId })
        .provide([
          [select(getAccessTokens), { [serviceId]: { authId, id: serviceId, success: true } }],
          [select(getAuth), { [authId]: { id: authId } }],
        ])
        .put({
          id: authId,
          tokenServiceId: serviceId,
          type: ActionTypes.RESET_AUTHENTICATION_STATE,
        })
        .run();
    });

    it('marks the auth service as failed if the auth token was not successfully used', () => {
      const authId = 'authId';
      const serviceId = 'serviceId';

      return expectSaga(invalidateInvalidAuth, { serviceId })
        .provide([
          [select(getAccessTokens), { [serviceId]: { authId, id: serviceId } }],
          [select(getAuth), { [authId]: { id: authId } }],
        ])
        .put({
          id: authId,
          ok: false,
          tokenServiceId: serviceId,
          type: ActionTypes.RESOLVE_AUTHENTICATION_REQUEST,
        })
        .run();
    });
  });
});
