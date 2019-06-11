import { createSelector } from 'reselect';
import compact from 'lodash/compact';
import flatten from 'lodash/flatten';
import { getManifest } from './manifests';

export const getSearchResultsForManifest = createSelector(
  [
    getManifest,
    state => state.searches,
  ],
  (manifest, searches) => {
    if (!searches || !manifest) return [];
    if (!searches[manifest.id]) return [];

    return flatten(Object.values(searches[manifest.id]));
  },
);

export const getSearchHitsForManifest = createSelector(
  [
    getSearchResultsForManifest,
  ],
  searchResults => flatten(compact(searchResults.map((result) => {
    if (!result.json || result.isFetching || !result.json.hits) return null;
    return result.json.hits;
  }))),
);
