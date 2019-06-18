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
        [action.windowId]: {
          ...state[action.windowId],
          [action.companionWindowId]: {
            ...(state[action.windowId] || {})[action.companionWindowId],
            data: {
              ...((state[action.windowId] || {})[action.companionWindowId] || {}).data,
              [action.searchId]: {
                isFetching: true,
              },
            },
            query: action.query,
          },
        },
      };
    case ActionTypes.RECEIVE_SEARCH:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          [action.companionWindowId]: {
            ...(state[action.windowId] || {})[action.companionWindowId],
            data: {
              ...((state[action.windowId] || {})[action.companionWindowId] || {}).data,
              [action.searchId]: {
                isFetching: false,
                json: action.searchJson,
              },
            },
          },
        },
      };
    case ActionTypes.RECEIVE_SEARCH_FAILURE:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          [action.companionWindowId]: {
            ...(state[action.windowId] || {})[action.companionWindowId],
            data: {
              ...((state[action.windowId] || {})[action.companionWindowId] || {}).data,
              [action.searchId]: {
                error: action.error,
                isFetching: false,
              },
            },
          },
        },
      };
    case ActionTypes.REMOVE_SEARCH:
      return {
        ...state,
        [action.windowId]: Object.keys(state[action.windowId]).reduce((object, key) => {
          if (key !== action.companionWindowId) {
            object[key] = state[action.windowId][key]; // eslint-disable-line no-param-reassign
          }
          return object;
        }, {}),
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
