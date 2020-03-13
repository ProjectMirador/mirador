import { authReducer } from '../../../src/state/reducers/auth';
import ActionTypes from '../../../src/state/actions/action-types';

describe('auth response reducer', () => {
  describe('should handle RECEIVE_INFO_RESPONSE', () => {
    it('does nothing if the response is not degraded', () => {
      expect(authReducer({}, {
        infoId: 'http://example.com',
        infoJson: {
          '@id': 'http://example.com',
        },
        type: ActionTypes.RECEIVE_INFO_RESPONSE,
      })).toEqual({});
    });
    it('does nothing for a login service', () => {
      expect(authReducer({}, {
        infoId: 'http://example.com',
        infoJson: {
          '@id': 'http://example.com',
          service: {
            profile: 'http://iiif.io/api/auth/1/login',
          },
        },
        type: ActionTypes.RECEIVE_INFO_RESPONSE,
      })).toEqual({});
    });
    it('does nothing if a kiosk/external request for that service is in flight', () => {
      expect(authReducer(
        {
          auth: {
            isFetching: true,
          },
        },
        {
          infoId: 'http://example.com',
          infoJson: {
            '@id': 'http://example.com',
            service: {
              '@id': 'auth',
              profile: 'http://iiif.io/api/auth/1/kiosk',
            },
          },
          type: ActionTypes.RECEIVE_INFO_RESPONSE,
        },
      )).toEqual({ auth: { isFetching: true } });
    });
    it('adds an entry for a kiosk/external service', () => {
      expect(authReducer(
        {},
        {
          infoId: 'http://example.com',
          infoJson: {
            '@id': 'http://example.com',
            service: {
              '@id': 'auth',
              profile: 'http://iiif.io/api/auth/1/kiosk',
            },
          },
          ok: false,
          type: ActionTypes.RECEIVE_INFO_RESPONSE,
        },
      )).toEqual({
        auth: {
          id: 'auth',
          infoId: ['http://example.com'],
          isFetching: true,
          profile: 'http://iiif.io/api/auth/1/kiosk',
        },
      });
    });
  });
  it('should handle ADD_AUTHENTICATION_REQUEST', () => {
    expect(authReducer({}, {
      id: 'abc123',
      infoId: 1,
      type: ActionTypes.ADD_AUTHENTICATION_REQUEST,
    })).toEqual({
      abc123: {
        id: 'abc123',
        infoId: [1],
        isFetching: true,
      },
    });
  });
  it('should handle RESOLVE_AUTHENTICATION_REQUEST', () => {
    expect(authReducer(
      {
        abc123: {
          id: 'abc123',
          isFetching: true,
        },
      },
      {
        id: 'abc123',
        ok: true,
        type: ActionTypes.RESOLVE_AUTHENTICATION_REQUEST,
      },
    )).toMatchObject({
      abc123: {
        id: 'abc123',
        isFetching: false,
        ok: true,
      },
    });
  });
});
