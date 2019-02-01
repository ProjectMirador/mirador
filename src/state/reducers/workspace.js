import ActionTypes from '../actions/action-types';

/**
 * workspaceReducer
 */
const workspaceReducer = (
  state = { // we'll need to abstract this more, methinks.
    viewportPosition: {
      x: -2500,
      y: -2500,
    },
    exposedModeOn: false,
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.FOCUS_WINDOW:
      return { ...state, focusedWindowId: action.windowId };
    case ActionTypes.FULLSCREEN_WORKSPACE:
      return { ...state, fullscreen: action.fullscreen };
    case ActionTypes.SET_WORKSPACE_VIEWPORT_POSITION:
      return { ...state, viewportPosition: action.payload.position };
    case ActionTypes.TOGGLE_WORKSPACE_EXPOSE_MODE:
      return { ...state, exposeModeOn: !state.exposedModeOn };
    default:
      return state;
  }
};

export { workspaceReducer as default };
