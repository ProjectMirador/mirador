function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import ActionTypes from '../actions/action-types';
/**
 * annotationReducer
 */

export var annotationsReducer = function annotationsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ActionTypes.REQUEST_ANNOTATION:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.targetId, _objectSpread(_objectSpread({}, state[action.targetId]), {}, _defineProperty({}, action.annotationId, {
        id: action.annotationId,
        isFetching: true
      }))));

    case ActionTypes.RECEIVE_ANNOTATION:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.targetId, _objectSpread(_objectSpread({}, state[action.targetId]), {}, _defineProperty({}, action.annotationId, {
        id: action.annotationId,
        isFetching: false,
        json: action.annotationJson
      }))));

    case ActionTypes.RECEIVE_ANNOTATION_FAILURE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.targetId, _objectSpread(_objectSpread({}, state[action.targetId]), {}, _defineProperty({}, action.annotationId, {
        error: action.error,
        id: action.annotationId,
        isFetching: false
      }))));

    case ActionTypes.IMPORT_MIRADOR_STATE:
      return {};

    default:
      return state;
  }
};