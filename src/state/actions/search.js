import fetch from 'isomorphic-unfetch';
import {
  getCanvasForAnnotation,
  getCanvas,
  getCanvases,
  sortSearchAnnotationsByCanvasOrder,
  getSelectedContentSearchAnnotationIds,
} from '../selectors';
import ActionTypes from './action-types';
import AnnotationList from '../../lib/AnnotationList';

/**
 * requestSearch - action creator
 *
 * @param  {String} windowId
 * @param  {String} searchId
 * @param  {String} query
 * @memberof ActionCreators
 */
export function requestSearch(windowId, companionWindowId, searchId, query) {
  return {
    companionWindowId,
    query,
    searchId,
    type: ActionTypes.REQUEST_SEARCH,
    windowId,
  };
}

/**
 * receiveSearch - action creator
 *
 * @param  {String} windowId
 * @param  {String} searchId
 * @param  {Object} searchJson
 * @memberof ActionCreators
 */
export function receiveSearch(windowId, companionWindowId, searchId, searchJson) {
  return (dispatch, getState) => {
    const state = getState();
    const selectedIds = getSelectedContentSearchAnnotationIds(state, {
      companionWindowId, windowId,
    });
    let annotation;
    let canvas;

    if (selectedIds.length === 0) {
      const canvases = getCanvases(state, { windowId });
      annotation = sortSearchAnnotationsByCanvasOrder( // eslint-disable-line prefer-destructuring
        new AnnotationList(searchJson), canvases,
      )[0];
      canvas = annotation && getCanvas(state, {
        canvasId: annotation.targetId, windowId,
      });
    }

    dispatch({
      annotationId: annotation && annotation.id,
      canvasId: canvas && canvas.id,
      companionWindowId,
      searchId,
      searchJson,
      type: ActionTypes.RECEIVE_SEARCH,
      windowId,
    });
  };
}

/**
 * receiveSearchFailure - action creator
 *
 * @param  {String} windowId
 * @param  {String} searchId
 * @param  {String} error
 * @memberof ActionCreators
 */
export function receiveSearchFailure(windowId, companionWindowId, searchId, error) {
  return {
    companionWindowId,
    error,
    searchId,
    type: ActionTypes.RECEIVE_SEARCH_FAILURE,
    windowId,
  };
}

/**
 * removeSearch - action creator
 *
 * @param  {String} windowId
 * @param  {String} companionWindowId
 * @memberof ActionCreators
 */
export function removeSearch(windowId, companionWindowId) {
  return {
    companionWindowId,
    type: ActionTypes.REMOVE_SEARCH,
    windowId,
  };
}

/**
 * fetchSearch - action creator
 *
 * @param  {String} searchId
 * @param  {String} query
 * @memberof ActionCreators
 */
export function fetchSearch(windowId, companionWindowId, searchId, query) {
  return ((dispatch) => {
    dispatch(requestSearch(windowId, companionWindowId, searchId, query));
    return fetch(searchId)
      .then(response => response.json())
      .then(json => dispatch(receiveSearch(windowId, companionWindowId, searchId, json)))
      .catch(error => dispatch(receiveSearchFailure(windowId, companionWindowId, searchId, error)));
  });
}

/**
 * selectedContentSearchAnnotation - action creator
 *
 * @param  {String} windowId
 * @param  {String} annotationId
 * @memberof ActionCreators
 */
export function selectContentSearchAnnotation(windowId, companionWindowId, annotationIds) {
  return (dispatch, getState) => {
    const state = getState();
    const canvas = getCanvasForAnnotation(state, {
      annotationId: annotationIds[0], companionWindowId, windowId,
    });

    dispatch({
      annotationId: annotationIds,
      canvasId: canvas && canvas.id,
      companionWindowId,
      type: ActionTypes.SELECT_CONTENT_SEARCH_ANNOTATION,
      windowId,
    });
  };
}
