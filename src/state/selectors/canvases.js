import { createSelector } from 'reselect';
import { Utils } from 'manifesto.js/dist-esmodule/Utils';
import CanvasGroupings from '../../lib/CanvasGroupings';
import { getManifestoInstance } from './manifests';
import { getWindow, getWindowViewType } from './windows';

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
    (state, { canvasIndex }) => canvasIndex,
    (state, { canvasId }) => canvasId,
  ],
  (manifest, canvasIndex, canvasId) => {
    if (!manifest) return undefined;

    if (canvasId !== undefined) return manifest.getSequences()[0].getCanvasById(canvasId);
    return manifest.getSequences()[0].getCanvasByIndex(canvasIndex);
  },
);

export const getCurrentCanvas = createSelector(
  [
    getManifestoInstance,
    getWindow,
  ],
  (manifest, window) => {
    if (!manifest || !window) return undefined;

    if (!window.canvasId) return manifest.getSequences()[0].getCanvasByIndex(0);

    return manifest.getSequences()[0].getCanvasById(window.canvasId);
  },
);

/** */
export function getVisibleCanvases(state, args) {
  const canvas = getCurrentCanvas(state, { ...args });
  if (!canvas) return undefined;

  return getCanvasGrouping(state, { ...args, canvasId: canvas.id });
}

/**
* Return the current canvases grouped by how they'll appear in the viewer
* For book view returns groups of 2, for single returns 1
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {Array}
*/
const getCanvasGroupings = createSelector(
  [
    getCanvases,
    getWindowViewType,
  ],
  (canvases, view) => (canvases
      && new CanvasGroupings(
        canvases,
        view,
      ).groupings()),
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
export const getCanvasGrouping = createSelector(
  [
    getCanvasGroupings,
    (state, { canvasId }) => canvasId,
  ],
  (groupings, canvasId, view) => (groupings
      && groupings.find(group => group.some(c => c.id === canvasId))) || [],
);

/**
* Return the next canvas(es) for a window
* For book view returns 2, for single returns 1
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {Array}
*/
export const getNextCanvasGrouping = createSelector(
  [
    getCanvasGroupings,
    getCurrentCanvas,
  ],
  (groupings, canvas, view) => {
    if (!groupings) return undefined;
    const currentGroupIndex = groupings.findIndex(group => group.some(c => c.id === canvas.id));

    if (currentGroupIndex < 0 || currentGroupIndex + 1 >= groupings.length) return undefined;
    const newGroup = groupings[currentGroupIndex + 1];

    return newGroup;
  },
);

/**
* Return the previous canvas(es) for a window
* For book view returns 2, for single returns 1
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {Array}
*/
export const getPreviousCanvasGrouping = createSelector(
  [
    getCanvasGroupings,
    getCurrentCanvas,
  ],
  (groupings, canvas, view) => {
    if (!groupings) return undefined;

    const currentGroupIndex = groupings.findIndex(group => group.some(c => c.id === canvas.id));

    if (currentGroupIndex < 1) return undefined;
    const newGroup = groupings[currentGroupIndex - 1];

    return newGroup;
  },
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
  (canvas, infoResponses) => canvas && canvas.getImages()[0]
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
export function selectActiveAuthService(state, resource) {
  const loginService = Utils.getService({ ...resource, options: {} }, 'http://iiif.io/api/auth/1/login');
  if (selectAuthStatus(state, loginService)) return loginService;

  const clickthroughService = Utils.getService({ ...resource, options: {} }, 'http://iiif.io/api/auth/1/clickthrough');
  if (selectAuthStatus(state, clickthroughService)) return clickthroughService;

  const kioskService = Utils.getService({ ...resource, options: {} }, 'http://iiif.io/api/auth/1/kiosk');
  if (selectAuthStatus(state, kioskService)) return kioskService;

  const externalService = Utils.getService({ ...resource, options: {} }, 'http://iiif.io/api/auth/1/external');
  if (selectAuthStatus(state, externalService)) return externalService;

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
      || selectActiveAuthService(state, resource);
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
