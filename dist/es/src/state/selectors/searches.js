import { createSelector } from 'reselect';
import { PropertyValue } from 'manifesto.js/dist-esmodule/PropertyValue';
import flatten from 'lodash/flatten';
import AnnotationList from '../../lib/AnnotationList';
import { getCanvas, getCanvases } from './canvases';
import { getWindow } from './getters';
import { getManifestLocale } from './manifests';
import { miradorSlice } from './utils';
/** Get searches from state */

var getSearches = function getSearches(state) {
  return miradorSlice(state).searches;
};

export var getSearchForWindow = createSelector([function (state, _ref) {
  var windowId = _ref.windowId;
  return windowId;
}, getSearches], function (windowId, searches) {
  if (!windowId || !searches) return {};
  return searches[windowId];
});
var getSearchForCompanionWindow = createSelector([getSearchForWindow, function (state, _ref2) {
  var companionWindowId = _ref2.companionWindowId;
  return companionWindowId;
}], function (results, companionWindowId) {
  if (!results || !companionWindowId) return undefined;
  return results[companionWindowId];
});
var getSearchResponsesForCompanionWindow = createSelector([getSearchForCompanionWindow], function (results) {
  if (!results) return [];
  return Object.values(results.data);
});
export var getSearchQuery = createSelector([getSearchForCompanionWindow], function (results) {
  return results && results.query;
});
export var getSearchIsFetching = createSelector([getSearchResponsesForCompanionWindow], function (results) {
  return results.some(function (result) {
    return result.isFetching;
  });
});
export var getNextSearchId = createSelector([getSearchForCompanionWindow], function (results) {
  if (!results || !results.data) return undefined;
  var resultWithAnUnresolvedNext = Object.values(results.data).find(function (result) {
    return !result.isFetching && result.json && result.json.next && !results.data[result.json.next];
  });
  return resultWithAnUnresolvedNext && resultWithAnUnresolvedNext.json && resultWithAnUnresolvedNext.json.next;
});
var getSearchHitsForCompanionWindow = createSelector([getSearchResponsesForCompanionWindow], function (results) {
  return flatten(results.map(function (result) {
    if (!result || !result.json || result.isFetching || !result.json.hits) return [];
    return result.json.hits;
  }));
});
export var getSortedSearchHitsForCompanionWindow = createSelector([getSearchHitsForCompanionWindow, getCanvases, function (state, _ref3) {
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

var searchResultsToAnnotation = function searchResultsToAnnotation(results) {
  var annotations = results.map(function (result) {
    if (!result || !result.json || result.isFetching || !result.json.resources) return undefined;
    var anno = new AnnotationList(result.json);
    return {
      id: anno.id,
      resources: anno.resources
    };
  }).filter(Boolean);
  return {
    id: (annotations.find(function (a) {
      return a.id;
    }) || {}).id,
    resources: flatten(annotations.map(function (a) {
      return a.resources;
    }))
  };
};

export var getSearchAnnotationsForCompanionWindow = createSelector([getSearchResponsesForCompanionWindow], function (results) {
  return results && searchResultsToAnnotation(results);
});
/** */

export function sortSearchAnnotationsByCanvasOrder(searchAnnotations, canvases) {
  if (!searchAnnotations || !searchAnnotations.resources || searchAnnotations.length === 0) return [];
  if (!canvases || canvases.length === 0) return [];
  var canvasIds = canvases.map(function (canvas) {
    return canvas.id;
  });
  return [].concat(searchAnnotations.resources).sort(function (annoA, annoB) {
    return canvasIds.indexOf(annoA.targetId) - canvasIds.indexOf(annoB.targetId);
  });
}
export var getSortedSearchAnnotationsForCompanionWindow = createSelector([getSearchAnnotationsForCompanionWindow, getCanvases], function (searchAnnotations, canvases) {
  return sortSearchAnnotationsByCanvasOrder(searchAnnotations, canvases);
});
export var getSearchAnnotationsForWindow = createSelector([getSearchForWindow], function (results) {
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
export var getSelectedContentSearchAnnotationIds = createSelector([getWindow, getSearchForCompanionWindow], function (window, search) {
  return search && search.selectedContentSearchAnnotationIds || [];
});
export var getResourceAnnotationForSearchHit = createSelector([getSearchAnnotationsForCompanionWindow, function (state, _ref4) {
  var annotationUri = _ref4.annotationUri;
  return annotationUri;
}], function (annotation, annotationUri) {
  return annotation.resources.find(function (r) {
    return r.id === annotationUri;
  });
});
export var getResourceAnnotationLabel = createSelector([getResourceAnnotationForSearchHit, getManifestLocale], function (resourceAnnotation, locale) {
  if (!(resourceAnnotation && resourceAnnotation.resource && resourceAnnotation.resource.label)) return [];
  return PropertyValue.parse(resourceAnnotation.resource.label, locale).getValues();
});
var getAnnotationById = createSelector([getSearchAnnotationsForWindow, function (state, _ref5) {
  var annotationId = _ref5.annotationId;
  return annotationId;
}], function (annotations, annotationId) {
  var resourceAnnotations = flatten(annotations.map(function (a) {
    return a.resources;
  }));
  return resourceAnnotations.find(function (r) {
    return r.id === annotationId;
  });
});
export var getCanvasForAnnotation = createSelector([getAnnotationById, function (state, _ref6) {
  var windowId = _ref6.windowId;
  return function (canvasId) {
    return getCanvas(state, {
      canvasId: canvasId,
      windowId: windowId
    });
  };
}], function (annotation, getCanvasById) {
  var canvasId = annotation && annotation.targetId;
  return canvasId && getCanvasById(canvasId);
});