function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import update from 'lodash/fp/update';
import omit from 'lodash/omit';
import ActionTypes from '../actions/action-types';
/**
 * windowsReducer
 */

export var windowsReducer = function windowsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ActionTypes.ADD_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.window.id, action.window));

    case ActionTypes.MAXIMIZE_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        maximized: true
      })));

    case ActionTypes.MINIMIZE_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        maximized: false
      })));

    case ActionTypes.UPDATE_WINDOW:
      return update([action.id], function (orig) {
        return _objectSpread(_objectSpread({}, orig || {}), action.payload);
      }, state);

    case ActionTypes.REMOVE_WINDOW:
      return omit(state, [action.windowId]);

    case ActionTypes.TOGGLE_WINDOW_SIDE_BAR:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        sideBarOpen: !state[action.windowId].sideBarOpen
      })));

    case ActionTypes.SET_WINDOW_VIEW_TYPE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        view: action.viewType
      })));

    case ActionTypes.UPDATE_WINDOW_POSITION:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.payload.windowId, _objectSpread(_objectSpread({}, state[action.payload.windowId]), {}, {
        x: action.payload.position.x,
        y: action.payload.position.y
      })));

    case ActionTypes.SET_WINDOW_SIZE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.payload.windowId, _objectSpread(_objectSpread({}, state[action.payload.windowId]), {}, {
        height: action.payload.size.height,
        width: action.payload.size.width,
        x: action.payload.size.x,
        y: action.payload.size.y
      })));

    case ActionTypes.SET_CANVAS:
      if (!state[action.windowId]) return state;
      return update([action.windowId], function (orig) {
        return _objectSpread(_objectSpread({}, orig || {}), {}, {
          canvasId: action.canvasId,
          visibleCanvases: action.visibleCanvases || []
        });
      }, state);

    case ActionTypes.ADD_COMPANION_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        companionWindowIds: state[action.windowId].companionWindowIds.concat([action.id])
      }, action.payload.position === 'left' ? {
        companionAreaOpen: true,
        sideBarPanel: action.payload.content
      } : {})));

    case ActionTypes.UPDATE_COMPANION_WINDOW:
      if (action.payload.position !== 'left') return state;
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        companionAreaOpen: true
      })));

    case ActionTypes.REMOVE_COMPANION_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        companionWindowIds: state[action.windowId].companionWindowIds.filter(function (id) {
          return id !== action.id;
        })
      })));

    case ActionTypes.SELECT_ANNOTATION:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        selectedAnnotationId: action.annotationId
      })));

    case ActionTypes.DESELECT_ANNOTATION:
      {
        return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
          selectedAnnotationId: undefined
        })));
      }

    case ActionTypes.HOVER_ANNOTATION:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        hoveredAnnotationIds: action.annotationIds
      })));

    case ActionTypes.TOGGLE_ANNOTATION_DISPLAY:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        highlightAllAnnotations: !state[action.windowId].highlightAllAnnotations
      })));

    case ActionTypes.IMPORT_MIRADOR_STATE:
      return action.state.windows || [];

    case ActionTypes.REQUEST_SEARCH:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        suggestedSearches: undefined
      })));

    case ActionTypes.SHOW_COLLECTION_DIALOG:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        collectionDialogOn: true,
        collectionManifestId: action.manifestId,
        collectionPath: action.collectionPath
      })));

    case ActionTypes.HIDE_COLLECTION_DIALOG:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        collectionDialogOn: false
      })));

    default:
      return state;
  }
};