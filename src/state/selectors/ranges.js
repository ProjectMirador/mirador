import { createSelector } from 'reselect';
import union from 'lodash/union';
import { getManifestTreeStructure } from './manifests';
import { getVisibleCanvases } from './canvases';
import { getCompanionWindow } from './companionWindows';

/** */
function getVisibleNodeIdsInSubTree(nodes, canvasIds) {
  return nodes.reduce((rangeIds, node) => {
    const currentRangeIds = [];
    const nodeContainsVisibleCanvas = canvasIds.reduce(
      (acc, canvasId) => acc || node.data.getCanvasIds().indexOf(canvasId) !== -1,
      false,
    );
    if (node.nodes.length > 0) {
      const subTreeVisibleRangeIds = node.nodes.length > 0
        ? getVisibleNodeIdsInSubTree(node.nodes, canvasIds) : [];
      currentRangeIds.push(...subTreeVisibleRangeIds);
    }
    if (currentRangeIds.length > 0 || nodeContainsVisibleCanvas) {
      currentRangeIds.push(node.id);
    }
    rangeIds.push(...currentRangeIds);
    return rangeIds;
  }, []);
}

/** */
export const getVisibleNodeIds = createSelector(
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
export function getManuallyExpandedNodeIds(state, { companionWindowId }) {
  const companionWindow = getCompanionWindow(state, { companionWindowId });
  return companionWindow.expandedNodeIds || [];
}

/** */
export function getExpandedNodeIds(state, { ...args }) {
  const visibleNodeIds = getVisibleNodeIds(state, { ...args });
  const manuallyExpandedNodeIds = getManuallyExpandedNodeIds(state, { ...args });
  return union(manuallyExpandedNodeIds, visibleNodeIds);
}
