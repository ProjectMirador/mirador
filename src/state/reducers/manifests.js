import manifesto from 'manifesto.js';
import ActionTypes from '../actions/action-types';

/**
 * manifestsReducer
 */
export const manifestsReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_MANIFEST:
      return {
        ...state,
        [action.manifestId]: {
          ...state[action.manifestId],
          ...action.properties,
          id: action.manifestId,
        },
      };
    case ActionTypes.RECEIVE_MANIFEST:
      return {
        ...state,
        [action.manifestId]: {
          ...state[action.manifestId],
          id: action.manifestId,
          manifestation: manifesto.create(action.manifestJson),
          isFetching: false,
        },
      };
    case ActionTypes.RECEIVE_MANIFEST_FAILURE:
      return {
        ...state,
        [action.manifestId]: {
          ...state[action.manifestId],
          id: action.manifestId,
          error: action.error,
          isFetching: false,
        },
      };
    case ActionTypes.REMOVE_MANIFEST:
      return Object.keys(state).reduce((object, key) => {
        if (key !== action.manifestId) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }
        return object;
      }, {});
    default: return state;
  }
};
