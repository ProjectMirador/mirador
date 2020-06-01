import { removeIn } from 'immutable';

import ActionTypes from '../actions/action-types';
import { selectNextAuthService } from '../selectors/canvases';

/**
 * authReducer
 */
export const authReducer = (state = {}, action) => {
  let service;

  switch (action.type) {
    case ActionTypes.RECEIVE_DEGRADED_INFO_RESPONSE:
      service = selectNextAuthService(
        { auth: state }, action.infoJson, { external: true, kiosk: true },
      );

      if (!service || state[service.id]) return state;

      return {
        ...state,
        [service.id]: {
          id: service.id,
          infoId: [].concat(
            (state[service.id] && state[service.id].infoId) || [],
            action.infoId,
          ),
          isFetching: true,
          profile: service.getProfile(),
        },
      };
    case ActionTypes.ADD_AUTHENTICATION_REQUEST:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          infoId: [].concat(
            (state[action.id] && state[action.id].infoId) || [],
            action.infoId,
          ),
          isFetching: true,
          profile: action.profile,
        },
      };
    case ActionTypes.RESOLVE_AUTHENTICATION_REQUEST:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          isFetching: false,
          ok: action.ok,
        },
      };
    case ActionTypes.RESET_AUTHENTICATION_STATE:
      return removeIn(state, [action.id]);
    default: return state;
  }
};
