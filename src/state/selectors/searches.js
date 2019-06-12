import { createSelector } from 'reselect';
import { getManifest } from './manifests';
import Annotation from '../../lib/Annotation';

export const getSearchResultsForManifest = createSelector(
  [
    getManifest,
    (state, { companionWindowId }) => companionWindowId,
    state => state.searches,
  ],
  (manifest, companionWindowId, searches) => {
    if (!manifest || !companionWindowId) return null;

    return searches && searches[manifest.id] && searches[manifest.id][companionWindowId];
  },
);

export const getSearchHitsForManifest = createSelector(
  [
    getSearchResultsForManifest,
  ],
  (result) => {
    if (!result || !result.json || result.isFetching || !result.json.hits) return [];
    return result.json.hits;
  },
);

export const getSearchAnnotationsForManifest = createSelector(
  [
    getSearchResultsForManifest,
  ],
  (result) => {
    if (!result || !result.json || result.isFetching || !result.json.resources) return [];
    const anno = new Annotation(result.json);
    return [{
      id: anno.id,
      resources: anno.resources,
    }];
  },
);
