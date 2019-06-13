import { createSelector } from 'reselect';
import Annotation from '../../lib/Annotation';
import { getWindow } from './windows';

export const getSearchResultsForWindow = createSelector(
  [
    (state, { windowId }) => windowId,
    state => state.searches,
  ],
  (windowId, searches) => {
    if (!windowId || !searches) return [];

    return searches && searches[windowId];
  },
);

export const getSearchResultsForCompanionWindow = createSelector(
  [
    getSearchResultsForWindow,
    (state, { companionWindowId }) => companionWindowId,
  ],
  (results, companionWindowId) => {
    if (!results || !companionWindowId) return {};
    return results && results[companionWindowId];
  },
);

export const getSearchHitsForCompanionWindow = createSelector(
  [
    getSearchResultsForCompanionWindow,
  ],
  (result) => {
    if (!result || !result.json || result.isFetching || !result.json.hits) return [];
    return result.json.hits;
  },
);

/** convert search results to an annotation */
const searchResultsToAnnotation = (result) => {
  if (!result || !result.json || result.isFetching || !result.json.resources) return undefined;
  const anno = new Annotation(result.json);
  return {
    id: anno.id,
    resources: anno.resources,
  };
};

export const getSearchAnnotationsForCompanionWindow = createSelector(
  [
    getSearchResultsForCompanionWindow,
  ],
  result => searchResultsToAnnotation(result),
);

export const getSearchAnnotationsForWindow = createSelector(
  [
    getSearchResultsForWindow,
  ],
  (results) => {
    if (!results) return [];
    const arr = Object.values(results).map(result => searchResultsToAnnotation(result));
    return arr.filter(e => e);
  },
);

export const getSelectedContentSearchAnnotationIds = createSelector(
  [
    getWindow,
  ],
  window => (window && window.selectedContentSearchAnnotation) || [],
);


export const getSelectedContentSearchAnnotations = createSelector(
  [
    getSearchAnnotationsForWindow,
    getSelectedContentSearchAnnotationIds,
  ],
  (searchAnnotations, selectedAnnotationIds) => searchAnnotations.map(annotation => ({
    id: (annotation['@id'] || annotation.id),
    resources: annotation.resources.filter(
      r => selectedAnnotationIds && selectedAnnotationIds.includes(r.id),
    ),
  })).filter(val => val.resources.length > 0),
);
