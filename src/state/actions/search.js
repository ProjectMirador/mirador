import ActionTypes from './action-types';

/**
 * requestSearch - action creator
 *
 * @param  {String} windowId
 * @param  {String} companionWindowId
 * @param  {String} query
 * @memberof ActionCreators
 */
export function requestSearch(windowId, companionWindowId, query) {
  return {
    companionWindowId,
    query,
    type: ActionTypes.REQUEST_SEARCH,
    windowId,
  };
}
