import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isNull from 'lodash/isNull';
import values from 'lodash/values';
/** */

export var validatePlugin = function validatePlugin(plugin) {
  return [checkPlugin, checkName, checkTarget, checkMode, checkMapStateToProps, checkMapDispatchToProps, checkReducers].every(function (check) {
    return check(plugin);
  });
};
/** */

var checkPlugin = function checkPlugin(plugin) {
  return isObject(plugin);
};
/** */


var checkName = function checkName(plugin) {
  var name = plugin.name;
  return isUndefined(name) || isString(name);
};
/** */


var checkTarget = function checkTarget(plugin) {
  var mode = plugin.mode,
      target = plugin.target;
  if (isUndefined(mode)) return isUndefined(target);
  return isString(target);
};
/** */


var checkMode = function checkMode(plugin) {
  var mode = plugin.mode;
  return isUndefined(mode) || ['add', 'wrap'].some(function (s) {
    return s === mode;
  });
};
/** */


var checkMapStateToProps = function checkMapStateToProps(plugin) {
  var mapStateToProps = plugin.mapStateToProps;
  return isUndefined(mapStateToProps) || isNull(mapStateToProps) || isFunction(mapStateToProps);
};
/** */


var checkMapDispatchToProps = function checkMapDispatchToProps(plugin) {
  var mapDispatchToProps = plugin.mapDispatchToProps;
  return isUndefined(mapDispatchToProps) || isNull(mapDispatchToProps) || isFunction(mapDispatchToProps) || isObject(mapDispatchToProps);
};
/** */


var checkReducers = function checkReducers(plugin) {
  var reducers = plugin.reducers;
  return isUndefined(reducers) || isObject(reducers) && values(reducers).every(isFunction);
};