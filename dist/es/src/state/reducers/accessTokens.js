function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import omit from 'lodash/omit';
import ActionTypes from '../actions/action-types';
/** */

export function accessTokensReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ActionTypes.RESOLVE_AUTHENTICATION_REQUEST:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.tokenServiceId, {
        authId: action.id,
        id: action.tokenServiceId,
        isFetching: true
      }));

    case ActionTypes.REQUEST_ACCESS_TOKEN:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.serviceId, {
        authId: action.authId,
        id: action.serviceId,
        isFetching: true
      }));

    case ActionTypes.RECEIVE_ACCESS_TOKEN:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.serviceId, _objectSpread(_objectSpread({}, state[action.serviceId]), {}, {
        isFetching: false,
        json: action.json
      })));

    case ActionTypes.RECEIVE_ACCESS_TOKEN_FAILURE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.serviceId, _objectSpread(_objectSpread({}, state[action.serviceId]), {}, {
        error: action.error,
        isFetching: false
      })));

    case ActionTypes.RESET_AUTHENTICATION_STATE:
      return omit(state, action.tokenServiceId);

    case ActionTypes.RECEIVE_INFO_RESPONSE:
      if (!action.tokenServiceId) return state;
      if (state[action.tokenServiceId].success) return state;
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.tokenServiceId, _objectSpread(_objectSpread({}, state[action.tokenServiceId]), {}, {
        success: true
      })));

    default:
      return state;
  }
}