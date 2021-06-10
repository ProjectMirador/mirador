"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchesReducer = void 0;

var _omit = _interopRequireDefault(require("lodash/omit"));

var _flatten = _interopRequireDefault(require("lodash/flatten"));

var _actionTypes = _interopRequireDefault(require("../actions/action-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * searchReducer
 */
var searchesReducer = function searchesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var searchStruct = (state[action.windowId] || {})[action.companionWindowId] || {};

  switch (action.type) {
    case _actionTypes["default"].REQUEST_SEARCH:
      if (searchStruct.query !== action.query) {
        // new query
        return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, _defineProperty({}, action.companionWindowId, _objectSpread(_objectSpread({}, searchStruct), {}, {
          data: _defineProperty({}, action.searchId, {
            isFetching: true
          }),
          query: action.query,
          selectedContentSearchAnnotation: []
        })))));
      } // paginating through a query


      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, _defineProperty({}, action.companionWindowId, _objectSpread(_objectSpread({}, searchStruct), {}, {
        data: _objectSpread(_objectSpread({}, searchStruct.data), {}, _defineProperty({}, action.searchId, {
          isFetching: true
        }))
      })))));

    case _actionTypes["default"].RECEIVE_SEARCH:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, _defineProperty({}, action.companionWindowId, _objectSpread(_objectSpread({}, searchStruct), {}, {
        data: _objectSpread(_objectSpread({}, searchStruct.data), {}, _defineProperty({}, action.searchId, {
          isFetching: false,
          json: action.searchJson
        }))
      })))));

    case _actionTypes["default"].RECEIVE_SEARCH_FAILURE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, _defineProperty({}, action.companionWindowId, _objectSpread(_objectSpread({}, searchStruct), {}, {
        data: _objectSpread(_objectSpread({}, searchStruct.data), {}, _defineProperty({}, action.searchId, {
          error: action.error,
          isFetching: false
        }))
      })))));

    case _actionTypes["default"].REMOVE_SEARCH:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, Object.keys(state[action.windowId]).reduce(function (object, key) {
        if (key !== action.companionWindowId) {
          object[key] = state[action.windowId][key]; // eslint-disable-line no-param-reassign
        }

        return object;
      }, {})));

    case _actionTypes["default"].SET_CONTENT_SEARCH_CURRENT_ANNOTATIONS:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, _defineProperty({}, action.companionWindowId, _objectSpread(_objectSpread({}, searchStruct), {}, {
        selectedContentSearchAnnotationIds: action.annotationIds
      })))));

    case _actionTypes["default"].SELECT_ANNOTATION:
      if (!state[action.windowId]) return state;
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, Object.keys(state[action.windowId]).reduce(function (object, key) {
        var search = state[action.windowId][key];
        var searchHasAnnotation = search.data && Object.values(search.data).filter(function (resp) {
          return resp.json && resp.json.resources;
        }).some(function (resp) {
          return (0, _flatten["default"])([resp.json.resources]).some(function (r) {
            return r['@id'] === action.annotationId;
          });
        });

        if (searchHasAnnotation) {
          object[key] = _objectSpread(_objectSpread({}, search), {}, {
            selectedContentSearchAnnotationIds: [action.annotationId]
          });
        } else {
          object[key] = search; // eslint-disable-line no-param-reassign
        }

        return object;
      }, {})));

    case _actionTypes["default"].IMPORT_MIRADOR_STATE:
      return {};

    case _actionTypes["default"].REMOVE_WINDOW:
      return (0, _omit["default"])(state, action.windowId);

    case _actionTypes["default"].REMOVE_COMPANION_WINDOW:
      if (!state[action.windowId]) return state;
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread({}, (0, _omit["default"])(state[action.windowId], action.id))));

    default:
      return state;
  }
};

exports.searchesReducer = searchesReducer;