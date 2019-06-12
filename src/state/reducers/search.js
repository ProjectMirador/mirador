import ActionTypes from '../actions/action-types';

/**
 * searchReducer
 */
export const searchesReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_SEARCH:
      return {
        ...state,
        [action.targetId]: {
          ...state[action.targetId],
          [action.companionWindowId]: {
            isFetching: true,
          },
        },
      };
    case ActionTypes.RECEIVE_SEARCH:
      return {
        ...state,
        [action.targetId]: {
          ...state[action.targetId],
          [action.companionWindowId]: {
            isFetching: false,
            json: action.searchJson,
          },
        },
      };
    case ActionTypes.RECEIVE_SEARCH_FAILURE:
      return {
        ...state,
        [action.targetId]: {
          ...state[action.targetId],
          [action.companionWindowId]: {
            error: action.error,
            isFetching: false,
          },
        },
      };
    case ActionTypes.IMPORT_MIRADOR_STATE:
      return {};
    default: return state;
  }
};
