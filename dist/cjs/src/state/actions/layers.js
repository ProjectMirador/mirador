"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLayers = updateLayers;

var _actionTypes = _interopRequireDefault(require("./action-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * updateLayers - action creator
 * @param {string} id
 */
function updateLayers(windowId, canvasId, payload) {
  return {
    canvasId: canvasId,
    payload: payload,
    type: _actionTypes["default"].UPDATE_LAYERS,
    windowId: windowId
  };
}