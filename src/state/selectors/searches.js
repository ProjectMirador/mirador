import { createSelector } from 'reselect';
import { PropertyValue } from 'manifesto.js';
import AnnotationList from '../../lib/AnnotationList';
import { getCanvas, getCanvases } from './canvases';
import { getWindow } from './getters';
import { getManifestLocale, getManifestSearchService } from './manifests';
import iiifContentSearchApiSlice from '../api/iiifContentSearchApiSlice';
import { miradorSlice, EMPTY_ARRAY, EMPTY_OBJECT } from './utils';

/**
 *  Get searches from state.
 */
//TODO: .... get from RTkQ now??
const getSearches = (state) => miradorSlice(state).searches;

/**
 * Returns the search result for a specific window.
 * @param {object} state
 * @param {string} windowId
 * @returns {object}
 */
// TODO:...
export const getSearchForWindow = createSelector([(state, { windowId }) => windowId, getSearches], (windowId, searches) => {
  if (!windowId || !searches) return EMPTY_OBJECT;

  return searches[windowId];
});

/**
 * Returns the search result for a specific companion window.
 * @param {object} state
 * @param {string} companionWindowId
 * @returns {object|undefined}
 */
// TODO: .....
const getSearchForCompanionWindow = createSelector(
  [getSearchForWindow, (state, { companionWindowId }) => companionWindowId],
  (results, companionWindowId) => {
    if (!results || !companionWindowId) return undefined;
    return results[companionWindowId];
  },
);

/**
 * Returns an array of search responses for a specific companion window.
 * @param {object} state
 * @returns {Array}
 */
const getSearchResponsesForCompanionWindow = createSelector([getSearchForCompanionWindow], (results) => {
  if (!results) return EMPTY_ARRAY;
  return Object.values(results.data);
});

/**
 * Returns the search query for a specific companion window.
 * @param {object} state
 * @param {string} windowId
 * @returns {string|undefined}
 */
export const getSearchQuery = createSelector([getSearchForCompanionWindow], (results) => results && results.query);

/**
 * Returns if search response for a companion window is fetching.
 * @param {object} state
 * @returns {boolean}
 */
export const getSearchIsFetching = createSelector([getSearchResponsesForCompanionWindow], (results) =>
  results.some((result) => result.isFetching),
);

/**
 * Returns the total number of search results for a companion window.
 * @param {object} state
 * @param {string} windowId
 * @returns {number|undefined}
 */
export const getSearchNumTotal = createSelector([getSearchForCompanionWindow], (results) => {
  if (!results || !results.data) return undefined;

  const resultWithWithin = Object.values(results.data).find((result) => !result.isFetching && result.json && result.json.within);
  return resultWithWithin?.json?.within?.total;
});

/**
 * Returns the Id of the next search.
 * @param {object} state
 * @param {string} windowId
 * @returns {number|undefined}
 */
export const getNextSearchId = createSelector([getSearchForCompanionWindow], (results) => {
  if (!results || !results.data) return undefined;

  const resultWithAnUnresolvedNext = Object.values(results.data).find(
    (result) => !result.isFetching && result.json && result.json.next && !results.data[result.json.next],
  );

  return resultWithAnUnresolvedNext && resultWithAnUnresolvedNext.json && resultWithAnUnresolvedNext.json.next;
});

const getSearchHitsForCompanionWindow = createSelector([getSearchResponsesForCompanionWindow], (results) =>
  results.flatMap((result) => {
    if (!result || !result.json || result.isFetching || !result.json.hits) return EMPTY_ARRAY;

    return result.json.hits;
  }),
);

export const getSearchAnnotationsForCompanionWindow = createSelector(
  [getSearchResponsesForCompanionWindow],
  (results) => results && searchResultsToAnnotation(results),
);

/**
 * Returns sorted search hits based on canvas order.
 * @param {object} state
 * @param {string} manifestId
 * @returns {Array}
 */
export const getSortedSearchHitsForCompanionWindow = createSelector(
  [getSearchHitsForCompanionWindow, getCanvases, getSearchAnnotationsForCompanionWindow],
  (searchHits, canvases, annotation) => {
    if (!canvases || canvases.length === 0) return EMPTY_ARRAY;
    if (!searchHits || searchHits.length === 0) return EMPTY_ARRAY;
    const canvasIds = canvases.map((canvas) => canvas.id);

    return [].concat(searchHits).sort((a, b) => {
      const hitA = annotation.resources.find((r) => r.id === a.annotations[0]);
      const hitB = annotation.resources.find((r) => r.id === b.annotations[0]);
      return canvasIds.indexOf(hitA.targetId) - canvasIds.indexOf(hitB.targetId);
    });
  },
);

