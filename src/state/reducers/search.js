import {
  removeIn,
} from 'immutable';
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
    case ActionTypes.REMOVE_WINDOW:
      return removeIn(state, [action.windowId]);
    case ActionTypes.REMOVE_COMPANION_WINDOW:
      if (!state[action.windowId]) return state;

      return {
        ...state,
        [action.windowId]: {
          ...removeIn(state[action.windowId], [action.id]),
        },
      };
    default: return state;
  }
};
