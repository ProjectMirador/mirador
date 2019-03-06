import ActionTypes from '../actions/action-types';

/**
 * workspaceReducer
 */
export const workspaceReducer = (
  state = { // we'll need to abstract this more, methinks.
    viewport: {
      x: -2500,
      y: -2500,
      width: 800,
      height: 600,
    },
    exposeModeOn: false,
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
      return {
        ...state,
        viewport: {
          ...state.viewport,
          x: action.payload.x,
          y: action.payload.y,
        },
      };
    case ActionTypes.SET_WORKSPACE_VIEWPORT_DIMENSIONS:
      return {
        ...state,
        viewport: {
          ...state.viewport,
          width: action.payload.width,
          height: action.payload.height,
        },
      };
    case ActionTypes.TOGGLE_WORKSPACE_EXPOSE_MODE:
      return { ...state, exposeModeOn: !state.exposeModeOn };
    default:
      return state;
  }
};
