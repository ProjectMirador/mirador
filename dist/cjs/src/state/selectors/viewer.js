"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentCanvasWorld = void 0;

var _reselect = require("reselect");

var _CanvasWorld = _interopRequireDefault(require("../../lib/CanvasWorld"));

var _canvases = require("./canvases");

var _layers = require("./layers");

var _sequences = require("./sequences");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/** Instantiate a manifesto instance */
var getCurrentCanvasWorld = (0, _reselect.createSelector)(_canvases.getVisibleCanvases, _layers.getLayersForVisibleCanvases, _sequences.getSequenceViewingDirection, function (canvases, layers, viewingDirection) {
  return new _CanvasWorld["default"](canvases, layers, viewingDirection);
});
exports.getCurrentCanvasWorld = getCurrentCanvasWorld;