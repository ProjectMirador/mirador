"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePlugin = void 0;

var _isString = _interopRequireDefault(require("lodash/isString"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _isFunction = _interopRequireDefault(require("lodash/isFunction"));

var _isObject = _interopRequireDefault(require("lodash/isObject"));

var _isNull = _interopRequireDefault(require("lodash/isNull"));

var _values = _interopRequireDefault(require("lodash/values"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/** */
var validatePlugin = function validatePlugin(plugin) {
  return [checkPlugin, checkName, checkTarget, checkMode, checkMapStateToProps, checkMapDispatchToProps, checkReducers].every(function (check) {
    return check(plugin);
  });
};
/** */


exports.validatePlugin = validatePlugin;

var checkPlugin = function checkPlugin(plugin) {
  return (0, _isObject["default"])(plugin);
};
/** */


var checkName = function checkName(plugin) {
  var name = plugin.name;
  return (0, _isUndefined["default"])(name) || (0, _isString["default"])(name);
};
/** */


var checkTarget = function checkTarget(plugin) {
  var mode = plugin.mode,
      target = plugin.target;
  if ((0, _isUndefined["default"])(mode)) return (0, _isUndefined["default"])(target);
  return (0, _isString["default"])(target);
};
/** */


var checkMode = function checkMode(plugin) {
  var mode = plugin.mode;
  return (0, _isUndefined["default"])(mode) || ['add', 'wrap'].some(function (s) {
    return s === mode;
  });
};
/** */


var checkMapStateToProps = function checkMapStateToProps(plugin) {
  var mapStateToProps = plugin.mapStateToProps;
  return (0, _isUndefined["default"])(mapStateToProps) || (0, _isNull["default"])(mapStateToProps) || (0, _isFunction["default"])(mapStateToProps);
};
/** */


var checkMapDispatchToProps = function checkMapDispatchToProps(plugin) {
  var mapDispatchToProps = plugin.mapDispatchToProps;
  return (0, _isUndefined["default"])(mapDispatchToProps) || (0, _isNull["default"])(mapDispatchToProps) || (0, _isFunction["default"])(mapDispatchToProps) || (0, _isObject["default"])(mapDispatchToProps);
};
/** */


var checkReducers = function checkReducers(plugin) {
  var reducers = plugin.reducers;
  return (0, _isUndefined["default"])(reducers) || (0, _isObject["default"])(reducers) && (0, _values["default"])(reducers).every(_isFunction["default"]);
};