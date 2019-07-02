import { remove, updateIn, merge } from 'immutable';
import ActionTypes from '../actions/action-types';
import { getManifestStartCanvas } from '../selectors';

/**
 * windowsReducer
 */
export const windowsReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_WINDOW:
      return { ...state, [action.window.id]: action.window };

    case ActionTypes.RECEIVE_MANIFEST:
      return Object.keys(state).reduce((object, key) => {
        if (state[key].manifestId === action.manifestId) {
          object[key] = { // eslint-disable-line no-param-reassign
            ...state[key],
            canvasId: state[key].canvasId
              || getManifestStartCanvas(action.manifestJson, state[key].canvasIndex).id,
            canvasIndex: undefined,
          };
        } else {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }

        return object;
      }, {});
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
      return Object.keys(state).reduce((object, key) => {
        if (key !== action.windowId) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }
        return object;
      }, {});
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
      return updateIn(state, [action.windowId], orig => merge(orig, {
        canvasId: action.canvasId,
        selectedContentSearchAnnotation: action.selectedContentSearchAnnotation,
      }));
    case ActionTypes.ADD_COMPANION_WINDOW:
      if (action.payload.position === 'left') {
        const { companionWindowIds } = state[action.windowId];
        const { companionWindows } = action;
        const newCompanionWindowIds = companionWindowIds
          .filter(id => companionWindows[id].position !== action.payload.position);

        return {
          ...state,
          [action.windowId]: {
            ...state[action.windowId],
            companionAreaOpen: true,
            companionWindowIds: newCompanionWindowIds.concat([action.id]),
            sideBarPanel: action.payload.content,
          },
        };
      }

      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          companionWindowIds: state[action.windowId].companionWindowIds.concat([action.id]),
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
    case ActionTypes.HIGHLIGHT_ANNOTATION:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          highlightedAnnotation: action.annotationId,
        },
      };
    case ActionTypes.TOGGLE_ANNOTATION_DISPLAY:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          displayAllAnnotations: !state[action.windowId].displayAllAnnotations,
        },
      };
    case ActionTypes.IMPORT_MIRADOR_STATE:
      return action.state.windows;
    case ActionTypes.REQUEST_SEARCH:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          suggestedSearches: undefined,
        },
      };
    case ActionTypes.RECEIVE_SEARCH:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          canvasId: action.canvasId || state[action.windowId].canvasId,
          selectedContentSearchAnnotation: (action.annotationId && [action.annotationId])
            || state[action.windowId].selectedContentSearchAnnotation,
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
