import { createSelector } from 'reselect';
import flatten from 'lodash/flatten';
import { Resource } from 'manifesto.js';
import CanvasGroupings from '../../lib/CanvasGroupings';
import { getIiifResourceImageService } from '../../lib/iiif';
import { getMiradorCanvasWrapper } from './wrappers';
import { miradorSlice, EMPTY_ARRAY } from './utils';
import { getWindow } from './getters';
import { getSequence } from './sequences';
import { getWindowViewType } from './windows';
import { getManifestLocale } from './manifests';
import { getProbeService } from '../../lib/getServices';
import { anyImageServices } from '../../lib/typeFilters';

/**
 * Returns the info response.
 * @param {object} state
 * @returns {object}
 */
export const selectInfoResponses = (state) => miradorSlice(state).infoResponses;

/** */
export const selectProbeResponses = (state) => miradorSlice(state).probeResponses;

export const getCanvases = createSelector([getSequence], (sequence) => (sequence && sequence.getCanvases()) || EMPTY_ARRAY);

/**
 * Return the canvas selected by an id
 * @param {object} state
 * @param {object} props
 * @param {string} props.canvasId
 * @returns {object}
 */
export const getCanvas = createSelector([getSequence, (state, { canvasId }) => canvasId], (sequence, canvasId) => {
  if (!sequence || !canvasId) return undefined;

  return sequence.getCanvasById(canvasId);
});

/**
 * Returns the current canvas.
 * @param {object} state
 * @param {object} props
 * @param {string} props.windowId
 * @returns {object|undefined}
 */
export const getCurrentCanvas = createSelector([getSequence, getWindow], (sequence, window) => {
  if (!sequence || !window) return undefined;

  if (!window.canvasId) return sequence.getCanvasByIndex(0);

  return sequence.getCanvasById(window.canvasId);
});

/**
 * Returns the visible canvas ids.
 * @param {object} state
 * @param {object} props
 * @param {string} props.windowId
 * @returns {Array}
 */
export const getVisibleCanvasIds = createSelector(
  [getWindow],
  (window) => (window && (window.visibleCanvases || (window.canvasId && [window.canvasId]))) || EMPTY_ARRAY,
);

/**
 * Returns the visible canvses.
 * @param {object} state
 * @param {object} props
 * @param {string} props.windowId
 * @returns {Array}
 */
export const getVisibleCanvases = createSelector([getVisibleCanvasIds, getCanvases], (canvasIds, canvases) =>
  (canvases || []).filter((c) => canvasIds.includes(c.id)),
);

/**
 * Return the current canvases grouped by how they'll appear in the viewer.
 * For book view returns groups of 2, for single returns 1.
 * @param {object} state
 * @param {object} props
 * @param {string} props.manifestId
 * @param {string} props.windowId
 * @returns {Array}
 */
export const getCanvasGroupings = createSelector(
  [getCanvases, getWindowViewType],
  (canvases, view) => canvases && new CanvasGroupings(canvases, view).groupings(),
);

/**
 * Return the current canvases selected in a window.
 * For book view returns 2, for single returns 1.
 * @param {object} state
 * @param {object} props
 * @param {string} props.manifestId
 * @param {string} props.windowId
 * @param {string} props.canvasId
 * @returns {Array}
 */
export const getCanvasGrouping = createSelector(
  [getCanvasGroupings, (state, { canvasId }) => canvasId],
  (groupings, canvasId) => (groupings && groupings.find((group) => group.some((c) => c.id === canvasId))) || EMPTY_ARRAY,
);

/**
 * Return the next canvas(es) for a window.
 * For book view returns 2, for single returns 1.
 * @param {object} state
 * @param {object} props
 * @param {string} props.manifestId
 * @param {string} props.windowId
 * @returns {Array}
 */
export const getNextCanvasGrouping = createSelector([getCanvasGroupings, getCurrentCanvas], (groupings, canvas, view) => {
  if (!groupings || !canvas) return undefined;
  const currentGroupIndex = groupings.findIndex((group) => group.some((c) => c.id === canvas.id));

  if (currentGroupIndex < 0 || currentGroupIndex + 1 >= groupings.length) return undefined;
  const newGroup = groupings[currentGroupIndex + 1];

  return newGroup;
});

/**
 * Return the previous canvas(es) for a window.
 * For book view returns 2, for single returns 1.
 * @param {object} state
 * @param {object} props
 * @param {string} props.manifestId
 * @param {string} props.windowId
 * @returns {Array}
 */
export const getPreviousCanvasGrouping = createSelector([getCanvasGroupings, getCurrentCanvas], (groupings, canvas, view) => {
  if (!groupings || !canvas) return undefined;

  const currentGroupIndex = groupings.findIndex((group) => group.some((c) => c.id === canvas.id));

  if (currentGroupIndex < 1) return undefined;
  const newGroup = groupings[currentGroupIndex - 1];

  return newGroup;
});

/**
 * Return canvas label, or alternatively return the given index + 1 to be displayed.
 * @param {object} state
 * @param {object} props
 * @param {string} props.canvasId
 * @param {string} props.manifestId
 * @returns {string|number}
 */
