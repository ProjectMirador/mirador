function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { v4 as uuid } from 'uuid';
import ActionTypes from './action-types';
import { getCompanionWindowIdsForPosition, getManuallyExpandedNodeIds, getVisibleNodeIds } from '../selectors';
var defaultProps = {
  content: null,
  position: null
};
/** */

export function addCompanionWindow(windowId, payload) {
  var defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultProps;
  var id = "cw-".concat(uuid());
  return {
    id: id,
    payload: _objectSpread(_objectSpread(_objectSpread({}, defaults), payload), {}, {
      id: id,
      windowId: windowId
    }),
    type: ActionTypes.ADD_COMPANION_WINDOW,
    windowId: windowId
  };
}
/** */

export function addOrUpdateCompanionWindow(windowId, payload) {
  var defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultProps;
  return function (dispatch, getState) {
    var state = getState();
    var position = payload.position;
    var updatableWindowId = position === 'left' && getCompanionWindowIdsForPosition(state, {
      position: position,
      windowId: windowId
    })[0];

    if (updatableWindowId) {
      dispatch(updateCompanionWindow(windowId, updatableWindowId, payload));
    } else {
      dispatch(addCompanionWindow(windowId, payload, defaults));
    }
  };
}
/** */

export function updateCompanionWindow(windowId, id, payload) {
  return {
    id: id,
    payload: payload,
    type: ActionTypes.UPDATE_COMPANION_WINDOW,
    windowId: windowId
  };
}
/** */

export function removeCompanionWindow(windowId, id) {
  return {
    id: id,
    type: ActionTypes.REMOVE_COMPANION_WINDOW,
    windowId: windowId
  };
}
/** */

export function toggleNode(windowId, id, nodeId) {
  return function (dispatch, getState) {
    var state = getState();
    var collapsedNodeIds = getManuallyExpandedNodeIds(state, {
      companionWindowId: id
    }, false);
    var expandedNodeIds = getManuallyExpandedNodeIds(state, {
      companionWindowId: id
    }, true);
    var visibleNodeIds = getVisibleNodeIds(state, {
      id: id,
      windowId: windowId
    });
    var expand = collapsedNodeIds.indexOf(nodeId) !== -1 || expandedNodeIds.indexOf(nodeId) === -1 && visibleNodeIds.indexOf(nodeId) === -1;
    return dispatch({
      id: id,
      payload: _defineProperty({}, nodeId, {
        expanded: expand
      }),
      type: ActionTypes.TOGGLE_TOC_NODE,
      windowId: windowId
    });
  };
}