function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import omit from 'lodash/omit';
import ActionTypes from '../actions/action-types';
/**
 * authReducer
 */

export var authReducer = function authReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ActionTypes.ADD_AUTHENTICATION_REQUEST:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.id, {
        id: action.id,
        isFetching: true,
        profile: action.profile,
        windowId: action.windowId
      }));

    case ActionTypes.RESOLVE_AUTHENTICATION_REQUEST:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.id, _objectSpread(_objectSpread({}, state[action.id]), {}, {
        isFetching: false,
        ok: action.ok
      })));

    case ActionTypes.RECEIVE_ACCESS_TOKEN:
      if (!action.authId) return state;
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.authId, _objectSpread(_objectSpread({}, state[action.authId]), {}, {
        ok: true
      })));

    case ActionTypes.RESET_AUTHENTICATION_STATE:
      return omit(state, action.id);

    default:
      return state;
  }
};