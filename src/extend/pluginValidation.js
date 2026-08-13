/** */
export const validatePlugin = (plugin) =>
  [checkPlugin, checkName, checkTarget, checkMode, checkMapStateToProps, checkMapDispatchToProps, checkReducers].every((check) =>
    check(plugin),
  );

/** */
const isObject = (value) => value !== null && (typeof value === 'object' || typeof value === 'function');

/** */
const checkPlugin = (plugin) => isObject(plugin);

/** */
const checkName = (plugin) => {
  const { name } = plugin;
  return name === undefined || typeof name === 'string';
};

/** */
const checkTarget = (plugin) => {
  const { mode, target } = plugin;
  if (mode === undefined) return target === undefined;

  return typeof target === 'string';
};

/** */
const checkMode = (plugin) => {
  const { mode } = plugin;
  return mode === undefined || ['add', 'wrap'].some((s) => s === mode);
};

/** */
const checkMapStateToProps = (plugin) => {
  const { mapStateToProps } = plugin;
  return mapStateToProps === undefined || mapStateToProps === null || typeof mapStateToProps === 'function';
};

/** */
const checkMapDispatchToProps = (plugin) => {
  const { mapDispatchToProps } = plugin;
  return (
    mapDispatchToProps === undefined ||
    mapDispatchToProps === null ||
    typeof mapDispatchToProps === 'function' ||
    isObject(mapDispatchToProps)
  );
};

/** */
const checkReducers = (plugin) => {
  const { reducers } = plugin;
  return (
    reducers === undefined || (isObject(reducers) && Object.values(reducers).every((reducer) => typeof reducer === 'function'))
  );
};
