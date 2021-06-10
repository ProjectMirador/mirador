function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import omit from 'lodash/omit';
import set from 'lodash/fp/set';
import update from 'lodash/fp/update';
import ActionTypes from '../actions/action-types';
/** */

export function companionWindowsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ActionTypes.ADD_COMPANION_WINDOW:
      return set([action.id], action.payload, state);

    case ActionTypes.ADD_WINDOW:
      return _objectSpread(_objectSpread({}, state), (action.companionWindows || []).reduce(function (newState, cw) {
        newState[cw.id] = _objectSpread(_objectSpread(_objectSpread({}, state[cw.id]), cw), {}, {
          windowId: action.id
        });
        return newState;
      }, {}));

    case ActionTypes.REMOVE_WINDOW:
      return Object.keys(state).reduce(function (object, key) {
        if (state[key].windowId !== action.windowId) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }

        return object;
      }, {});

    case ActionTypes.UPDATE_COMPANION_WINDOW:
      return update([action.id], function (orig) {
        return _objectSpread(_objectSpread({}, orig || {}), action.payload);
      }, state);

    case ActionTypes.REMOVE_COMPANION_WINDOW:
      return omit(state, action.id);

    case ActionTypes.IMPORT_MIRADOR_STATE:
      return action.state.companionWindows || [];

    case ActionTypes.TOGGLE_TOC_NODE:
      return update([action.id, 'tocNodes'], function (orig) {
        return _objectSpread(_objectSpread({}, orig || {}), action.payload);
      }, state);

    default:
      return state;
  }
}