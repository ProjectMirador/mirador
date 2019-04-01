import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isNull from 'lodash/isNull';
import values from 'lodash/values';

/** */
export const validatePlugin = plugin => [
  checkPlugin,
  checkName,
  checkTarget,
  checkMode,
  checkComponent,
  checkMapStateToProps,
  checkMapDispatchToProps,
  checkReducers,
].every(check => check(plugin));

/** */
const checkPlugin = plugin => isObject(plugin);

/** */
const checkName = (plugin) => {
  const { name } = plugin;
  return isUndefined(name) || isString(name);
};

/** */
const checkTarget = (plugin) => {
  const { target } = plugin;
  return isString(target);
};

/** */
const checkMode = (plugin) => {
  const { mode } = plugin;
  return ['add', 'wrap'].some(s => s === mode);
};

/** */
const checkComponent = (plugin) => {
  const { component } = plugin;
  return isFunction(component);
};

/** */
const checkMapStateToProps = (plugin) => {
  const { mapStateToProps } = plugin;
  return isUndefined(mapStateToProps)
    || isNull(mapStateToProps)
    || isFunction(mapStateToProps);
};

/** */
const checkMapDispatchToProps = (plugin) => {
  const { mapDispatchToProps } = plugin;
  return isUndefined(mapDispatchToProps)
    || isNull(mapDispatchToProps)
    || isFunction(mapDispatchToProps)
    || isObject(mapDispatchToProps);
};

/** */
const checkReducers = (plugin) => {
  const { reducers } = plugin;
  return isUndefined(reducers)
    || (isObject(reducers) && values(reducers).every(isFunction));
};
