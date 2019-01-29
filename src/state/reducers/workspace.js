import ActionTypes from '../actions/action-types';

/**
 * workspaceReducer
 */
export const workspaceReducer = (
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
    case ActionTypes.SET_WORKSPACE_FULLSCREEN:
      return { ...state, isFullscreenEnabled: action.isFullscreenEnabled };
    case ActionTypes.TOGGLE_ZOOM_CONTROLS:
      return { ...state, showZoomControls: action.showZoomControls };
    case ActionTypes.UPDATE_WORKSPACE_MOSAIC_LAYOUT:
      return { ...state, layout: action.layout };
    case ActionTypes.SET_WORKSPACE_ADD_VISIBILITY:
      return { ...state, isWorkspaceAddVisible: action.isWorkspaceAddVisible };
    case ActionTypes.SET_WORKSPACE_VIEWPORT_POSITION:
      return { ...state, viewportPosition: action.payload.position };
    case ActionTypes.TOGGLE_WORKSPACE_EXPOSE_MODE:
      return { ...state, exposeModeOn: !state.exposedModeOn };
    default:
      return state;
  }
};
