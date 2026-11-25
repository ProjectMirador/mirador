import { createSelector } from 'reselect';
import AnnotationList from '../../lib/AnnotationList';
import { miradorSlice, EMPTY_ARRAY, EMPTY_OBJECT } from './utils';
import { iiifApi } from '../api/iiifApi';

/**
 * Returns the searchPointers slice of state
 * @param {object} state
 * @returns {object}
 */
const getSearchPointers = (state) => miradorSlice(state).searchPointers || EMPTY_OBJECT;

/**
 * Returns the search pointer (query + the searchIds that are current) for
 * a companion window.
 * @param {object} state
 * @param {string} windowId
 * @param {string} companionWindowId
 * @returns {object}
 */
export const getSearchPointer = createSelector(
  [getSearchPointers, (state, { windowId }) => windowId, (state, { companionWindowId }) => companionWindowId],
  (pointers, windowId, companionWindowId) => (pointers[windowId] || EMPTY_OBJECT)[companionWindowId] || EMPTY_OBJECT,
);

/**
 * Returns the cached iiifApi query result for every searchId in a
 * companion window's pointer, in page order.
 * @param {object} state
 * @param {string} windowId
 * @param {string} companionWindowId
 * @returns {Array}
 */
export function getSearchResponsesForPointer(state, { windowId, companionWindowId }) {
  const pointer = getSearchPointer(state, { companionWindowId, windowId });
  return (pointer.searchIds || EMPTY_ARRAY).map((searchId) => iiifApi.endpoints.getSearchResponse.select(searchId)(state));
}

/** convert search response pages into one merged annotation list, as the legacy searches.js selectors do */
function pagesToAnnotation(pages) {
  const annotations = pages
    .map((page) => page.data)
    .filter((json) => json && json.resources)
    .map((json) => {
      const anno = new AnnotationList(json);
      return { id: anno.id, resources: anno.resources };
    });

  return {
    id: (annotations.find((a) => a.id) || {}).id,
    resources: annotations.flatMap((a) => a.resources),
  };
}

/** true while any page of the current search is still in flight */
export function deriveSearchIsFetching(pages) {
  return pages.some((page) => page.isFetching);
}

/** total hit count, reported on whichever page's response carries it */
export function deriveSearchNumTotal(pages) {
  const pageWithTotal = pages.find((page) => !page.isFetching && page.data?.within?.total !== undefined);
  return pageWithTotal?.data?.within?.total;
}

/** the next page's searchId, if the last fetched page links to one we haven't fetched yet */
export function deriveNextSearchId(pointer, pages) {
  const fetchedIds = new Set(pointer.searchIds || EMPTY_ARRAY);
  const pageWithUnresolvedNext = pages.find((page) => !page.isFetching && page.data?.next && !fetchedIds.has(page.data.next));
  return pageWithUnresolvedNext?.data?.next;
}

/** search hits across all fetched pages, sorted into canvas order */
export function deriveSortedSearchHits(pages, canvases) {
  const hits = pages.flatMap((page) => (!page.isFetching && page.data?.hits) || EMPTY_ARRAY);
  if (!canvases || canvases.length === 0 || hits.length === 0) return EMPTY_ARRAY;

  const canvasIds = canvases.map((canvas) => canvas.id);
  const annotation = pagesToAnnotation(pages);

  return [...hits].sort((a, b) => {
    const hitA = annotation.resources.find((r) => r.id === a.annotations[0]);
    const hitB = annotation.resources.find((r) => r.id === b.annotations[0]);
    return canvasIds.indexOf(hitA.targetId) - canvasIds.indexOf(hitB.targetId);
  });
}

/** resource annotations across all fetched pages, sorted into canvas order */
export function deriveSortedSearchAnnotations(pages, canvases) {
  if (!canvases || canvases.length === 0) return EMPTY_ARRAY;

  const annotation = pagesToAnnotation(pages);
  const canvasIds = canvases.map((canvas) => canvas.id);

  return [...annotation.resources].sort((a, b) => canvasIds.indexOf(a.targetId) - canvasIds.indexOf(b.targetId));
}