/** convert search results to an annotation */
const searchResultsToAnnotation = (results) => {
  const annotations = results
    .map((result) => {
      if (!result || !result.json || result.isFetching || !result.json.resources) return undefined;
      const anno = new AnnotationList(result.json);
      return {
        id: anno.id,
        resources: anno.resources,
      };
    })
    .filter(Boolean);

  return {
    id: (annotations.find((a) => a.id) || {}).id,
    resources: annotations.flatMap((a) => a.resources),
  };
};

/**
 * Sorts search annotations based on canvas order.
 * @returns {Array}
 */
export function sortSearchAnnotationsByCanvasOrder(searchAnnotations, canvases) {
  if (!searchAnnotations || !searchAnnotations.resources || searchAnnotations.length === 0) return EMPTY_ARRAY;
  if (!canvases || canvases.length === 0) return EMPTY_ARRAY;
  const canvasIds = canvases.map((canvas) => canvas.id);

  return []
    .concat(searchAnnotations.resources)
    .sort((annoA, annoB) => canvasIds.indexOf(annoA.targetId) - canvasIds.indexOf(annoB.targetId));
}

/**
 * Returns sorted search annotations for companion window.
 * @param {object} state
 * @param {string} companionWindowId
 * @returns {Array}
 */
export const getSortedSearchAnnotationsForCompanionWindow = createSelector(
  [getSearchAnnotationsForCompanionWindow, getCanvases],
  (searchAnnotations, canvases) => sortSearchAnnotationsByCanvasOrder(searchAnnotations, canvases),
);

/**
 * Returns the content search annotations for each search companion window
 * in a window, read from the RTK Query cache.
 * @param {object} state
 * @param {string} windowId
 * @returns {Array<{id: string, resources: Array}>}
 */
export const getSearchAnnotationsForWindow = createSelector(
  [
    getSearchForWindow,
    (state, { windowId }) => getManifestSearchService(state, { windowId })?.id,
    (state) => miradorSlice(state)[iiifContentSearchApiSlice.reducerPath],
  ],
  (searches, endpoint, apiState) => {
    if (!searches || !endpoint || !apiState) return EMPTY_ARRAY;

    const annotations = Object.values(searches)
      .map(({ query }) => {
        if (!query) return undefined;

        // same arg shape as useSearchResults, so it resolves to the same cache entry
        const { data } = iiifContentSearchApiSlice.endpoints.getIiifContentSearch.select({ endpoint, query })({
          [iiifContentSearchApiSlice.reducerPath]: apiState,
        });
        const resources = (data?.pages ?? []).flatMap((page) => new AnnotationList(page).resources);

        return { id: data?.pages?.[0]?.['@id'], resources };
      })
      .filter((a) => a && a.resources.length > 0);

    return annotations.length > 0 ? annotations : EMPTY_ARRAY;
  },
);

/**
 * Returns ids of selected content search annotations.
 * @param {object} state
 * @param {string} windowId
 * @returns {Array}
 */
export const getSelectedContentSearchAnnotationIds = createSelector(
  [getWindow, getSearchForCompanionWindow],
  (window, search) => (search && search.selectedContentSearchAnnotationIds) || [],
);

/**
 * Returns resource annotations for search hit.
 * @param {object} state
 * @param {string} windowId
 * @returns {Array}
 */
export const getResourceAnnotationForSearchHit = createSelector(
  [getSearchAnnotationsForCompanionWindow, (state, { annotationUri }) => annotationUri],
  (annotation, annotationUri) => annotation.resources.find((r) => r.id === annotationUri),
);

/**
 * Returns annotation label.
 * @param {object} state
 * @param {string} windowId
 * @returns {Array}
 */
export const getResourceAnnotationLabel = createSelector(
  [getResourceAnnotationForSearchHit, getManifestLocale],
  (resourceAnnotation, locale) => {
    if (!(resourceAnnotation && resourceAnnotation.resource && resourceAnnotation.resource.label)) return EMPTY_ARRAY;

    return PropertyValue.parse(resourceAnnotation.resource.label).getValues(locale);
  },
);

const getAnnotationById = createSelector(
  [getSearchAnnotationsForWindow, (state, { annotationId }) => annotationId],
  (annotations, annotationId) => {
    const resourceAnnotations = annotations.flatMap((a) => a.resources);
    return resourceAnnotations.find((r) => r.id === annotationId);
  },
);

/**
 * Returns annotation label.
 * @param {object} state
 * @param {string} windowId
 * @returns {Array}
 */
export const getCanvasForAnnotation = createSelector(
  [
    getAnnotationById,
    (state, { windowId }) =>
      (canvasId) =>
        getCanvas(state, { canvasId, windowId }),
  ],
  (annotation, getCanvasById) => {
    const canvasId = annotation && annotation.targetId;
    return canvasId && getCanvasById(canvasId);
  },
);
