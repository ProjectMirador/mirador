/** Normalizes a path into an array of keys; a string is a single key (ids are often URLs containing dots) */
const toPath = (path) => (Array.isArray(path) ? path : [path]);

/** Returns true if value can hold properties */
const isObjectLike = (value) => value !== null && typeof value === 'object';

/** Gets the value at path of object */
const get = (object, path) => toPath(path).reduce((current, key) => (isObjectLike(current) ? current[key] : undefined), object);

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
  const [key, ...rest] = toPath(path);
  const current = isObjectLike(object) ? object : {};

  return { ...current, [key]: rest.length > 0 ? set(current[key], rest, value) : value };
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
  const updater = typeof value === 'function' ? value : (current) => ({ ...current, ...value });

  return set(object, path, updater(get(object, path)));
}

/**
 * Removes the property at path of object.
 *
 * @param {Object} object
 * @param {String|String[]} path
 * @param {Object}
 */
export function unset(object, path) {
  const [key, ...rest] = toPath(path);

  if (!isObjectLike(object) || !(key in object)) return object;
  if (rest.length > 0) return { ...object, [key]: unset(object[key], rest) };

  const remaining = { ...object };
  delete remaining[key];
  return remaining;
}
