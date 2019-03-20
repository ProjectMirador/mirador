import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import Annotation from '../../lib/Annotation';

export * from './canvases';
export * from './manifests';
export * from './windows';

/**
* Return ids and labels of canvases
* @ param {Array} canvases
* @return {Array} - [ {id: 'id', label: 'label' }, ... ]
*/
export function getIdAndLabelOfCanvases(canvases) {
  return canvases.map((canvas, index) => ({
    id: canvas.id,
    label: getCanvasLabel(canvas, index),
  }));
}

/**
* Return annotations for an array of targets
* @param {object} state
* @param {Array} targets
* @return {Array}
*/
export function getSelectedTargetsAnnotations(state, targets) {
  const annotations = state.annotations
    && targets.map(target => getSelectedTargetAnnotations(state, target));
  if (!annotations) return [];

  return flatten(annotations);
}

/**
* Return a single target's annotations
* @param {object} state
* @param {String} target
* @return {Array}
*/
export function getSelectedTargetAnnotations(state, target) {
  const annotations = state.annotations && state.annotations[target];

  if (!annotations) return [];

  return filter(
    Object.keys(annotations).map(id => new Annotation(annotations[id].json, target)),
    annotation => annotation
                  && annotation.present(),
  );
}

/**
* Return an array of annotation resources filtered by the given motivation
* @param {Array} annotations
* @param {Array} motivations
* @return {Array}
*/
export function getAnnotationResourcesByMotivation(annotations, motivations) {
  const resources = flatten(annotations.map(annotation => annotation.resources));

  return filter(resources, resource => resource.motivations.some(
    motivation => motivations.includes(motivation),
  ));
}

/**
 * @param {Array} resources
 * @return {Array} [{ id: 'abc123', content: 'Annotation Content' }, ...]
 */
export function getIdAndContentOfResources(resources) {
  return resources.map((resource, i) => ({
    id: resource.id,
    targetId: resource.targetId,
    content: resource.chars,
  }));
}

/** */
function getWindow(state, { windowId }) {
  return state.windows && state.windows[windowId];
}

/** Return position of thumbnail navigation in a certain window.
* @param {object} state
* @param {String} windowId
* @param {String}
*/
export const getThumbnailNavigationPosition = createSelector(
  [
    getWindow,
    state => state.companionWindows,
  ],
  (window, companionWindows) => window
    && companionWindows[window.thumbnailNavigationId]
    && companionWindows[window.thumbnailNavigationId].position,
);

/** Return type of view in a certain window.
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @param {String}
*/
export const getWindowViewType = createSelector(
  [getWindow],
  window => window && window.view,
);

/**
* Return canvas label, or alternatively return the given index + 1 to be displayed
* @param {object} canvas
* @return {String|Integer}
*/
export function getCanvasLabel(canvas, canvasIndex) {
  if (!canvas) {
    return undefined;
  }
  if (canvas.getLabel().length > 0) {
    return canvas.getLabel().map(label => label.value)[0];
  }
  return String(canvasIndex + 1);
}

/**
* Return canvas description
* @param {object} canvas
* @param {String}
*/
export function getCanvasDescription(canvas) {
  return canvas
    && canvas.getProperty('description');
}

/**
* Return compantion window ids from a window
* @param {String} windowId
* @return {Array}
*/
export const getCompanionWindowIds = createSelector(
  [getWindow],
  window => (window && window.companionWindowIds) || [],
);

/**
 * Return companion windows of a window
 * @param {String} windowId
 * @return {Array}
 */
export const getCompanionWindowsOfWindow = createSelector(
  [getCompanionWindowIds, state => state.companionWindows],
  (companionWindowIds, companionWindows) => companionWindowIds.map(id => companionWindows[id]),
);

/**
* Return the companion window string from state in a given windowId and position
* @param {object} state
* @param {String} windowId
* @param {String} position
* @return {String}
*/
export const getCompanionWindowForPosition = createSelector(
  [getCompanionWindowsOfWindow, (state, { position }) => position],
  (companionWindows, position) => companionWindows.find(cw => cw.position === position),
);

/**
* Return languages from config (in state) and indicate which is currently set
* @param {object} state
* @return {Array} [ {locale: 'de', label: 'Deutsch', current: true}, ... ]
*/
export function getLanguagesFromConfigWithCurrent(state) {
  const { availableLanguages, language } = state.config;

  return Object.keys(availableLanguages).map(key => ({
    locale: key,
    label: availableLanguages[key],
    current: key === language,
  }));
}

/**
 * Return the selected annotations IDs of a given CanvasId
 * @param {Object} state
 * @param {String} windowId
 * @param {Array} targetIds
 * @return {Array}
 */
export function getSelectedAnnotationIds(state, windowId, targetIds) {
  return flatten(targetIds.map(targetId => state.windows[windowId].selectedAnnotations
     && state.windows[windowId].selectedAnnotations[targetId]));
}

/**
* Return the current canvas' (selected in a window) selected annotations
* @param {object} state
* @param {Array} targetIds
* @param {Array} annotationIds
* @return {Array}
*/
export function getSelectedTargetAnnotationResources(state, targetIds, annotationIds) {
  return getSelectedTargetsAnnotations(state, targetIds)
    .map(annotation => ({
      id: (annotation['@id'] || annotation.id),
      resources: annotation.resources.filter(r => annotationIds && annotationIds.includes(r.id)),
    }));
}
