import { createSelector } from 'reselect';
import union from 'lodash/union';
import { Utils } from 'manifesto.js';
import { getManifestTreeStructure } from './manifests';
import { getVisibleCanvases } from './canvases';
import { getCompanionWindow } from './companionWindows';

/** */
function rangeContainsCanvasId(range, canvasId) {
  const canvasIds = range.getCanvasIds();
  for (let i = 0; i < canvasIds.length; i += 1) {
    if (Utils.normalisedUrlsMatch(canvasIds[i], canvasId)) {
      return true;
    }
  }
  return false;
}

/** */
function getVisibleNodeIdsInSubTree(nodes, canvasIds) {
  return nodes.reduce((nodeIdAcc, node) => {
    const result = [];
    const nodeContainsVisibleCanvas = canvasIds.reduce(
      (acc, canvasId) => acc || rangeContainsCanvasId(node.data, canvasId),
      false,
    );
    const subTreeVisibleNodeIds = node.nodes.length > 0
      ? getVisibleNodeIdsInSubTree(node.nodes, canvasIds)
      : [];
    if (nodeContainsVisibleCanvas || subTreeVisibleNodeIds.length > 0) {
      result.push({
        containsVisibleCanvas: nodeContainsVisibleCanvas,
        id: node.id,
        leaf: node.nodes.length === 0,
      });
    }
    result.push(...nodeIdAcc);
    result.push(...subTreeVisibleNodeIds);
    return result;
  }, []);
}

/** */
const getVisibleLeafAndBranchNodeIds = createSelector(
  [
    getManifestTreeStructure,
    getVisibleCanvases,
  ],
  (tree, canvases) => {
    if (!canvases) {
      return [];
    }
    const canvasIds = canvases.map(canvas => canvas.id);
    return getVisibleNodeIdsInSubTree(tree.nodes, canvasIds);
  },
);

/** */
export const getVisibleNodeIds = createSelector(
  [
    getVisibleLeafAndBranchNodeIds,
  ],
  visibleLeafAndBranchNodeIds => visibleLeafAndBranchNodeIds.map(item => item.id),
);

const getVisibleBranchNodeIds = createSelector(
  [
    getVisibleLeafAndBranchNodeIds,
  ],
  visibleLeafAndBranchNodeIds => visibleLeafAndBranchNodeIds.reduce(
    (acc, item) => (item.leaf ? acc : [...acc, item.id]),
    [],
  ),
);

const getCanvasContainingNodeIds = createSelector(
  [
    getVisibleLeafAndBranchNodeIds,
  ],
  visibleLeafAndBranchNodeIds => visibleLeafAndBranchNodeIds.reduce(
    (acc, item) => (item.containsVisibleCanvas ? [...acc, item.id] : acc),
    [],
  ),
);

/** */
export function getManuallyExpandedNodeIds(state, { companionWindowId }) {
  const companionWindow = getCompanionWindow(state, { companionWindowId });
  return companionWindow.expandedRangeIds || [];
}

/** */
export function getExpandedNodeIds(state, { ...args }) {
  const visibleBranchNodeIds = getVisibleBranchNodeIds(state, { ...args });
  const manuallyExpandedNodeIds = getManuallyExpandedNodeIds(state, { ...args });
  return union(manuallyExpandedNodeIds, visibleBranchNodeIds);
}

/** */
export function getNodeIdToScrollTo(state, { ...args }) {
  const canvasContainingNodeIds = getCanvasContainingNodeIds(state, { ...args });
  if (canvasContainingNodeIds) {
    return canvasContainingNodeIds[0];
  }
  return null;
}
