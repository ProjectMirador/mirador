import { createSelector } from 'reselect';
import { miradorSlice, EMPTY_OBJECT } from './utils';
import { getManifestSearchService } from './manifests';
import { iiifContentSearchApiSlice } from '../api/iiifContentSearchApiSlice';
import AnnotationResource from '../../lib/AnnotationResource';

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
const getSearchForWindow = createSelector([(state, { windowId }) => windowId, getSearches], (windowId, searches) => {
  if (!windowId || !searches) return EMPTY_OBJECT;

  return searches[windowId];
});

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
 * Returns the search query for a specific companion window.
 * @param {object} state
 * @param {string} windowId
 * @param {string} companionWindowId
 * @returns {string|undefined}
 */
export const getSearchQuery = createSelector([getSearchForCompanionWindow], (results) => results && results.query);

const getSearchQueriesForWindow = createSelector([getSearchForWindow], (results) =>
  results ? Object.values(results).map((r) => r.query) : [],
);

export const getSearchAnnotationsForWindow = createSelector(
  [getSearchQueriesForWindow, getManifestSearchService, (state) => state[iiifContentSearchApiSlice.reducerPath]],
  (queries, endpoint, state) => {
    return queries
      .flatMap((q) => {
        const data = iiifContentSearchApiSlice.endpoints.getIiifContentSearch.select({ endpoint: endpoint.id, query: q })({
          [iiifContentSearchApiSlice.reducerPath]: state,
        })?.data;

        return {
          id: data?.pages?.[0]?.id,
          resources: data?.pages?.[0]?.resources?.map((resource) => new AnnotationResource(resource)),
        };
      })
      .filter((a) => a.resources?.length > 0);
  },
);
