import ActionTypes from '../actions/action-types';

/**
 * workspaceReducer
 */
const workspaceReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.FOCUS_WINDOW:
      return { ...state, focusedWindowId: action.windowId };
    case ActionTypes.FULLSCREEN_WORKSPACE:
      return { ...state, fullscreen: action.fullscreen };
    case ActionTypes.UPDATE_WORKSPACE_MOSAIC_LAYOUT:
      return { ...state, layout: action.layout };
    default:
      return state;
  }
};

export { workspaceReducer as default };
