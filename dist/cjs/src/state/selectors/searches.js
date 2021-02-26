"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortSearchAnnotationsByCanvasOrder = sortSearchAnnotationsByCanvasOrder;
exports.getCanvasForAnnotation = exports.getResourceAnnotationLabel = exports.getResourceAnnotationForSearchHit = exports.getSelectedContentSearchAnnotationIds = exports.getSearchAnnotationsForWindow = exports.getSortedSearchAnnotationsForCompanionWindow = exports.getSearchAnnotationsForCompanionWindow = exports.getSortedSearchHitsForCompanionWindow = exports.getNextSearchId = exports.getSearchIsFetching = exports.getSearchQuery = exports.getSearchForWindow = void 0;

var _reselect = require("reselect");

var _PropertyValue = require("manifesto.js/dist-esmodule/PropertyValue");

var _flatten = _interopRequireDefault(require("lodash/flatten"));

var _AnnotationList = _interopRequireDefault(require("../../lib/AnnotationList"));

var _canvases = require("./canvases");

var _getters = require("./getters");

var _manifests = require("./manifests");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/** Get searches from state */
var getSearches = function getSearches(state) {
  return (0, _utils.miradorSlice)(state).searches;
};

var getSearchForWindow = (0, _reselect.createSelector)([function (state, _ref) {
  var windowId = _ref.windowId;
  return windowId;
}, getSearches], function (windowId, searches) {
  if (!windowId || !searches) return {};
  return searches[windowId];
});
exports.getSearchForWindow = getSearchForWindow;
var getSearchForCompanionWindow = (0, _reselect.createSelector)([getSearchForWindow, function (state, _ref2) {
  var companionWindowId = _ref2.companionWindowId;
  return companionWindowId;
}], function (results, companionWindowId) {
  if (!results || !companionWindowId) return undefined;
  return results[companionWindowId];
});
var getSearchResponsesForCompanionWindow = (0, _reselect.createSelector)([getSearchForCompanionWindow], function (results) {
  if (!results) return [];
  return Object.values(results.data);
});
var getSearchQuery = (0, _reselect.createSelector)([getSearchForCompanionWindow], function (results) {
  return results && results.query;
});
exports.getSearchQuery = getSearchQuery;
var getSearchIsFetching = (0, _reselect.createSelector)([getSearchResponsesForCompanionWindow], function (results) {
  return results.some(function (result) {
    return result.isFetching;
  });
});
exports.getSearchIsFetching = getSearchIsFetching;
var getNextSearchId = (0, _reselect.createSelector)([getSearchForCompanionWindow], function (results) {
  if (!results || !results.data) return undefined;
  var resultWithAnUnresolvedNext = Object.values(results.data).find(function (result) {
    return !result.isFetching && result.json && result.json.next && !results.data[result.json.next];
  });
  return resultWithAnUnresolvedNext && resultWithAnUnresolvedNext.json && resultWithAnUnresolvedNext.json.next;
});
exports.getNextSearchId = getNextSearchId;
var getSearchHitsForCompanionWindow = (0, _reselect.createSelector)([getSearchResponsesForCompanionWindow], function (results) {
  return (0, _flatten["default"])(results.map(function (result) {
    if (!result || !result.json || result.isFetching || !result.json.hits) return [];
    return result.json.hits;
  }));
});
var getSortedSearchHitsForCompanionWindow = (0, _reselect.createSelector)([getSearchHitsForCompanionWindow, _canvases.getCanvases, function (state, _ref3) {
  var companionWindowId = _ref3.companionWindowId,
      windowId = _ref3.windowId;
  return function (annotationUri) {
    return getResourceAnnotationForSearchHit(state, {
      annotationUri: annotationUri,
      companionWindowId: companionWindowId,
      windowId: windowId
    });
  };
}], function (searchHits, canvases, annotationForSearchHit) {
  if (!canvases || canvases.length === 0) return [];
  if (!searchHits || searchHits.length === 0) return [];
  var canvasIds = canvases.map(function (canvas) {
    return canvas.id;
  });
  return [].concat(searchHits).sort(function (a, b) {
    var hitA = annotationForSearchHit(a.annotations[0]);
    var hitB = annotationForSearchHit(b.annotations[0]);
    return canvasIds.indexOf(hitA.targetId) - canvasIds.indexOf(hitB.targetId);
  });
});
/** convert search results to an annotation */

exports.getSortedSearchHitsForCompanionWindow = getSortedSearchHitsForCompanionWindow;

