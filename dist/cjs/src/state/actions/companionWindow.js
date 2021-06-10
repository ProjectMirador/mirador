"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCompanionWindow = addCompanionWindow;
exports.addOrUpdateCompanionWindow = addOrUpdateCompanionWindow;
exports.updateCompanionWindow = updateCompanionWindow;
exports.removeCompanionWindow = removeCompanionWindow;
exports.toggleNode = toggleNode;

var _uuid = require("uuid");

var _actionTypes = _interopRequireDefault(require("./action-types"));

var _selectors = require("../selectors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultProps = {
  content: null,
  position: null
};
/** */

function addCompanionWindow(windowId, payload) {
  var defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultProps;
  var id = "cw-".concat((0, _uuid.v4)());
  return {
    id: id,
    payload: _objectSpread(_objectSpread(_objectSpread({}, defaults), payload), {}, {
      id: id,
      windowId: windowId
    }),
    type: _actionTypes["default"].ADD_COMPANION_WINDOW,
    windowId: windowId
  };
}
/** */


function addOrUpdateCompanionWindow(windowId, payload) {
  var defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultProps;
  return function (dispatch, getState) {
    var state = getState();
    var position = payload.position;
    var updatableWindowId = position === 'left' && (0, _selectors.getCompanionWindowIdsForPosition)(state, {
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


function updateCompanionWindow(windowId, id, payload) {
  return {
    id: id,
    payload: payload,
    type: _actionTypes["default"].UPDATE_COMPANION_WINDOW,
    windowId: windowId
  };
}
/** */


function removeCompanionWindow(windowId, id) {
  return {
    id: id,
    type: _actionTypes["default"].REMOVE_COMPANION_WINDOW,
    windowId: windowId
  };
}
/** */


function toggleNode(windowId, id, nodeId) {
  return function (dispatch, getState) {
    var state = getState();
    var collapsedNodeIds = (0, _selectors.getManuallyExpandedNodeIds)(state, {
      companionWindowId: id
    }, false);
    var expandedNodeIds = (0, _selectors.getManuallyExpandedNodeIds)(state, {
      companionWindowId: id
    }, true);
    var visibleNodeIds = (0, _selectors.getVisibleNodeIds)(state, {
      id: id,
      windowId: windowId
    });
    var expand = collapsedNodeIds.indexOf(nodeId) !== -1 || expandedNodeIds.indexOf(nodeId) === -1 && visibleNodeIds.indexOf(nodeId) === -1;
    return dispatch({
      id: id,
      payload: _defineProperty({}, nodeId, {
        expanded: expand
      }),
      type: _actionTypes["default"].TOGGLE_TOC_NODE,
      windowId: windowId
    });
  };
}