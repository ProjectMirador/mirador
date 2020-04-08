
/** */
let _getMiradorState = globalState => globalState; // eslint-disable-line no-underscore-dangle

/** */
export function setMiradorStateGetter(customGetter) {
  _getMiradorState = customGetter;
}

/** */
export function getMiradorState(globalState) {
  return _getMiradorState(globalState);
}
