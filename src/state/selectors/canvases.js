import { createSelector } from 'reselect';
import CanvasGroupings from '../../lib/CanvasGroupings';
import { getManifestoInstance } from './manifests';

/**
* Return the current canvas selected in a window
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {Object}
*/
export const getSelectedCanvas = createSelector(
  [
    getManifestoInstance,
    (state, { windowId }) => state.windows[windowId].canvasIndex,
  ],
  (manifest, canvasIndex) => manifest
    && manifest
      .getSequences()[0]
      .getCanvasByIndex(canvasIndex),
);

/**
* Return the current canvases selected in a window
* For book view returns 2, for single returns 1
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {Array}
*/
export const getSelectedCanvases = createSelector(
  [
    getManifestoInstance,
    (state, { windowId }) => state.windows[windowId],
  ],
  (manifest, { canvasIndex, view }) => manifest
    && new CanvasGroupings(
      manifest.getSequences()[0].getCanvases(),
      view,
    ).getCanvases(canvasIndex),
);
