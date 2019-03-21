import fetch from 'node-fetch';
import ActionTypes from './action-types';

/**
 * requestAnnotation - action creator
 *
 * @param  {String} canvasId
 * @param  {String} annotationId
 * @memberof ActionCreators
 */
export function requestAnnotation(canvasId, annotationId) {
  return {
    annotationId,
    canvasId,
    type: ActionTypes.REQUEST_ANNOTATION,
  };
}

/**
 * receiveAnnotation - action creator
 *
 * @param  {String} canvasId
 * @param  {String} annotationId
 * @param  {Object} annotationJson
 * @memberof ActionCreators
 */
export function receiveAnnotation(canvasId, annotationId, annotationJson) {
  return {
    annotationId,
    annotationJson,
    canvasId,
    type: ActionTypes.RECEIVE_ANNOTATION,
  };
}

/**
 * receiveAnnotationFailure - action creator
 *
 * @param  {String} canvasId
 * @param  {String} annotationId
 * @param  {String} error
 * @memberof ActionCreators
 */
export function receiveAnnotationFailure(canvasId, annotationId, error) {
  return {
    annotationId,
    canvasId,
    error,
    type: ActionTypes.RECEIVE_ANNOTATION_FAILURE,
  };
}

/**
 * fetchAnnotation - action creator
 *
 * @param  {String} annotationId
 * @memberof ActionCreators
 */
export function fetchAnnotation(canvasId, annotationId) {
  return ((dispatch) => {
    dispatch(requestAnnotation(canvasId, annotationId));
    return fetch(annotationId)
      .then(response => response.json())
      .then(json => dispatch(receiveAnnotation(canvasId, annotationId, json)))
      .catch(error => dispatch(receiveAnnotationFailure(canvasId, annotationId, error)));
  });
}

/**
 * selectAnnotation - action creator
 *
 * @param  {String} windowId
 * @param  {String} canvasId
 * @param  {String} annotationId
 * @memberof ActionCreators
 */
export function selectAnnotation(windowId, canvasId, annotationId) {
  return {
    annotationId,
    canvasId,
    type: ActionTypes.SELECT_ANNOTATION,
    windowId,
  };
}

/**
 * deselectAnnotation - action creator
 *
 * @param  {String} windowId
 * @param  {String} canvasId
 * @param  {String} annotationId
 * @memberof ActionCreators
 */
export function deselectAnnotation(windowId, canvasId, annotationId) {
  return {
    annotationId,
    canvasId,
    type: ActionTypes.DESELECT_ANNOTATION,
    windowId,
  };
}

/**
 * toggleAnnotationDisplay - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function toggleAnnotationDisplay(windowId) {
  return {
    type: ActionTypes.TOGGLE_ANNOTATION_DISPLAY, windowId,
  };
}