var searchResultsToAnnotation = function searchResultsToAnnotation(results) {
  var annotations = results.map(function (result) {
    if (!result || !result.json || result.isFetching || !result.json.resources) return undefined;
    var anno = new _AnnotationList["default"](result.json);
    return {
      id: anno.id,
      resources: anno.resources
    };
  }).filter(Boolean);
  return {
    id: (annotations.find(function (a) {
      return a.id;
    }) || {}).id,
    resources: (0, _flatten["default"])(annotations.map(function (a) {
      return a.resources;
    }))
  };
};

var getSearchAnnotationsForCompanionWindow = (0, _reselect.createSelector)([getSearchResponsesForCompanionWindow], function (results) {
  return results && searchResultsToAnnotation(results);
});
/** */

exports.getSearchAnnotationsForCompanionWindow = getSearchAnnotationsForCompanionWindow;

function sortSearchAnnotationsByCanvasOrder(searchAnnotations, canvases) {
  if (!searchAnnotations || !searchAnnotations.resources || searchAnnotations.length === 0) return [];
  if (!canvases || canvases.length === 0) return [];
  var canvasIds = canvases.map(function (canvas) {
    return canvas.id;
  });
  return [].concat(searchAnnotations.resources).sort(function (annoA, annoB) {
    return canvasIds.indexOf(annoA.targetId) - canvasIds.indexOf(annoB.targetId);
  });
}

var getSortedSearchAnnotationsForCompanionWindow = (0, _reselect.createSelector)([getSearchAnnotationsForCompanionWindow, _canvases.getCanvases], function (searchAnnotations, canvases) {
  return sortSearchAnnotationsByCanvasOrder(searchAnnotations, canvases);
});
exports.getSortedSearchAnnotationsForCompanionWindow = getSortedSearchAnnotationsForCompanionWindow;
var getSearchAnnotationsForWindow = (0, _reselect.createSelector)([getSearchForWindow], function (results) {
  if (!results) return [];
  var data = Object.values(results).map(function (r) {
    return Object.values(r.data);
  });
  return data.map(function (d) {
    return searchResultsToAnnotation(d);
  }).filter(function (a) {
    return a.resources.length > 0;
  });
});
exports.getSearchAnnotationsForWindow = getSearchAnnotationsForWindow;
var getSelectedContentSearchAnnotationIds = (0, _reselect.createSelector)([_getters.getWindow, getSearchForCompanionWindow], function (window, search) {
  return search && search.selectedContentSearchAnnotationIds || [];
});
exports.getSelectedContentSearchAnnotationIds = getSelectedContentSearchAnnotationIds;
var getResourceAnnotationForSearchHit = (0, _reselect.createSelector)([getSearchAnnotationsForCompanionWindow, function (state, _ref4) {
  var annotationUri = _ref4.annotationUri;
  return annotationUri;
}], function (annotation, annotationUri) {
  return annotation.resources.find(function (r) {
    return r.id === annotationUri;
  });
});
exports.getResourceAnnotationForSearchHit = getResourceAnnotationForSearchHit;
var getResourceAnnotationLabel = (0, _reselect.createSelector)([getResourceAnnotationForSearchHit, _manifests.getManifestLocale], function (resourceAnnotation, locale) {
  if (!(resourceAnnotation && resourceAnnotation.resource && resourceAnnotation.resource.label)) return [];
  return _PropertyValue.PropertyValue.parse(resourceAnnotation.resource.label, locale).getValues();
});
exports.getResourceAnnotationLabel = getResourceAnnotationLabel;
var getAnnotationById = (0, _reselect.createSelector)([getSearchAnnotationsForWindow, function (state, _ref5) {
  var annotationId = _ref5.annotationId;
  return annotationId;
}], function (annotations, annotationId) {
  var resourceAnnotations = (0, _flatten["default"])(annotations.map(function (a) {
    return a.resources;
  }));
  return resourceAnnotations.find(function (r) {
    return r.id === annotationId;
  });
});
var getCanvasForAnnotation = (0, _reselect.createSelector)([getAnnotationById, function (state, _ref6) {
  var windowId = _ref6.windowId;
  return function (canvasId) {
    return (0, _canvases.getCanvas)(state, {
      canvasId: canvasId,
      windowId: windowId
    });
  };
}], function (annotation, getCanvasById) {
  var canvasId = annotation && annotation.targetId;
  return canvasId && getCanvasById(canvasId);
});
exports.getCanvasForAnnotation = getCanvasForAnnotation;