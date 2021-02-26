"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSelectedAnnotationsOnCanvases = exports.getSelectedAnnotationId = exports.getAnnotationResourcesByMotivation = exports.getAnnotationResourcesByMotivationForCanvas = exports.getPresentAnnotationsOnSelectedCanvases = exports.getAnnotations = void 0;

var _reselect = require("reselect");

var _filter = _interopRequireDefault(require("lodash/filter"));

var _flatten = _interopRequireDefault(require("lodash/flatten"));

var _AnnotationFactory = _interopRequireDefault(require("../../lib/AnnotationFactory"));

var _utils = require("./utils");

var _canvases = require("./canvases");

var _config = require("./config");

var _getters = require("./getters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/** */
var getAnnotations = function getAnnotations(state) {
  return (0, _utils.miradorSlice)(state).annotations;
};

exports.getAnnotations = getAnnotations;
var getMotivation = (0, _reselect.createSelector)([_config.getConfig, function (state, _ref) {
  var motivations = _ref.motivations;
  return motivations;
}], function (config, motivations) {
  return motivations || config.annotations.filteredMotivations;
});
var getAnnotationsOnCanvas = (0, _reselect.createSelector)([_canvases.getCanvas, getAnnotations], function (canvas, annotations) {
  if (!annotations || !canvas) return [];
  if (!annotations[canvas.id]) return [];
  return (0, _flatten["default"])(Object.values(annotations[canvas.id]));
});
var getPresentAnnotationsCanvas = (0, _reselect.createSelector)([getAnnotationsOnCanvas], function (annotations) {
  return (0, _filter["default"])(Object.values(annotations).map(function (annotation) {
    return annotation && _AnnotationFactory["default"].determineAnnotation(annotation.json);
  }), function (annotation) {
    return annotation && annotation.present();
  });
});
var getAnnotationsOnSelectedCanvases = (0, _reselect.createSelector)([function (state, _ref2) {
  var canvasId = _ref2.canvasId,
      otherProps = _objectWithoutProperties(_ref2, ["canvasId"]);

  return canvasId ? [canvasId] : (0, _canvases.getVisibleCanvasIds)(state, otherProps);
}, getAnnotations], function (canvasIds, annotations) {
  if (!annotations || canvasIds.length === 0) return [];
  return (0, _flatten["default"])(canvasIds.map(function (targetId) {
    return annotations[targetId] && Object.values(annotations[targetId]);
  }));
});
var getPresentAnnotationsOnSelectedCanvases = (0, _reselect.createSelector)([getAnnotationsOnSelectedCanvases], function (annotations) {
  return (0, _filter["default"])(Object.values(annotations).map(function (annotation) {
    return annotation && _AnnotationFactory["default"].determineAnnotation(annotation.json);
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

exports.getPresentAnnotationsOnSelectedCanvases = getPresentAnnotationsOnSelectedCanvases;
var getAnnotationResourcesByMotivationForCanvas = (0, _reselect.createSelector)([getPresentAnnotationsCanvas, getMotivation], function (annotations, motivations) {
  return (0, _filter["default"])((0, _flatten["default"])(annotations.map(function (annotation) {
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

exports.getAnnotationResourcesByMotivationForCanvas = getAnnotationResourcesByMotivationForCanvas;
var getAnnotationResourcesByMotivation = (0, _reselect.createSelector)([getPresentAnnotationsOnSelectedCanvases, getMotivation], function (annotations, motivations) {
  return (0, _filter["default"])((0, _flatten["default"])(annotations.map(function (annotation) {
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

exports.getAnnotationResourcesByMotivation = getAnnotationResourcesByMotivation;
var getSelectedAnnotationId = (0, _reselect.createSelector)([_getters.getWindow], function (_ref3) {
  var selectedAnnotationId = _ref3.selectedAnnotationId;
  return selectedAnnotationId;
});
exports.getSelectedAnnotationId = getSelectedAnnotationId;
var getSelectedAnnotationsOnCanvases = (0, _reselect.createSelector)([getPresentAnnotationsOnSelectedCanvases, getSelectedAnnotationId], function (canvasAnnotations, selectedAnnotationId) {
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
exports.getSelectedAnnotationsOnCanvases = getSelectedAnnotationsOnCanvases;