function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import AnnotationFactory from '../../lib/AnnotationFactory';
import { miradorSlice } from './utils';
import { getCanvas, getVisibleCanvasIds } from './canvases';
import { getConfig } from './config';
import { getWindow } from './getters';
/** */

export var getAnnotations = function getAnnotations(state) {
  return miradorSlice(state).annotations;
};
var getMotivation = createSelector([getConfig, function (state, _ref) {
  var motivations = _ref.motivations;
  return motivations;
}], function (config, motivations) {
  return motivations || config.annotations.filteredMotivations;
});
var getAnnotationsOnCanvas = createSelector([getCanvas, getAnnotations], function (canvas, annotations) {
  if (!annotations || !canvas) return [];
  if (!annotations[canvas.id]) return [];
  return flatten(Object.values(annotations[canvas.id]));
});
var getPresentAnnotationsCanvas = createSelector([getAnnotationsOnCanvas], function (annotations) {
  return filter(Object.values(annotations).map(function (annotation) {
    return annotation && AnnotationFactory.determineAnnotation(annotation.json);
  }), function (annotation) {
    return annotation && annotation.present();
  });
});
var getAnnotationsOnSelectedCanvases = createSelector([function (state, _ref2) {
  var canvasId = _ref2.canvasId,
      otherProps = _objectWithoutProperties(_ref2, ["canvasId"]);

  return canvasId ? [canvasId] : getVisibleCanvasIds(state, otherProps);
}, getAnnotations], function (canvasIds, annotations) {
  if (!annotations || canvasIds.length === 0) return [];
  return flatten(canvasIds.map(function (targetId) {
    return annotations[targetId] && Object.values(annotations[targetId]);
  }));
});
export var getPresentAnnotationsOnSelectedCanvases = createSelector([getAnnotationsOnSelectedCanvases], function (annotations) {
  return filter(Object.values(annotations).map(function (annotation) {
    return annotation && AnnotationFactory.determineAnnotation(annotation.json);
  }), function (annotation) {
    return annotation && annotation.present();
  });
});
/**
* Return an array of annotation resources filtered by the given motivation for a particular canvas
* @param {Array} annotations
* @param {Array} motivations
* @return {Array}
*/

export var getAnnotationResourcesByMotivationForCanvas = createSelector([getPresentAnnotationsCanvas, getMotivation], function (annotations, motivations) {
  return filter(flatten(annotations.map(function (annotation) {
    return annotation.resources;
  })), function (resource) {
    return resource.motivations.some(function (motivation) {
      return motivations.includes(motivation);
    });
  });
});
/**
* Return an array of annotation resources filtered by the given motivation
* @param {Array} annotations
* @param {Array} motivations
* @return {Array}
*/

export var getAnnotationResourcesByMotivation = createSelector([getPresentAnnotationsOnSelectedCanvases, getMotivation], function (annotations, motivations) {
  return filter(flatten(annotations.map(function (annotation) {
    return annotation.resources;
  })), function (resource) {
    return resource.motivations.some(function (motivation) {
      return motivations.includes(motivation);
    });
  });
});
/**
 * Return the selected annotations IDs of a given CanvasId
 * @param {Object} state
 * @param {String} windowId
 * @param {Array} targetIds
 * @return {Array}
 */

export var getSelectedAnnotationId = createSelector([getWindow], function (_ref3) {
  var selectedAnnotationId = _ref3.selectedAnnotationId;
  return selectedAnnotationId;
});
export var getSelectedAnnotationsOnCanvases = createSelector([getPresentAnnotationsOnSelectedCanvases, getSelectedAnnotationId], function (canvasAnnotations, selectedAnnotationId) {
  return canvasAnnotations.map(function (annotation) {
    return {
      id: annotation['@id'] || annotation.id,
      resources: annotation.resources.filter(function (r) {
        return selectedAnnotationId === r.id;
      })
    };
  }).filter(function (val) {
    return val.resources.length > 0;
  });
});