import _set from 'lodash/fp/set';
import _update from 'lodash/fp/update';
import _unset from 'lodash/fp/unset';

/**
 * Sets the value at path of object.
 * If a portion of `path` doesn't exist, it's created.
 * @param {object} object
 * @param {string | string[]} path
 * @param {any} value
 * @returns {object}
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
 * @param {object} object
 * @param {string | string[]} path
 * @param {object | Function} value
 * @returns {object}
 */
export function update(object, path, value) {
  return typeof value === 'function'
    ? _update(path, value, object)
    : _update(path, (current) => ({ ...current, ...value }), object);
}

/**
 * Removes the property at path of object.
 * @param {object} object
 * @param {string | string[]} path
 * @returns {object}
 */
export function unset(object, path) {
  return _unset(path, object);
}
