import { createSelector } from 'reselect';
import union from 'lodash/union';
import { getManifestTreeStructure } from './manifests';
import { getVisibleCanvases } from './canvases';
import { getCompanionWindow } from './companionWindows';

/** */
function getVisibleRangeIdsInSubTree(nodes, canvasIds) {
  return nodes.reduce((rangeIds, node) => {
    const currentRangeIds = [];
    const nodeContainsVisibleCanvas = canvasIds.reduce(
      (acc, canvasId) => acc || node.data.getCanvasIds().indexOf(canvasId) !== -1,
      false,
    );
    if (node.nodes.length > 0) {
      const subTreeVisibleRangeIds = node.nodes.length > 0
        ? getVisibleRangeIdsInSubTree(node.nodes, canvasIds) : [];
      currentRangeIds.push(...subTreeVisibleRangeIds);
    }
    if (currentRangeIds.length > 0 || nodeContainsVisibleCanvas) {
      currentRangeIds.push(node.data.id);
    }
    rangeIds.push(...currentRangeIds);
    return rangeIds;
  }, []);
}

/** */
export const getVisibleRangeIds = createSelector(
  [
    getManifestTreeStructure,
    getVisibleCanvases,
  ],
  (tree, canvases) => {
    if (!canvases) {
      return [];
    }
    const canvasIds = canvases.map(canvas => canvas.id);
    return getVisibleRangeIdsInSubTree(tree.nodes, canvasIds);
  },
);

/** */
export function getManuallyExpandedRangeIds(state, { companionWindowId }) {
  const companionWindow = getCompanionWindow(state, { companionWindowId });
  return companionWindow.expandedRangeIds || [];
}

/** */
export function getExpandedRangeIds(state, { ...args }) {
  const visibleRangeIds = getVisibleRangeIds(state, { ...args });
  const manuallyExpandedRangeIds = getManuallyExpandedRangeIds(state, { ...args });
  return union(manuallyExpandedRangeIds, visibleRangeIds);
}
