import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import Annotation from '../../lib/Annotation';

export * from './canvases';
export * from './manifests';
export * from './windows';

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
    content: resource.chars,
    id: resource.id,
    targetId: resource.targetId,
  }));
}

/**
* Return languages from config (in state) and indicate which is currently set
* @param {object} state
* @return {Array} [ {locale: 'de', label: 'Deutsch', current: true}, ... ]
*/
export function getLanguagesFromConfigWithCurrent(state) {
  const { availableLanguages, language } = state.config;

  return Object.keys(availableLanguages).map(key => ({
    current: key === language,
    label: availableLanguages[key],
    locale: key,
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

/**
* Return all of the given canvases annotations if the window
* is set to display all, otherwise only return selected
* @param {object} state
* @param {String} windowId
* @param {Array} targetIds
* @param {Array} annotationIds
* @return {Array}
*/
export function getAllOrSelectedAnnotations(state, windowId, targetIds, annotationIds) {
  if (state.windows[windowId].displayAllAnnotations) {
    return getSelectedTargetsAnnotations(state, targetIds);
  }

  return getSelectedTargetAnnotationResources(state, targetIds, annotationIds);
}
