import ActionTypes from './action-types';
import {
  getCanvasGrouping,
  getNextCanvasGrouping,
  getPreviousCanvasGrouping,
  getSearchAnnotationsForCompanionWindow,
  getSearchForWindow,
} from '../selectors';

/**
 * setCanvas - action creator
 *
 * @param  {String} windowId
 * @param  {String} canvasId
 * @memberof ActionCreators
 */
export function setCanvas(windowId, canvasId) {
  return ((dispatch, getState) => {
    const state = getState();

    const canvasIds = getCanvasGrouping(state, { canvasId, windowId }).map(c => c.id);
    const searches = getSearchForWindow(state, { windowId }) || {};
    const annotationBySearch = Object.keys(searches).reduce((accumulator, companionWindowId) => {
      const annotations = getSearchAnnotationsForCompanionWindow(state, {
        companionWindowId, windowId,
      });
      const resourceAnnotations = annotations.resources;
      const hitAnnotation = resourceAnnotations.find(r => canvasIds.includes(r.targetId));

      if (hitAnnotation) accumulator[companionWindowId] = [hitAnnotation.id];

      return accumulator;
    }, {});

    const annotationIds = Object.values(annotationBySearch);

    const action = {
      canvasId: canvasIds && canvasIds[0],
      searches: annotationBySearch,
      type: ActionTypes.SET_CANVAS,
      windowId,
    };

    if (annotationIds.length > 0) {
      action.selectedContentSearchAnnotation = ( // eslint-disable-line prefer-destructuring
        annotationIds[0]
      );
    }

    dispatch(action);
  });
}

/** Set the window's canvas to the next canvas grouping */
export function setNextCanvas(windowId) {
  return ((dispatch, getState) => {
    const state = getState();
    const newGroup = getNextCanvasGrouping(state, { windowId });
    newGroup && dispatch(setCanvas(windowId, newGroup[0] && newGroup[0].id));
  });
}

/** Set the window's canvas to the previous canvas grouping */
export function setPreviousCanvas(windowId) {
  return ((dispatch, getState) => {
    const state = getState();

    const newGroup = getPreviousCanvasGrouping(state, { windowId });
    newGroup && dispatch(setCanvas(windowId, newGroup[0] && newGroup[0].id));
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
