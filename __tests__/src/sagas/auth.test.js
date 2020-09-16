import { call, select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { Utils } from 'manifesto.js/dist-esmodule/Utils';
import serviceFixture from '../../fixtures/version-2/canvasService.json';
import ActionTypes from '../../../src/state/actions/action-types';
import {
  refetchInfoResponses,
  refetchInfoResponsesOnLogout,
} from '../../../src/state/sagas/auth';
import {
  fetchInfoResponse,
} from '../../../src/state/sagas/iiif';
import {
  getAccessTokens,
  getWindows,
  selectInfoResponses,
  getVisibleCanvases,
} from '../../../src/state/selectors';

describe('IIIF Authentication sagas', () => {
  describe('refetchInfoResponsesOnLogout', () => {
    it('delays and then refetches info responses', () => {
      const tokenServiceId = 'whatever';
      /** stub out delay... ugh. */
      const provideDelay = ({ fn }, next) => ((fn.name === 'delayP') ? null : next());

      return expectSaga(refetchInfoResponsesOnLogout, { tokenServiceId })
        .provide([
          { call: provideDelay },
          [call(refetchInfoResponses, { serviceId: tokenServiceId }), {}],
        ])
        .call(refetchInfoResponses, { serviceId: tokenServiceId })
        .run();
    });
  });
  describe('refetchInfoResponses', () => {
    it('discards info responses that could hvae used the new access token', () => {
      const serviceId = 'https://authentication.example.org/token';
      const tokenService = { id: serviceId };

      const authStanza = {
        service: [{
          '@context': 'http://iiif.io/api/auth/1/context.json',
          '@id': 'https://authentication.example.org/login',
          profile: 'http://iiif.io/api/auth/1/login',
          service: [
            {
              '@id': serviceId,
              profile: 'http://iiif.io/api/auth/1/token',
            },
          ],
        }],
      };

      const x = {
        id: 'x',
        json: {
          ...authStanza,
        },
      };

      const y = {
        id: 'y',
        json: {
          ...authStanza,
        },
      };

      return expectSaga(refetchInfoResponses, { serviceId })
        .provide([
          [select(getAccessTokens), { [serviceId]: tokenService }],
          [select(getWindows), {}],
          [select(selectInfoResponses), { x, y }],
        ])
        .put({ infoId: 'x', type: ActionTypes.REMOVE_INFO_RESPONSE })
        .put({ infoId: 'y', type: ActionTypes.REMOVE_INFO_RESPONSE })
        .run();
    });

    it('ignores info responses that would not use the token', () => {
      const serviceId = 'https://authentication.example.org/token';
      const tokenService = { id: serviceId };

      const authStanza = {
        service: [{
          '@context': 'http://iiif.io/api/auth/1/context.json',
          '@id': 'https://authentication.example.org/login',
          profile: 'http://iiif.io/api/auth/1/login',
          service: [
            {
              '@id': 'https://authentication.example.org/some-other-token-service',
              profile: 'http://iiif.io/api/auth/1/token',
            },
          ],
        }],
      };

      const wrongService = {
        id: 'wrongService',
        json: {
          ...authStanza,
        },
      };

      const noAuth = {
        id: 'noAuth',
        json: {},
      };

      const noJson = {
        id: 'noJson',
      };

      return expectSaga(refetchInfoResponses, { serviceId })
        .provide([
          [select(getAccessTokens), { [serviceId]: tokenService }],
          [select(getWindows), {}],
          [select(selectInfoResponses), { noAuth, noJson, wrongService }],
        ])
        .not.put({ infoId: 'noAuth', type: ActionTypes.REMOVE_INFO_RESPONSE })
        .not.put({ infoId: 'noJson', type: ActionTypes.REMOVE_INFO_RESPONSE })
        .not.put({ infoId: 'wrongService', type: ActionTypes.REMOVE_INFO_RESPONSE })
        .run();
    });

    it('re-requests info responses for visible canvases', () => {
      const serviceId = 'https://authentication.example.org/token';
      const tokenService = { id: serviceId };

      const authStanza = {
        service: [{
          '@context': 'http://iiif.io/api/auth/1/context.json',
          '@id': 'https://authentication.example.org/login',
          profile: 'http://iiif.io/api/auth/1/login',
          service: [
            {
              '@id': serviceId,
              profile: 'http://iiif.io/api/auth/1/token',
            },
          ],
        }],
      };

      const window = {};
      const canvases = [
        Utils.parseManifest(serviceFixture).getSequences()[0].getCanvases()[0],
      ];

      const iiifInfoId = 'https://api.digitale-sammlungen.de/iiif/image/v2/bsb00122140_00001';
      const infoResponse = {
        id: iiifInfoId,
        json: {
          ...authStanza,
        },
      };

      return expectSaga(refetchInfoResponses, { serviceId })
        .provide([
          [select(getAccessTokens), { [serviceId]: tokenService }],
          [select(getWindows), { window }],
          [select(getVisibleCanvases, { windowId: 'window' }), canvases],
          [select(selectInfoResponses), { [iiifInfoId]: infoResponse }],
          [call(fetchInfoResponse, { infoId: iiifInfoId }), {}],
        ])
        .call(fetchInfoResponse, { infoId: iiifInfoId })
        .run();
    });
  });
});
