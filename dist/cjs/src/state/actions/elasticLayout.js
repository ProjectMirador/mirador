"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateElasticWindowLayout = updateElasticWindowLayout;

var _actionTypes = _interopRequireDefault(require("./action-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/** */
function updateElasticWindowLayout(windowId, payload) {
  return {
    payload: payload,
    type: _actionTypes["default"].UPDATE_ELASTIC_WINDOW_LAYOUT,
    windowId: windowId
  };
}