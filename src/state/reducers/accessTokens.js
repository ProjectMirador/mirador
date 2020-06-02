import { removeIn } from 'immutable';
import { Utils } from 'manifesto.js/dist-esmodule/Utils';
import ActionTypes from '../actions/action-types';

/** */
export function accessTokensReducer(state = {}, action) {
  let authService;
  let tokenService;

  switch (action.type) {
    case ActionTypes.RECEIVE_DEGRADED_INFO_RESPONSE:
      authService = Utils.getService({ ...action.infoJson, options: {} }, 'http://iiif.io/api/auth/1/external');
      if (!authService) return state;

      tokenService = Utils.getService(authService, 'http://iiif.io/api/auth/1/token');
      if (!tokenService || state[tokenService.id]) return state;

      return {
        ...state,
        [tokenService.id]: {
          authId: authService.id,
          id: tokenService.id,
          infoIds: [].concat(
            (state[tokenService.id] && state[tokenService.id].infoIds) || [],
            action.infoId,
          ),
          isFetching: true,
        },
      };
    case ActionTypes.REQUEST_ACCESS_TOKEN:
      return {
        ...state,
        [action.serviceId]: {
          authId: action.authId,
          id: action.serviceId,
          infoIds: action.infoIds,
          isFetching: true,
        },
      };
    case ActionTypes.RECEIVE_ACCESS_TOKEN:
      return {
        ...state,
        [action.serviceId]: {
          ...state[action.serviceId],
          isFetching: false,
          json: action.json,
        },
      };
    case ActionTypes.CLEAR_ACCESS_TOKEN_QUEUE:
      return {
        ...state,
        [action.serviceId]: {
          ...state[action.serviceId],
          infoIds: [],
        },
      };
    case ActionTypes.RECEIVE_ACCESS_TOKEN_FAILURE:
      return {
        ...state,
        [action.serviceId]: {
          ...state[action.serviceId],
          error: action.error,
          isFetching: false,
        },
      };
    case ActionTypes.RESET_AUTHENTICATION_STATE:
      return removeIn(state, [action.tokenServiceId]);
    default:
      return state;
  }
}
