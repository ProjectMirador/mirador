import { createSelector } from 'reselect';
import { PropertyValue } from 'manifesto.js';
import AnnotationList from '../../lib/AnnotationList';
import { getCanvas, getCanvases } from './canvases';
import { getWindow } from './getters';
import { getManifestLocale } from './manifests';
import { miradorSlice, EMPTY_ARRAY, EMPTY_OBJECT } from './utils';
import { iiifApi } from '../api/iiifApi';
import { getCompanionWindow, getCompanionWindowsForContent } from '../selectors';

/**
 *  Get searches from state.
 */
const getSearches = (state) => miradorSlice(state).searches;

/**
 * Returns the search result for a specific window.
 * @param {object} state
 * @param {string} windowId
 * @returns {object}
 */
export const getSearchForWindow = createSelector([(state, { windowId }) => windowId, getSearches], (windowId, searches) => {
  if (!windowId || !searches) return EMPTY_OBJECT;

  return searches[windowId];
});

/**
 * Returns the search result for a specific window.
 * @param {object} state
 * @param {string} windowId
 * @returns {object}
 */
export const getSearchResponeForWindow = (state, { windowId }) => {
  const searchCompanionWindows = getCompanionWindowsForContent(state, { content: 'search', windowId });
  const searches = (searchCompanionWindows || [])
    .map((companionWindow) => [
      companionWindow.id,
      getSearchResponseForCompanionWindow(state, { windowId, companionWindowId: companionWindow.id }),
    ])
    .filter(([, search]) => search !== undefined);

  return Object.fromEntries(searches);
}

/**
 * Returns the search result for a specific companion window.
 * @param {object} state
 * @param {string} companionWindowId
 * @returns {object|undefined}
 */
const getSearchForCompanionWindow = createSelector(
  [getSearchForWindow, (state, { companionWindowId }) => companionWindowId],
  (results, companionWindowId) => {
    if (!results || !companionWindowId) return undefined;
    return results[companionWindowId];
  },
);

/**
 * Returns the search result for a specific companion window.
 * @param {object} state
 * @param {string} companionWindowId
 * @returns {object|undefined}
 */
export const getSearchResponseForCompanionWindow = (state, { windowId, companionWindowId }) => {
  const query = getCompanionWindow(state, { companionWindowId })?.query;
  if (!windowId || !companionWindowId || !query) return undefined;
  const rootState = miradorSlice(state);
  if (!rootState[iiifApi.reducerPath]) return undefined;
  const args = iiifApi.util
  .selectCachedArgsForQuery(rootState, 'getSearchResponse')
  .filter((arg) => arg.windowId === windowId && arg.companionWindowId === companionWindowId && arg.query === query);
  if (args.length === 0) return undefined;
  return {
    data: Object.fromEntries(
      args.map((arg) => {
        const { data, isLoading, isError, error } = iiifApi.endpoints.getSearchResponse.select(arg)(rootState);
        return [arg.searchId, { isFetching: isLoading, ...(isError ? { error: error?.data ?? error } : { json: data }) }];
      }),
    ),
    query,
  };
};


/**
 * Returns an array of search responses for a specific companion window.
 * @param {object} state
 * @returns {Array}
 */
const getSearchResponsesForCompanionWindow = createSelector([getSearchResponseForCompanionWindow], (results) => {
  if (!results) return EMPTY_ARRAY;
  return Object.values(results.data);
});

/**
 * Returns the search query for a specific companion window.
 * @param {object} state
 * @param {string} windowId
 * @returns {string|undefined}
 */
export const getSearchQuery = createSelector([getSearchResponseForCompanionWindow], (results) => results && results.query);

/**
 * Returns if search response for a companion window is fetching.
 * @param {object} state
 * @returns {boolean}
 */
export const getSearchIsFetching = createSelector([getSearchResponsesForCompanionWindow], (results) =>
  results.some((result) => result.isFetching)
);

/**
 * Returns the total number of search results for a companion window.
 * @param {object} state
 * @param {string} windowId
 * @returns {number|undefined}
 */
export const getSearchNumTotal = createSelector([getSearchResponseForCompanionWindow], (results) => {
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
export const getNextSearchId = createSelector([getSearchResponseForCompanionWindow], (results) => {
  if (!results || !results.data) return undefined;

  const resultWithAnUnresolvedNext = Object.values(results.data).find(
    (result) => !result.isFetching && result.json && result.json.next && !results.data[result.json.next],
  );

  return resultWithAnUnresolvedNext && resultWithAnUnresolvedNext.json && resultWithAnUnresolvedNext.json.next;
});

const getSearchHitsForCompanionWindow = createSelector([getSearchResponsesForCompanionWindow], (results) =>
  results.flatMap((result) => (result?.json && !result.isFetching && result.json.hits) || EMPTY_ARRAY),
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
 * Returns sorted search annotations for window.
 * @param {object} state
 * @param {string} windowId
 * @returns {Array}
 */
export const getSearchAnnotationsForWindow = createSelector([getSearchResponeForWindow], (results) => {
  if (!results) return EMPTY_OBJECT;
  const data = Object.values(results).map((r) => Object.values(r.data));

  return data.map((d) => searchResultsToAnnotation(d)).filter((a) => a.resources.length > 0);
});

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
