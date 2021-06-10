"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _settings = _interopRequireDefault(require("./settings"));

var _flatten = _interopRequireDefault(require("lodash/flatten"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * export ns - sets up css namespacing for everything to be `mirador-`
 */
var ns = function ns(classNames) {
  return (0, _flatten["default"])([classNames]).map(function (className) {
    return [_settings["default"].createGenerateClassNameOptions.productionPrefix, className].join('-');
  }).join(' ');
};

var _default = ns;
exports["default"] = _default;