import set from 'lodash/fp/set';
import omit from 'lodash/omit';
import ActionTypes from '../actions/action-types';

/**
 * viewersReducer
 */
export const viewersReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_VIEWPORT:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          ...action.payload,
        },
      };
    case ActionTypes.REMOVE_WINDOW:
      return omit(state, action.windowId);
    case ActionTypes.SET_WINDOW_VIEW_TYPE:
    case ActionTypes.SHIFT_BOOK_VIEW:
      return set([action.windowId], null, state);
    case ActionTypes.SET_CANVAS:
      if (!action.preserveViewport) {
        return set([action.windowId], null, state);
      }
      return state;
    case ActionTypes.IMPORT_MIRADOR_STATE:
      return action.state.viewers || {};
    default:
      return state;
  }
};
