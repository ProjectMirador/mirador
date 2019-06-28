import ActionTypes from './action-types';
import {
  getSelectedCanvases,
  getSearchAnnotationsForCompanionWindow,
  getSearchForWindow,
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

    const canvasIds = getSelectedCanvases(state, { canvasIndex, windowId }).map(c => c.id);
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
      canvasIndex,
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
