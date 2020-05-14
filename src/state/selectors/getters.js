/** */
export function getWindows(state) {
  return state.windows || {};
}


/** */
export function getWindow(state, { windowId }) {
  return getWindows(state)[windowId];
}
