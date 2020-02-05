import { createSelector } from 'reselect';
import { getManifestTreeStructure } from './manifests';
import { getVisibleCanvases } from './canvases';

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
      currentRangeIds.push(node.id);
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
