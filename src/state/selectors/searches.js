import { createSelector } from 'reselect';
import { getManifest } from './manifests';

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
