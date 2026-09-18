import ActionTypes from './action-types';
import { getNextCanvasGrouping, getPreviousCanvasGrouping, getCanvasGrouping, getWindowConfig, getConfig } from '../selectors';

/**
 * Pre-#4536, Mirador's "remember pan/zoom across page turns" feature lived at
 * osdConfig.preserveViewport, entangled with OpenSeadragon's own same-named
 * (and unrelated) option. Deployments that set osdConfig.preserveViewport
 * explicitly would otherwise have that setting silently dropped by the
 * window.preserveMiradorViewport rename. Warn and fall back to it until this
 * legacy support is removed in a future major version.
 * @param {object} state
 * @param {boolean} preserveMiradorViewport
 * @returns {boolean}
 */
function withLegacyPreserveViewportFallback(state, preserveMiradorViewport) {
  const legacyPreserveViewport = getConfig(state).osdConfig?.preserveViewport;
  if (legacyPreserveViewport === undefined) return preserveMiradorViewport;

  // eslint-disable-next-line no-console
  console.warn(
    '[Mirador] osdConfig.preserveViewport is deprecated and no longer controls OpenSeadragon directly. ' +
      'Set window.preserveMiradorViewport instead -- this fallback will be removed in a future release.',
  );

  return preserveMiradorViewport || legacyPreserveViewport;
}

/**
 * setCanvas - action creator
 *
 * @param  {String} windowId
 * @param  {String} canvasId
 * @memberof ActionCreators
 */
export function setCanvas(windowId, canvasId, newGroup = undefined, options = {}) {
  return (dispatch, getState) => {
    const state = getState();
    const { preserveMiradorViewport } = getWindowConfig(state, { windowId });
    let visibleCanvases = newGroup;

    if (!visibleCanvases) {
      const group = getCanvasGrouping(state, { canvasId, windowId });
      visibleCanvases = (group || []).map((c) => c.id);
    }

    dispatch({
      canvasId,
      preserveMiradorViewport:
        options?.preserveMiradorViewport ?? withLegacyPreserveViewportFallback(state, preserveMiradorViewport),
      type: ActionTypes.SET_CANVAS,
      visibleCanvases,
      windowId,
    });
  };
}

/** Set the window's canvas to the next canvas grouping */
export function setNextCanvas(windowId) {
  return (dispatch, getState) => {
    const state = getState();
    const newGroup = getNextCanvasGrouping(state, { windowId });
    const ids = (newGroup || []).map((c) => c.id);
    newGroup && dispatch(setCanvas(windowId, ids[0], ids));
  };
}

/** Set the window's canvas to the previous canvas grouping */
export function setPreviousCanvas(windowId) {
  return (dispatch, getState) => {
    const state = getState();

    const newGroup = getPreviousCanvasGrouping(state, { windowId });
    const ids = (newGroup || []).map((c) => c.id);
    newGroup && dispatch(setCanvas(windowId, ids[0], ids));
  };
}

/**
 *
 * @param windowId
 * @param payload
 * @returns {{payload: *, type: string, windowId: *}}
 */
export function updateViewport(windowId, payload) {
  return {
    payload,
    type: ActionTypes.UPDATE_VIEWPORT,
    windowId,
  };
}
