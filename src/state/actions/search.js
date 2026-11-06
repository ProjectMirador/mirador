import ActionTypes from './action-types';
import { selectAnnotation } from './annotation';
import { iiifContentSearchApiSlice } from '../api/iiifContentSearchApiSlice';
import { getCanvases, getManifestSearchService, getSearchQuery, getVisibleCanvasIds, getWindowConfig } from '../selectors';
import AnnotationResource from '../../lib/AnnotationResource';

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

/**
 * Thunk: Once results arrive, select the first result so the viewer moves to its canvas.
 *
 * The initiate() call shares the SearchPanel hook's cache entry ({ endpoint, query })
 * No second request is made;
 *
 * @param  {String} windowId
 * @param  {String} companionWindowId
 * @param  {String} query
 * @memberof ActionCreators
 */
export function searchAndShowFirstResult(windowId, companionWindowId, query) {
  return async (dispatch, getState) => {
    // Set Redux state at windowId > companionWindowId > query; unrelated to fetch or rtkq
    dispatch(requestSearch(windowId, companionWindowId, query));
    if (!query) return;

    const endpoint = getManifestSearchService(getState(), { windowId })?.id;
    if (!endpoint) return;

    const { data } = await dispatch(
      iiifContentSearchApiSlice.endpoints.getIiifContentSearch.initiate({ endpoint, query }, { subscribe: false }),
    );
    if (!data) return;
    // Make sure the query hasn't changed
    if (getSearchQuery(getState(), { companionWindowId, windowId }) !== query) return;

    // the result on the earliest canvas (sort is stable, so service order breaks ties)
    const canvasIds = getCanvases(getState(), { windowId }).map((canvas) => canvas.id);
    // TODO: we duplicate this same sort logic in the SearchPanel; extract?
    const sorted = data.pages
      .flatMap((page) => page?.resources ?? [])
      .map((resource) => new AnnotationResource(resource))
      .sort((a, b) => canvasIds.indexOf(a.targetId) - canvasIds.indexOf(b.targetId));

    // This is a user config.
    const { switchCanvasOnSearch } = getWindowConfig(getState(), { windowId });
    const visibleCanvasIds = getVisibleCanvasIds(getState(), { windowId });
    const [first] = switchCanvasOnSearch ? sorted : sorted.filter((a) => visibleCanvasIds.includes(a.targetId));
    if (!first) return;

    // no canvasId => setCanvasforSelectedAnnotation leaves the viewer where it is
    dispatch(selectAnnotation(windowId, first.id, switchCanvasOnSearch ? first.targetId : undefined, companionWindowId));
  };
}
