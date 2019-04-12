import uuid from 'uuid/v4';
import ActionTypes from '../actions/action-types';

/**
 * workspaceReducer
 */
export const workspaceReducer = (
  state = { // we'll need to abstract this more, methinks.
    draggingEnabled: true,
    exposeModeOn: false,
    height: 5000,
    id: uuid(),
    viewportPosition: {
      x: 0,
      y: 0,
    },
    width: 5000,
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.FOCUS_WINDOW:
      return {
        ...state,
        focusedWindowId: action.windowId,
        viewportPosition: {
          ...state.viewportPosition,
          ...action.position,
        },
      };
    case ActionTypes.ADD_WINDOW:
      return {
        ...state,
        focusedWindowId: action.window.id,
      };
    case ActionTypes.REMOVE_WINDOW:
      if (Object.keys(action.windows).length > 2) return state;
      return {
        ...state,
        focusedWindowId: Object.keys(action.windows).find(e => e !== action.windowId),
      };
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
        viewportPosition: {
          ...state.viewportPosition,
          ...action.payload.position,
        },
      };
    case ActionTypes.TOGGLE_WORKSPACE_EXPOSE_MODE:
      return { ...state, exposeModeOn: !state.exposeModeOn };
    case ActionTypes.IMPORT_MIRADOR_STATE:
      return action.state.workspace;
    case ActionTypes.TOGGLE_DRAGGING:
      return { ...state, draggingEnabled: !state.draggingEnabled };
    default:
      return state;
  }
};
