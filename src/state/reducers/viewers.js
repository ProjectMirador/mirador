import { removeIn, setIn } from 'immutable';
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
          ...action.payload,
        },
      };
    case ActionTypes.REMOVE_WINDOW:
      return removeIn(state, [action.windowId]);
    case ActionTypes.SET_WINDOW_VIEW_TYPE:
      return setIn(state, [action.windowId], null);
    case ActionTypes.SET_CANVAS:
      if (!action.preserveViewport) {
        return setIn(state, [action.windowId], null);
      }
      return state;
    case ActionTypes.IMPORT_MIRADOR_STATE:
      return action.state.viewers || {};
    default:
      return state;
  }
};
