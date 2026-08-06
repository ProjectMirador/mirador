/**
 * Small collection and object helpers implemented with native JavaScript.
 */

export const compact = (values) => values.filter(Boolean);

export const flatten = (values) => values.flat();

export const flattenDeep = (values) => values.flat(Infinity);

export const difference = (values, excludedValues) => values.filter((value) => !excludedValues.includes(value));

export const without = (values, ...excludedValues) => difference(values, excludedValues);

export const union = (...collections) => [...new Set(collections.flat())];

export const groupBy = (values, getKey) =>
  (values ?? []).reduce((groups, value) => {
    const key = getKey(value);
    return {
      ...groups,
      [key]: [...(groups[key] || []), value],
    };
  }, {});

export const keyBy = (values, getKey) => Object.fromEntries(values.map((value) => [getKey(value), value]));

export const omit = (object, keys) => {
  const result = { ...object };
  const keysToOmit = Array.isArray(keys) ? keys : [keys];
  keysToOmit.forEach((key) => delete result[key]);
  return result;
};

const pathParts = (path) => (Array.isArray(path) ? path : `${path}`.match(/[^.[\]]+/g) || []);

/**
 * Immutably set a value at a path, creating missing objects as needed.
 */
export const setPath = (path, value, object) => {
  const parts = pathParts(path);
  if (parts.length === 0) return value;

  const [key, ...remainingPath] = parts;
  const source = object ?? {};
  const result = Array.isArray(source) ? [...source] : { ...source };
  result[key] = remainingPath.length === 0 ? value : setPath(remainingPath, value, source[key]);
  return result;
};

/**
 * Immutably update a value at a path.
 */
export const updatePath = (path, updater, object) => {
  const parts = pathParts(path);
  const current = parts.reduce((value, key) => value?.[key], object);
  return setPath(parts, updater(current), object);
};

/**
 * Immutably remove a value at a path.
 */
export const unsetPath = (path, object) => {
  const parts = pathParts(path);
  if (parts.length === 0) return object;

  const [key, ...remainingPath] = parts;
  const source = object ?? {};
  const result = Array.isArray(source) ? [...source] : { ...source };
  if (remainingPath.length === 0) {
    delete result[key];
  } else {
    result[key] = unsetPath(remainingPath, source[key]);
  }
  return result;
};

/**
 * Compare arrays and plain objects recursively.
 */
export const isEqual = (left, right) => {
  if (Object.is(left, right)) return true;
  if (typeof left !== 'object' || left === null || typeof right !== 'object' || right === null) return false;

  const leftKeys = Reflect.ownKeys(left);
  const rightKeys = Reflect.ownKeys(right);
  return (
    leftKeys.length === rightKeys.length &&
    leftKeys.every((key) => Object.prototype.hasOwnProperty.call(right, key) && isEqual(left[key], right[key]))
  );
};
