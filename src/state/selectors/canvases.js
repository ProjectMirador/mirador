import { createSelector } from 'reselect';
import { Utils } from 'manifesto.js';
import CanvasGroupings from '../../lib/CanvasGroupings';
import { getManifestoInstance } from './manifests';

export const getCanvases = createSelector(
  [getManifestoInstance],
  manifest => manifest && manifest.getSequences()[0].getCanvases(),
);

/**
* Return the canvas selected by an index
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {Object}
*/
export const getCanvas = createSelector(
  [
    getManifestoInstance,
    (state, { windowId, canvasIndex }) => (
      canvasIndex === 'selected'
        ? state.windows[windowId].canvasIndex
        : canvasIndex
    ),
  ],
  (manifest, canvasIndex) => manifest
    && manifest
      .getSequences()[0]
      .getCanvasByIndex(canvasIndex),
);

/**
* Return the current canvas selected in a window
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {Object}
*/
export function getSelectedCanvas(state, props) {
  return getCanvas(state, { ...props, canvasIndex: 'selected' });
}

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
    getCanvases,
    (state, { windowId }) => state.windows[windowId],
  ],
  (canvases, { canvasIndex, view }) => canvases
    && new CanvasGroupings(
      canvases,
      view,
    ).getCanvases(canvasIndex),
);

/**
* Return canvas label, or alternatively return the given index + 1 to be displayed
* @param {object} canvas
* @return {String|Integer}
*/
export const getCanvasLabel = createSelector(
  [getCanvas],
  canvas => (canvas && (
    canvas.getLabel().length > 0
      ? canvas.getLabel().map(label => label.value)[0]
      : String(canvas.index + 1)
  )),
);

/**
* Return canvas description
* @param {object} canvas
* @param {String}
*/
export const getCanvasDescription = createSelector(
  [getCanvas],
  canvas => canvas && canvas.getProperty('description'),
);

const authServiceProfiles = {
  clickthrough: true, external: true, kiosk: true, login: true,
};
/**
 *
 */
export function selectNextAuthService({ auth }, resource, filter = authServiceProfiles) {
  const externalService = Utils.getService({ ...resource, options: {} }, 'http://iiif.io/api/auth/1/external');

  if (externalService) {
    if (!auth[externalService.id]) {
      return filter.external && externalService;
    }

    if (auth[externalService.id].isFetching || auth[externalService.id].ok) return null;
  }

  const kioskService = Utils.getService({ ...resource, options: {} }, 'http://iiif.io/api/auth/1/kiosk');
  if (kioskService) {
    if (!auth[kioskService.id]) {
      return filter.kiosk && kioskService;
    }

    if (auth[kioskService.id].isFetching || auth[kioskService.id].ok) return null;
  }

  const clickthroughService = Utils.getService({ ...resource, options: {} }, 'http://iiif.io/api/auth/1/clickthrough');
  if (clickthroughService) {
    if (!auth[clickthroughService.id]) {
      return filter.clickthrough && clickthroughService;
    }

    if (auth[clickthroughService.id].isFetching || auth[clickthroughService.id].ok) return null;
  }

  const loginService = Utils.getService({ ...resource, options: {} }, 'http://iiif.io/api/auth/1/login');
  if (loginService) {
    if (!auth[loginService.id]) {
      return filter.login && loginService;
    }
  }

  return null;
}
