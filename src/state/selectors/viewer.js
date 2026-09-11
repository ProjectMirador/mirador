import { createSelector } from 'reselect';
import CanvasWorld from '../../lib/CanvasWorld';

import { getVisibleCanvases, getVisibleCanvasIds } from './canvases';
import { getLayersForVisibleCanvases } from './layers';
import { getSequenceViewingDirection } from './sequences';
import { getMiradorCanvasWrapper } from './wrappers';
import { getViewer } from './getters';

/**
 *  Instantiate a manifesto instance.
 * @param {object} state
 * @param {string} windowId
 * @return {object}
 */
export const getCurrentCanvasWorld = createSelector(
  [getVisibleCanvases, getLayersForVisibleCanvases, getSequenceViewingDirection, getMiradorCanvasWrapper],
  (canvases, layers, viewingDirection, getMiradorCanvas) =>
    new CanvasWorld(canvases.map(getMiradorCanvas), layers, viewingDirection),
);

/**
 * The viewport OpenSeadragonComponent should be pointed at: either the
 * saved position (preserveMiradorViewport) or a fit to the current
 * canvas-set's bounds. canvasKey is a real identity (not just bounds),
 * since two different canvases can declare identical dimensions.
 * @param {object} state
 * @param {object} props
 * @param {string} props.windowId
 * @return {object} { bounds?, x?, y?, zoom?, rotation?, flip?, canvasKey }
 */
export const getDesiredViewport = createSelector(
  [getCurrentCanvasWorld, getViewer, getVisibleCanvasIds],
  (canvasWorld, viewerConfig, visibleCanvasIds) => ({
    ...(viewerConfig || (canvasWorld.hasDimensions() ? { bounds: canvasWorld.worldBounds() } : undefined)),
    canvasKey: visibleCanvasIds.join(','),
  }),
);
