function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import _set from 'lodash/fp/set';
import _update from 'lodash/fp/update';
import _unset from 'lodash/fp/unset';
/**
* Sets the value at path of object.
* If a portion of `path` doesn't exist, it's created.
*
* @param {Object} object
* @param {String|String[]} path
* @param {any} value
* @return {Object}
*/

export function set(object, path, value) {
  return _set(path, value, object);
}
/**
* Updates the value at path of object.
* If a portion of `path` doesn't exist, it's created.
* If `value` is a function it should have this signature: (currentValue) => newValue.
* If `value` is an object it is assumed that the current value is also an object
* and the new value will crated by: { ...currentValue, ...value }.
*
* @param {Object} object
* @param {String|String[]} path
* @param {Object|Function} value
* @return {Object}
*/

export function update(object, path, value) {
  return typeof value === 'function' ? _update(path, value, object) : _update(path, function (current) {
    return _objectSpread(_objectSpread({}, current), value);
  }, object);
}
/**
* Removes the property at path of object.
*
* @param {Object} object
* @param {String|String[]} path
* @param {Object}
*/

export function unset(object, path) {
  return _unset(path, object);
}