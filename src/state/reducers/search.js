import omit from 'lodash/omit';
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
          ...(state[action.windowId] || {}),
          [action.companionWindowId]: {
            query: action.query,
          },
        },
      };
    case ActionTypes.SELECT_ANNOTATION:
      return {
        ...state,
        [action.windowId]: {
          ...(state[action.windowId] || {}),
          [action.companionWindowId]: {
            ...(state[action.windowId]?.[action.companionWindowId] || {}),
            currentAnnotationId: action.annotationId,
          },
        },
      };
    default:
      return state;
  }
};
