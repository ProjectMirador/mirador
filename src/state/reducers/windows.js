import {
  remove, removeIn, updateIn, merge,
} from 'immutable';
import ActionTypes from '../actions/action-types';

/**
 * windowsReducer
 */
export const windowsReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_WINDOW:
      return { ...state, [action.window.id]: action.window };

    case ActionTypes.MAXIMIZE_WINDOW:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          maximized: true,
        },
      };
    case ActionTypes.MINIMIZE_WINDOW:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          maximized: false,
        },
      };

    case ActionTypes.UPDATE_WINDOW:
      return updateIn(state, [action.id], orig => merge(orig, action.payload));

    case ActionTypes.REMOVE_WINDOW:
      return removeIn(state, [action.windowId]);
    case ActionTypes.TOGGLE_WINDOW_SIDE_BAR:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          sideBarOpen: !state[action.windowId].sideBarOpen,
        },
      };
    case ActionTypes.SET_WINDOW_VIEW_TYPE:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          view: action.viewType,
        },
      };
    case ActionTypes.SET_WINDOW_SIDE_BAR_PANEL:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          sideBarPanel: (
            action.panelType
          ),
        },
      };
    case ActionTypes.UPDATE_WINDOW_POSITION:
      return {
        ...state,
        [action.payload.windowId]: {
          ...state[action.payload.windowId],
          x: action.payload.position.x,
          y: action.payload.position.y,
        },
      };
    case ActionTypes.SET_WINDOW_SIZE:
      return {
        ...state,
        [action.payload.windowId]: {
          ...state[action.payload.windowId],
          height: action.payload.size.height,
          width: action.payload.size.width,
          x: action.payload.size.x,
          y: action.payload.size.y,
        },
      };
    case ActionTypes.SET_CANVAS:
      if (!state[action.windowId]) return state;

      return updateIn(state, [action.windowId], orig => merge(orig, {
        canvasId: action.canvasId,
        visibleCanvases: action.visibleCanvases || [],
      }));
    case ActionTypes.ADD_COMPANION_WINDOW:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          companionWindowIds: state[action.windowId].companionWindowIds.concat([action.id]),
          ...(action.payload.position === 'left'
            ? { companionAreaOpen: true, sideBarPanel: action.payload.content }
            : {}),
        },
      };
    case ActionTypes.UPDATE_COMPANION_WINDOW:
      if (action.payload.position !== 'left') return state;

      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          companionAreaOpen: true,
        },
      };
    case ActionTypes.REMOVE_COMPANION_WINDOW:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          companionWindowIds: state[action.windowId]
            .companionWindowIds.filter(id => id !== action.id),
        },
      };
    case ActionTypes.SELECT_CONTENT_SEARCH_ANNOTATION:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          canvasId: action.canvasId,
          selectedContentSearchAnnotation: action.annotationId,
        },
      };
    case ActionTypes.SELECT_CONTENT_SEARCH_ANNOTATIONS:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          selectedContentSearchAnnotation: Object.values(action.annotationsBySearch)[0],
        },
      };
    case ActionTypes.SELECT_ANNOTATION:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          selectedAnnotations: {
            ...state[action.windowId].selectedAnnotations,
            [action.targetId]: [
              ...((state[action.windowId].selectedAnnotations || {})[action.targetId] || []),
              action.annotationId,
            ],
          },
        },
      };
    case ActionTypes.DESELECT_ANNOTATION: {
      const selectedAnnotations = updatedSelectedAnnotations(state, action);

      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          selectedAnnotations,
        },
      };
    }
    case ActionTypes.HOVER_ANNOTATION:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          hoveredAnnotationIds: action.annotationIds,
        },
      };
    case ActionTypes.TOGGLE_ANNOTATION_DISPLAY:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          highlightAllAnnotations: !state[action.windowId].highlightAllAnnotations,
        },
      };
    case ActionTypes.IMPORT_MIRADOR_STATE:
      return action.state.windows || [];
    case ActionTypes.REQUEST_SEARCH:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          suggestedSearches: undefined,
        },
      };
    default:
      return state;
  }
};

/**
 * Handle removing IDs from selectedAnnotations
 * where empty targetIds are removed from state as well
 */
function updatedSelectedAnnotations(state, action) {
  const filteredIds = state[action.windowId]
    .selectedAnnotations[action.targetId]
    .filter(id => id !== action.annotationId);

  if (filteredIds.length > 0) {
    return {
      ...state[action.windowId].selectedAnnotations,
      [action.targetId]: filteredIds,
    };
  }

  return remove(state[action.windowId].selectedAnnotations, action.targetId);
}
