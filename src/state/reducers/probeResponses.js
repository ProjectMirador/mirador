import ActionTypes from '../actions/action-types';

/**
 * probeResponsesReducer
 */
export const probeResponsesReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_PROBE_RESPONSE:
      return {
        ...state,
        [action.probeId]: {
          id: action.probeId,
          isFetching: true,
        },
      };
    case ActionTypes.RECEIVE_PROBE_RESPONSE:
      return {
        ...state,
        [action.probeId]: {
          degraded: false,
          id: action.probeId,
          isFetching: false,
          json: action.probeJson,
          tokenServiceId: action.tokenServiceId,
        },
      };
    case ActionTypes.RECEIVE_DEGRADED_PROBE_RESPONSE:
      return {
        ...state,
        [action.probeId]: {
          degraded: true,
          id: action.probeId,
          isFetching: false,
          json: action.probeJson,
          tokenServiceId: action.tokenServiceId,
        },
      };
    case ActionTypes.RECEIVE_PROBE_RESPONSE_FAILURE:
      return {
        ...state,
        [action.probeId]: {
          error: action.error,
          id: action.probeId,
          isFetching: false,
          tokenServiceId: action.tokenServiceId,
        },
      };
    case ActionTypes.REMOVE_PROBE_RESPONSE:
      return Object.keys(state).reduce((object, key) => {
        if (key !== action.probeId) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }
        return object;
      }, {});
    case ActionTypes.IMPORT_MIRADOR_STATE:
      return {};
    default: return state;
  }
};
