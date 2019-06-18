import { createSelector } from 'reselect';
import { LanguageMap } from 'manifesto.js';
import Annotation from '../../lib/Annotation';
import { getWindow } from './windows';
import { getManifestLocale } from './manifests';

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

export const getSearchQuery = createSelector(
  [
    getSearchResultsForCompanionWindow,
  ],
  results => results && results.query,
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

export const getSearchAnnotationForCompanionWindow = createSelector(
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

export const getResourceAnnotationForSearchHit = createSelector(
  [
    getSearchAnnotationForCompanionWindow,
    (state, { annotationUri }) => annotationUri,
  ],
  (searchAnnotations, annotationUri) => searchAnnotations.resources.find(
    r => r.id === annotationUri,
  ),
);

export const getResourceAnnotationLabel = createSelector(
  [
    getResourceAnnotationForSearchHit,
    getManifestLocale,
  ],
  (resourceAnnotation, locale) => {
    if (
      !(resourceAnnotation && resourceAnnotation.resource && resourceAnnotation.resource.label)
    ) return [];

    return LanguageMap.parse(resourceAnnotation.resource.label, locale).map(label => label.value);
  },
);
