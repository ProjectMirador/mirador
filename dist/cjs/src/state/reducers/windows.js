"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.windowsReducer = void 0;

var _update = _interopRequireDefault(require("lodash/fp/update"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _actionTypes = _interopRequireDefault(require("../actions/action-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * windowsReducer
 */
var windowsReducer = function windowsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionTypes["default"].ADD_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.window.id, action.window));

    case _actionTypes["default"].MAXIMIZE_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        maximized: true
      })));

    case _actionTypes["default"].MINIMIZE_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        maximized: false
      })));

    case _actionTypes["default"].UPDATE_WINDOW:
      return (0, _update["default"])([action.id], function (orig) {
        return _objectSpread(_objectSpread({}, orig || {}), action.payload);
      }, state);

    case _actionTypes["default"].REMOVE_WINDOW:
      return (0, _omit["default"])(state, [action.windowId]);

    case _actionTypes["default"].TOGGLE_WINDOW_SIDE_BAR:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        sideBarOpen: !state[action.windowId].sideBarOpen
      })));

    case _actionTypes["default"].SET_WINDOW_VIEW_TYPE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        view: action.viewType
      })));

    case _actionTypes["default"].UPDATE_WINDOW_POSITION:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.payload.windowId, _objectSpread(_objectSpread({}, state[action.payload.windowId]), {}, {
        x: action.payload.position.x,
        y: action.payload.position.y
      })));

    case _actionTypes["default"].SET_WINDOW_SIZE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.payload.windowId, _objectSpread(_objectSpread({}, state[action.payload.windowId]), {}, {
        height: action.payload.size.height,
        width: action.payload.size.width,
        x: action.payload.size.x,
        y: action.payload.size.y
      })));

    case _actionTypes["default"].SET_CANVAS:
      if (!state[action.windowId]) return state;
      return (0, _update["default"])([action.windowId], function (orig) {
        return _objectSpread(_objectSpread({}, orig || {}), {}, {
          canvasId: action.canvasId,
          visibleCanvases: action.visibleCanvases || []
        });
      }, state);

    case _actionTypes["default"].ADD_COMPANION_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        companionWindowIds: state[action.windowId].companionWindowIds.concat([action.id])
      }, action.payload.position === 'left' ? {
        companionAreaOpen: true,
        sideBarPanel: action.payload.content
      } : {})));

    case _actionTypes["default"].UPDATE_COMPANION_WINDOW:
      if (action.payload.position !== 'left') return state;
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        companionAreaOpen: true
      })));

    case _actionTypes["default"].REMOVE_COMPANION_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        companionWindowIds: state[action.windowId].companionWindowIds.filter(function (id) {
          return id !== action.id;
        })
      })));

    case _actionTypes["default"].SELECT_ANNOTATION:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        selectedAnnotationId: action.annotationId
      })));

    case _actionTypes["default"].DESELECT_ANNOTATION:
      {
        return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
          selectedAnnotationId: undefined
        })));
      }

    case _actionTypes["default"].HOVER_ANNOTATION:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        hoveredAnnotationIds: action.annotationIds
      })));

    case _actionTypes["default"].TOGGLE_ANNOTATION_DISPLAY:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        highlightAllAnnotations: !state[action.windowId].highlightAllAnnotations
      })));

    case _actionTypes["default"].IMPORT_MIRADOR_STATE:
      return action.state.windows || [];

    case _actionTypes["default"].REQUEST_SEARCH:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        suggestedSearches: undefined
      })));

    case _actionTypes["default"].SHOW_COLLECTION_DIALOG:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        collectionDialogOn: true,
        collectionManifestId: action.manifestId,
        collectionPath: action.collectionPath
      })));

    case _actionTypes["default"].HIDE_COLLECTION_DIALOG:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        collectionDialogOn: false
      })));

    default:
      return state;
  }
};

exports.windowsReducer = windowsReducer;