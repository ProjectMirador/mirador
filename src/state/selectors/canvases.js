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
    (state, { canvasId }) => canvasId,
  ],
  (manifest, canvasIndex, canvasId) => {
    if (!manifest) return undefined;

    if (canvasId !== undefined) return manifest.getSequences()[0].getCanvasById(canvasId);
    if (canvasIndex !== undefined) return manifest.getSequences()[0].getCanvasByIndex(canvasIndex);

    return undefined;
  },
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
* Return the selected canvas index for a window
* @param {object} state
* @param {object} props
* @param {string} props.windowId
* @return {Object}
*/
export function getSelectedCanvasIndex({ windows }, { windowId }) {
  return windows[windowId].canvasIndex;
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
    getSelectedCanvasIndex,
    (state, { windowId }) => state.windows[windowId].view,
  ],
  (canvases, canvasIndex, view) => canvases
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

/** */
export const selectInfoResponses = state => state.infoResponses;

export const selectInfoResponse = createSelector(
  [
    getCanvas,
    selectInfoResponses,
  ],
  (canvas, infoResponses) => canvas
    && infoResponses[canvas.getImages()[0].getResource().getServices()[0].id]
    && !infoResponses[canvas.getImages()[0].getResource().getServices()[0].id].isFetching
    && infoResponses[canvas.getImages()[0].getResource().getServices()[0].id],
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

/** */
export function selectFailedAuthService(state, resource) {
  const loginService = Utils.getService({ ...resource, options: {} }, 'http://iiif.io/api/auth/1/login');
  if (selectAuthStatus(state, loginService) === 'failed') return loginService;

  const clickthroughService = Utils.getService({ ...resource, options: {} }, 'http://iiif.io/api/auth/1/clickthrough');
  if (selectAuthStatus(state, clickthroughService) === 'failed') return clickthroughService;

  const kioskService = Utils.getService({ ...resource, options: {} }, 'http://iiif.io/api/auth/1/kiosk');
  if (selectAuthStatus(state, kioskService) === 'failed') return kioskService;

  const externalService = Utils.getService({ ...resource, options: {} }, 'http://iiif.io/api/auth/1/external');
  if (selectAuthStatus(state, externalService) === 'failed') return externalService;

  return null;
}

export const selectCanvasAuthService = createSelector(
  [
    selectInfoResponse,
    state => state,
  ],
  (infoResponse, state) => {
    const resource = infoResponse && infoResponse.json;

    if (!resource) return undefined;

    return selectNextAuthService(state, resource)
      || selectFailedAuthService(state, resource);
  },
);

/** */
export function selectAuthStatus({ auth }, service) {
  if (!service) return null;
  if (!auth[service.id]) return null;
  if (auth[service.id].isFetching) return 'fetching';
  if (auth[service.id].ok) return 'ok';
  return 'failed';
}
