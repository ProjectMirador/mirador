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
    type: ActionTypes.REQUEST_ANNOTATION,
    canvasId,
    annotationId,
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
    type: ActionTypes.RECEIVE_ANNOTATION,
    canvasId,
    annotationId,
    annotationJson,
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
    type: ActionTypes.RECEIVE_ANNOTATION_FAILURE,
    canvasId,
    annotationId,
    error,
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
    type: ActionTypes.SELECT_ANNOTATION, windowId, canvasId, annotationId,
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
    type: ActionTypes.DESELECT_ANNOTATION, windowId, canvasId, annotationId,
  };
}
