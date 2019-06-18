import { createSelector } from 'reselect';
import { LanguageMap } from 'manifesto.js';
import flatten from 'lodash/flatten';
import Annotation from '../../lib/Annotation';
import { getWindow } from './windows';
import { getManifestLocale } from './manifests';

const getSearchForWindow = createSelector(
  [
    (state, { windowId }) => windowId,
    state => state.searches,
  ],
  (windowId, searches) => {
    if (!windowId || !searches) return {};

    return searches[windowId];
  },
);

const getSearchForCompanionWindow = createSelector(
  [
    getSearchForWindow,
    (state, { companionWindowId }) => companionWindowId,
  ],
  (results, companionWindowId) => {
    if (!results || !companionWindowId) return undefined;
    return results[companionWindowId];
  },
);

const getSearchResponsesForCompanionWindow = createSelector(
  [
    getSearchForCompanionWindow,
  ],
  (results) => {
    if (!results) return [];
    return Object.values(results.data);
  },
);

export const getSearchQuery = createSelector(
  [
    getSearchForCompanionWindow,
  ],
  results => results && results.query,
);

export const getSearchIsFetching = createSelector(
  [
    getSearchResponsesForCompanionWindow,
  ],
  results => results.some(result => result.isFetching),
);

export const getSearchHitsForCompanionWindow = createSelector(
  [
    getSearchResponsesForCompanionWindow,
  ],
  results => flatten(results.map((result) => {
    if (!result || !result.json || result.isFetching || !result.json.hits) return [];

    return result.json.hits;
  })),
);

/** convert search results to an annotation */
const searchResultsToAnnotation = (results) => {
  const annotations = results.map((result) => {
    if (!result || !result.json || result.isFetching || !result.json.resources) return undefined;
    const anno = new Annotation(result.json);
    return {
      id: anno.id,
      resources: anno.resources,
    };
  }).filter(a => a);

  return {
    id: (annotations.find(a => a.id) || {}).id,
    resources: flatten(annotations.map(a => a.resources)),
  };
};

export const getSearchAnnotationsForWindow = createSelector(
  [
    getSearchForWindow,
  ],
  (results) => {
    if (!results) return [];
    const data = Object.values(results).map(r => Object.values(r.data));

    return data.map(d => searchResultsToAnnotation(d)).filter(a => a.resources.length > 0);
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
    getSearchResponsesForCompanionWindow,
    (state, { annotationUri }) => annotationUri,
  ],
  (results, annotationUri) => searchResultsToAnnotation(results).resources.find(
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
