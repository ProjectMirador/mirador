import { accessTokensReducer } from '../../../src/state/reducers/accessTokens';
import ActionTypes from '../../../src/state/actions/action-types';

describe('access tokens response reducer', () => {
  describe('should handle RECEIVE_INFO_RESPONSE', () => {
    it('does nothing if the response is not degraded', () => {
      expect(accessTokensReducer({}, {
        infoId: 'http://example.com',
        infoJson: {
          '@id': 'http://example.com',
        },
        type: ActionTypes.RECEIVE_INFO_RESPONSE,
      })).toEqual({});
    });
    it('does nothing for a kiosk service', () => {
      expect(accessTokensReducer({}, {
        infoId: 'http://example.com',
        infoJson: {
          '@id': 'http://example.com',
          service: {
            profile: 'http://iiif.io/api/auth/1/kiosk',
          },
        },
        type: ActionTypes.RECEIVE_INFO_RESPONSE,
      })).toEqual({});
    });
    it('does nothing if a external request for that token service is in flight', () => {
      expect(accessTokensReducer(
        {
          token: {
            isFetching: true,
          },
        },
        {
          infoId: 'http://example.com',
          infoJson: {
            '@id': 'http://example.com',
            service: {
              '@id': 'auth',
              profile: 'http://iiif.io/api/auth/1/external',
              service: {
                '@id': 'token',
                profile: 'http://iiif.io/api/auth/1/token',
              },
            },
          },
          type: ActionTypes.RECEIVE_INFO_RESPONSE,
        },
      )).toEqual({ token: { isFetching: true } });
    });
    it('adds an entry for an external auth token service', () => {
      expect(accessTokensReducer(
        {},
        {
          infoId: 'http://example.com',
          infoJson: {
            '@id': 'http://example.com',
            service: {
              '@id': 'auth',
              profile: 'http://iiif.io/api/auth/1/external',
              service: {
                '@id': 'token',
                profile: 'http://iiif.io/api/auth/1/token',
              },
            },
          },
          ok: false,
          type: ActionTypes.RECEIVE_INFO_RESPONSE,
        },
      )).toEqual({
        token: {
          authId: 'auth',
          id: 'token',
          infoIds: ['http://example.com'],
          isFetching: true,
        },
      });
    });
  });
  it('should handle REQUEST_ACCESS_TOKEN', () => {
    expect(accessTokensReducer({}, {
      authId: 'auth123',
      infoIds: [1, 2, 3],
      serviceId: 'abc123',
      type: ActionTypes.REQUEST_ACCESS_TOKEN,
    })).toEqual({
      abc123: {
        authId: 'auth123',
        id: 'abc123',
        infoIds: [1, 2, 3],
        isFetching: true,
      },
    });
  });
  it('should handle RECEIVE_INFO_RESPONSE', () => {
    expect(accessTokensReducer(
      {
        abc123: {
          id: 'abc123',
          isFetching: true,
        },
      },
      {
        json: { data: true },
        serviceId: 'abc123',
        type: ActionTypes.RECEIVE_ACCESS_TOKEN,
      },
    )).toMatchObject({
      abc123: {
        id: 'abc123',
        infoIds: [],
        isFetching: false,
        json: { data: true },
      },
    });
  });
  it('should handle RECEIVE_INFO_RESPONSE_FAILURE', () => {
    expect(accessTokensReducer(
      {
        abc123: {
          id: 'abc123',
          isFetching: true,
        },
      },
      {
        error: "This institution didn't enable CORS.",
        serviceId: 'abc123',
        type: ActionTypes.RECEIVE_ACCESS_TOKEN_FAILURE,
      },
    )).toMatchObject({
      abc123: {
        error: "This institution didn't enable CORS.",
        id: 'abc123',
        isFetching: false,
      },
    });
  });
});
