import flatten from 'lodash/flatten';
import ActionTypes from './action-types';
import {
  getCanvas,
  getSearchAnnotationsForWindow,
} from '../selectors';

/**
 * setCanvas - action creator
 *
 * @param  {String} windowId
 * @param  {Number} canvasIndex
 * @memberof ActionCreators
 */
export function setCanvas(windowId, canvasIndex) {
  return ((dispatch, getState) => {
    const state = getState();

    const annotations = getSearchAnnotationsForWindow(state, { windowId });
    const resourceAnnotations = flatten(annotations.map(a => a.resources));
    const canvas = getCanvas(state, { canvasIndex, windowId });
    const hitAnnotation = resourceAnnotations.find(r => r.targetId === canvas.id);

    const action = {
      canvasIndex,
      type: ActionTypes.SET_CANVAS,
      windowId,
    };

    if (hitAnnotation && hitAnnotation.id) {
      action.selectedContentSearchAnnotation = [hitAnnotation.id];
    }

    dispatch(action);
  });
}

/**
 *
 * @param windowId
 * @param payload
 * @returns {{payload: *, type: string, windowId: *}}
 */
export function updateViewport(windowId, payload) {
  return {
    payload,
    type: ActionTypes.UPDATE_VIEWPORT,
    windowId,
  };
}
