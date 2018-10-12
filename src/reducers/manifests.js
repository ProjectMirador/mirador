import manifesto from 'manifesto.js';
import ActionTypes from '../action-types';

/**
 * manifestsReducer
 */
const manifestsReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_MANIFEST:
      return Object.assign({}, state, {
        [action.manifestId]: {
          isFetching: true,
        },
      });
    case ActionTypes.RECEIVE_MANIFEST:
      return Object.assign({}, state, {
        [action.manifestId]: {
          manifestation: manifesto.create(action.manifestJson),
          isFetching: false,
        },
      });
    case ActionTypes.RECEIVE_MANIFEST_FAILURE:
      return Object.assign({}, state, {
        [action.manifestId]: {
          error: action.error,
          isFetching: false,
        },
      });
    default: return state;
  }
};

export default manifestsReducer;
