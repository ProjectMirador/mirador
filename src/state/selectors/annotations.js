import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import Annotation from '../../lib/Annotation';
import { getSelectedCanvases } from './canvases';

const getAnnotationsOnSelectedCanvases = createSelector(
  [
    getSelectedCanvases,
    state => state.annotations,
  ],
  (canvases, annotations) => {
    if (!annotations || !canvases) return [];
    return flatten(
      canvases.map(c => c.id).map(
        targetId => annotations[targetId] && Object.values(annotations[targetId]),
      ),
    );
  },
);

const getPresentAnnotationsOnSelectedCanvases = createSelector(
  [
    getAnnotationsOnSelectedCanvases,
  ],
  annotations => filter(
    Object.values(annotations).map(annotation => annotation && new Annotation(annotation.json)),
    annotation => annotation && annotation.present(),
  ),
);

/**
* Return an array of annotation resources filtered by the given motivation
* @param {Array} annotations
* @param {Array} motivations
* @return {Array}
*/
export const getAnnotationResourcesByMotivation = createSelector(
  [
    getPresentAnnotationsOnSelectedCanvases,
    (state, { motivations }) => motivations,
  ],
  (annotations, motivations) => filter(
    flatten(annotations.map(annotation => annotation.resources)),
    resource => resource.motivations.some(
      motivation => motivations.includes(motivation),
    ),
  ),
);

/**
 * Return the selected annotations IDs of a given CanvasId
 * @param {Object} state
 * @param {String} windowId
 * @param {Array} targetIds
 * @return {Array}
 */
export const getSelectedAnnotationIds = createSelector(
  [
    (state, { windowId }) => state.windows[windowId].selectedAnnotations,
    getSelectedCanvases,
  ],
  (selectedAnnotations, canvases) => (
    flatten(
      canvases.map(c => c.id).map(targetId => selectedAnnotations && selectedAnnotations[targetId]),
    )
  ),
);

export const getSelectedAnnotationsOnCanvases = createSelector(
  [
    getPresentAnnotationsOnSelectedCanvases,
    getSelectedAnnotationIds,
  ],
  (canvasAnnotations, selectedAnnotationIds) => canvasAnnotations.map(annotation => ({
    id: (annotation['@id'] || annotation.id),
    resources: annotation.resources.filter(
      r => selectedAnnotationIds && selectedAnnotationIds.includes(r.id),
    ),
  })).filter(val => val.resources.length > 0),
);

export const getHighlightedAnnotationsOnCanvases = createSelector(
  [
    getPresentAnnotationsOnSelectedCanvases,
    (state, { windowId }) => state.windows[windowId].highlightedAnnotation,
    (state, { windowId }) => state.windows[windowId].displayAllAnnotations,
  ],
  (canvasAnnotations, highlightedAnnotation, displayAllAnnotations) => {
    if (displayAllAnnotations) return canvasAnnotations;
    if (highlightedAnnotation) {
      return canvasAnnotations.map(annotation => ({
        id: (annotation['@id'] || annotation.id),
        resources: annotation.resources.filter(
          r => highlightedAnnotation && highlightedAnnotation === r.id,
        ),
      })).filter(val => val.resources.length > 0);
    }
    return [];
  },
);
