import { createSelector } from 'reselect';
import flatten from 'lodash/flatten';
import CanvasGroupings from '../../lib/CanvasGroupings';
import MiradorCanvas from '../../lib/MiradorCanvas';
import { miradorSlice } from './utils';
import { getWindow } from './getters';
import { getSequence } from './sequences';
import { getWindowViewType } from './windows';
/** */

export var selectInfoResponses = function selectInfoResponses(state) {
  return miradorSlice(state).infoResponses;
};
export var getCanvases = createSelector([getSequence], function (sequence) {
  return sequence && sequence.getCanvases() || [];
});
/**
* Return the canvas selected by an id
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {Object}
*/

export var getCanvas = createSelector([getSequence, function (state, _ref) {
  var canvasId = _ref.canvasId;
  return canvasId;
}], function (sequence, canvasId) {
  if (!sequence || !canvasId) return undefined;
  return sequence.getCanvasById(canvasId);
});
export var getCurrentCanvas = createSelector([getSequence, getWindow], function (sequence, window) {
  if (!sequence || !window) return undefined;
  if (!window.canvasId) return sequence.getCanvasByIndex(0);
  return sequence.getCanvasById(window.canvasId);
});
/** */

export var getVisibleCanvasIds = createSelector([getWindow], function (window) {
  return window && (window.visibleCanvases || window.canvasId && [window.canvasId]) || [];
});
/** */

export var getVisibleCanvases = createSelector([getVisibleCanvasIds, getCanvases], function (canvasIds, canvases) {
  return (canvases || []).filter(function (c) {
    return canvasIds.includes(c.id);
  });
});
/**
* Return the current canvases grouped by how they'll appear in the viewer
* For book view returns groups of 2, for single returns 1
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {Array}
*/

export var getCanvasGroupings = createSelector([getCanvases, getWindowViewType], function (canvases, view) {
  return canvases && new CanvasGroupings(canvases, view).groupings();
});
/**
* Return the current canvases selected in a window
* For book view returns 2, for single returns 1
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {Array}
*/

export var getCanvasGrouping = createSelector([getCanvasGroupings, function (state, _ref2) {
  var canvasId = _ref2.canvasId;
  return canvasId;
}], function (groupings, canvasId) {
  return groupings && groupings.find(function (group) {
    return group.some(function (c) {
      return c.id === canvasId;
    });
  }) || [];
});
/**
* Return the next canvas(es) for a window
* For book view returns 2, for single returns 1
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {Array}
*/

export var getNextCanvasGrouping = createSelector([getCanvasGroupings, getCurrentCanvas], function (groupings, canvas, view) {
  if (!groupings || !canvas) return undefined;
  var currentGroupIndex = groupings.findIndex(function (group) {
    return group.some(function (c) {
      return c.id === canvas.id;
    });
  });
  if (currentGroupIndex < 0 || currentGroupIndex + 1 >= groupings.length) return undefined;
  var newGroup = groupings[currentGroupIndex + 1];
  return newGroup;
});
/**
* Return the previous canvas(es) for a window
* For book view returns 2, for single returns 1
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {Array}
*/

export var getPreviousCanvasGrouping = createSelector([getCanvasGroupings, getCurrentCanvas], function (groupings, canvas, view) {
  if (!groupings || !canvas) return undefined;
  var currentGroupIndex = groupings.findIndex(function (group) {
    return group.some(function (c) {
      return c.id === canvas.id;
    });
  });
  if (currentGroupIndex < 1) return undefined;
  var newGroup = groupings[currentGroupIndex - 1];
  return newGroup;
});
/**
* Return canvas label, or alternatively return the given index + 1 to be displayed
* @param {object} canvas
* @return {String|Integer}
*/

export var getCanvasLabel = createSelector([getCanvas], function (canvas) {
  return canvas && (canvas.getLabel().length > 0 ? canvas.getLabel().getValue() : String(canvas.index + 1));
});
/**
* Return canvas description
* @param {object} canvas
* @param {String}
*/

export var getCanvasDescription = createSelector([getCanvas], function (canvas) {
  return canvas && canvas.getProperty('description');
});
export var getVisibleCanvasNonTiledResources = createSelector([getVisibleCanvases], function (canvases) {
  return flatten(canvases.map(function (canvas) {
    return new MiradorCanvas(canvas).imageResources;
  })).filter(function (resource) {
    return resource.getServices().length < 1;
  });
});
export var getVisibleCanvasVideoResources = createSelector([getVisibleCanvases], function (canvases) {
  return flatten(canvases.map(function (canvas) {
    return new MiradorCanvas(canvas).videoResources;
  }));
});
export var getVisibleCanvasCaptions = createSelector([getVisibleCanvases], function (canvases) {
  return flatten(canvases.map(function (canvas) {
    return new MiradorCanvas(canvas).vttContent;
  }));
});
export var getVisibleCanvasAudioResources = createSelector([getVisibleCanvases], function (canvases) {
  return flatten(canvases.map(function (canvas) {
    return new MiradorCanvas(canvas).audioResources;
  }));
});
export var selectInfoResponse = createSelector([function (state, _ref3) {
  var infoId = _ref3.infoId;
  return infoId;
}, getCanvas, selectInfoResponses], function (infoId, canvas, infoResponses) {
  var iiifServiceId = infoId;

  if (!infoId) {
    if (!canvas) return undefined;
    var miradorCanvas = new MiradorCanvas(canvas);
    var image = miradorCanvas.iiifImageResources[0];
    iiifServiceId = image && image.getServices()[0].id;
  }

  return iiifServiceId && infoResponses[iiifServiceId] && !infoResponses[iiifServiceId].isFetching && infoResponses[iiifServiceId];
});