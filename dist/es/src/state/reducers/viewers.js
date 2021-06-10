function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import set from 'lodash/fp/set';
import omit from 'lodash/omit';
import ActionTypes from '../actions/action-types';
/**
 * viewersReducer
 */

export var viewersReducer = function viewersReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ActionTypes.UPDATE_VIEWPORT:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), action.payload)));

    case ActionTypes.REMOVE_WINDOW:
      return omit(state, action.windowId);

    case ActionTypes.SET_WINDOW_VIEW_TYPE:
      return set([action.windowId], null, state);

    case ActionTypes.SET_CANVAS:
      if (!action.preserveViewport) {
        return set([action.windowId], null, state);
      }

      return state;

    case ActionTypes.IMPORT_MIRADOR_STATE:
      return action.state.viewers || {};

    default:
      return state;
  }
};