export const getCanvasLabel = createSelector(
  [getCanvas, getManifestLocale],
  (canvas, locale) => canvas && (canvas.getLabel().length > 0 ? canvas.getLabel().getValue(locale) : String(canvas.index + 1)),
);

/**
 * Return canvas description.
 * @param {object} canvas
 * @param {string} companionWindowId
 */
export const getCanvasDescription = createSelector([getCanvas], (canvas) => canvas && canvas.getProperty('description'));

/** */
const probeReplacements = (resources, probeResponses) => {
  if (!probeResponses) return resources;

  return resources.map((r) => {
    const probeService = getProbeService(r);
    const probeServiceId = probeService && probeService.id;
    const probeResponse = probeServiceId && probeResponses[probeServiceId];
    if (!probeResponse || probeResponse.isFetching) return r;

    const probeContentUrl = probeResponse.json && (probeResponse.json.location || probeResponse.json.substitute);
    const probeReplacedProperties = {};
    if (probeContentUrl) {
      probeReplacedProperties.id = probeContentUrl;
      if (probeResponse.json.format) probeReplacedProperties.format = probeResponse.json.format;
    }
    return new Resource({ ...r.__jsonld, ...probeReplacedProperties }, r.options);
  });
};

export const getVisibleCanvasNonTiledResources = createSelector(
  [getVisibleCanvases, getMiradorCanvasWrapper],
  (canvases, getMiradorCanvas) =>
    flatten(canvases.map((canvas) => getMiradorCanvas(canvas).imageResources)).filter(
      (resource) => anyImageServices(resource).length < 1,
    ),
);

/**
 * Returns visible canvas text resources.
 * @param {object} state
 * @param {string} windowId
 * @return {Array}
 */
export const getVisibleCanvasTextResources = createSelector(
  [getVisibleCanvases, getMiradorCanvasWrapper],
  (canvases, getMiradorCanvas) => flatten(canvases.map((canvas) => getMiradorCanvas(canvas).textResources)),
);

/**
 * Returns visible canvas video resources.
 * @param {object} state
 * @param {string} windowId
 * @return {Array}
 */
export const getVisibleCanvasVideoResources = createSelector(
  [getVisibleCanvases, getMiradorCanvasWrapper, selectProbeResponses],
  (canvases, getMiradorCanvas, probeResponses) =>
    flatten(canvases.map((canvas) => probeReplacements(getMiradorCanvas(canvas).videoResources, probeResponses))),
);

/**
 * Returns visible canvas captions.
 * @param {object} state
 * @param {string} windowId
 * @return {Array}
 */
export const getVisibleCanvasCaptions = createSelector(
  [getVisibleCanvases, getMiradorCanvasWrapper],
  (canvases, getMiradorCanvas) =>
    flatten(
      canvases.map((canvas) => {
        const miradorCanvas = getMiradorCanvas(canvas);
        // prefer v3, fallback to v2, which can also be an empty array if no captions exist.
        if (miradorCanvas.v3VttContent.length) return miradorCanvas.v3VttContent;
        return miradorCanvas.v2VttContent;
      }),
    ),
);

/**
 * Returns visible canvas audio resources.
 * @param {object} state
 * @param {string} windowId
 * @return {Array}
 */
export const getVisibleCanvasAudioResources = createSelector(
  [getVisibleCanvases, getMiradorCanvasWrapper, selectProbeResponses],
  (canvases, getMiradorCanvas, probeResponses) =>
    flatten(canvases.map((canvas) => probeReplacements(getMiradorCanvas(canvas).audioResources, probeResponses))),
);

/**
 * Returns info response.
 * @param {object} state
 * @param {object} props
 * @param {string} props.windowId
 * @param {string} props.canvasId
 * @param {string} props.infoId
 * @returns {object|undefined}
 */
export const selectInfoResponse = createSelector(
  [(state, { infoId }) => infoId, getCanvas, getMiradorCanvasWrapper, selectInfoResponses],
  (infoId, canvas, getMiradorCanvas, infoResponses) => {
    let iiifServiceId = infoId;

    if (!infoId) {
      if (!canvas) return undefined;
      const image = getMiradorCanvas(canvas).iiifImageResources[0];
      iiifServiceId = image && getIiifResourceImageService(image)?.id;
    }

    return (
      iiifServiceId && infoResponses[iiifServiceId] && !infoResponses[iiifServiceId].isFetching && infoResponses[iiifServiceId]
    );
  },
);

export const selectProbeResponse = createSelector(
  [(state, { probeId }) => probeId, getCanvas, selectProbeResponses],
  (probeId, canvas, probeResponses) => {
    let probeServiceId = probeId;

    if (!probeServiceId) {
      if (!canvas) return undefined;
      const miradorCanvas = new MiradorCanvas(canvas);
      const contentResource = miradorCanvas.imageResources[0];
      const probeService = getProbeService(contentResource);
      probeServiceId = probeService && probeService.id;
    }

    return (
      probeServiceId &&
      probeResponses[probeServiceId] &&
      !probeResponses[probeServiceId].isFetching &&
      probeResponses[probeServiceId]
    );
  },
);
