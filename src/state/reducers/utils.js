import omit from 'lodash/omit';

/**
* Immutably sets a new item to object.
* If item of this id already exists it will be overriden.
*
*
* @param {Object} object
* @param {String} key
* @param {Object} props
* @return {Object}
*/
export function setItem(object, key, props) {
  return {
    ...object,
    [key]: {
      ...props,
    },
  };
}

/**
* Immutably updates an item of object.
* Existing properties of item will be retained, but can be overriden by `props`.
*
* @param {Object} object
* @param {String} key
* @param {Object} props
* @return {Object}
*/
export function updateItem(object, key, propsOrFunction) {
  return typeof propsOrFunction === 'function'
    ? updateItemWithFunction(object, key, propsOrFunction)
    : updateItemWithProps(object, key, propsOrFunction);
}

/**
* Immutably removes an item from object.
*
* @param {Object} object
* @param {String} key
* @param {Object}
*/
export function removeItem(object, key) {
  return omit(object, key);
}

/** */
function updateItemWithProps(object, key, props) {
  return {
    ...object,
    [key]: {
      ...object[key],
      ...props,
    },
  };
}

/** */
function updateItemWithFunction(object, key, fn) {
  return {
    ...object,
    [key]: fn(object[key]),
  };
}
