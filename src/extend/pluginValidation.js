const isString = (value) => typeof value === 'string';
const isUndefined = (value) => value === undefined;
const isFunction = (value) => typeof value === 'function';
const isObject = (value) => value !== null && (typeof value === 'object' || typeof value === 'function');
const isNull = (value) => value === null;

/** */
export const validatePlugin = (plugin) =>
  [checkPlugin, checkName, checkTarget, checkMode, checkMapStateToProps, checkMapDispatchToProps, checkReducers].every((check) =>
    check(plugin),
  );

/** */
const checkPlugin = (plugin) => isObject(plugin);

/** */
const checkName = (plugin) => {
  const { name } = plugin;
  return isUndefined(name) || isString(name);
};

/** */
const checkTarget = (plugin) => {
  const { mode, target } = plugin;
  if (isUndefined(mode)) return isUndefined(target);

  return isString(target);
};

/** */
const checkMode = (plugin) => {
  const { mode } = plugin;
  return isUndefined(mode) || ['add', 'wrap'].some((s) => s === mode);
};

/** */
const checkMapStateToProps = (plugin) => {
  const { mapStateToProps } = plugin;
  return isUndefined(mapStateToProps) || isNull(mapStateToProps) || isFunction(mapStateToProps);
};

/** */
const checkMapDispatchToProps = (plugin) => {
  const { mapDispatchToProps } = plugin;
  return (
    isUndefined(mapDispatchToProps) ||
    isNull(mapDispatchToProps) ||
    isFunction(mapDispatchToProps) ||
    isObject(mapDispatchToProps)
  );
};

/** */
const checkReducers = (plugin) => {
  const { reducers } = plugin;
  return isUndefined(reducers) || (isObject(reducers) && Object.values(reducers).every(isFunction));
};
