import omit from 'lodash/omit';
import ActionTypes from '../actions/action-types';

/**
 * searchPointersReducer
 *
 * Tracks, per windowId/companionWindowId, which search *identities*
 * (searchIds) are current -- not the fetched data itself, which lives in
 * the iiifApi cache keyed by searchId. A pointer's searchIds is a list
 * because pagination means multiple pages (searchIds) can be "current"
 * for one companion window at once.
 *
 * This reducer listens to the same REQUEST_SEARCH/REMOVE_SEARCH actions
 * as the legacy searchesReducer, which keeps running unchanged alongside
 * this one for the selectors/sagas that still depend on it
 * (getSearchAnnotationsForWindow, getCanvasForAnnotation, and the
 * jump-to-canvas-on-annotation-select feature in sagas/windows.js).
 * This would be cleaned up beyond a demo stage.
 */
export const searchPointersReducer = (state = {}, action) => {
  const pointer = (state[action.windowId] || {})[action.companionWindowId];

  switch (action.type) {
    case ActionTypes.REQUEST_SEARCH: {
      // appending (not replacing with a Set/object) means a repeat
      // REQUEST_SEARCH for a searchId already in this pointer -- e.g.
      // setWindowDefaultSearchQuery re-firing off a later UPDATE_WINDOW for
      // the same window -- must not duplicate it, or SearchResults ends up
      // rendering that page's hits/annotations twice (duplicate React keys).
      let searchIds;
      if (!pointer || pointer.query !== action.query) {
        searchIds = [action.searchId];
      } else if (pointer.searchIds.includes(action.searchId)) {
        searchIds = pointer.searchIds;
      } else {
        searchIds = [...pointer.searchIds, action.searchId];
      }

      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          [action.companionWindowId]: { query: action.query, searchIds },
        },
      };
    }
    case ActionTypes.REMOVE_SEARCH:
      if (!state[action.windowId]) return state;

      return {
        ...state,
        [action.windowId]: omit(state[action.windowId], action.companionWindowId),
      };
    case ActionTypes.IMPORT_MIRADOR_STATE:
      return {};
    case ActionTypes.REMOVE_WINDOW:
      return omit(state, action.windowId);
    case ActionTypes.REMOVE_COMPANION_WINDOW:
      if (!state[action.windowId]) return state;

      return {
        ...state,
        [action.windowId]: omit(state[action.windowId], action.id),
      };
    default:
      return state;
  }
};
