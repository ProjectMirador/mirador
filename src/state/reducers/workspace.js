import ActionTypes from '../actions/action-types';

/**
 * workspaceReducer
 */
const workspaceReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.FOCUS_WINDOW:
      return { ...state, focusedWindowId: action.windowId };
    default:
      return state;
  }
};

export { workspaceReducer as default };
