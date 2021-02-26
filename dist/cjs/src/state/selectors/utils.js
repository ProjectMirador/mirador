"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.miradorSlice = miradorSlice;

var _settings = _interopRequireDefault(require("../../config/settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/** */
function miradorSlice(state) {
  if (_settings["default"].state.slice) return state[_settings["default"].state.slice];
  return state;
}