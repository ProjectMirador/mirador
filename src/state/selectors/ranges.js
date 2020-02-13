import { createSelector } from 'reselect';
import union from 'lodash/union';
import { getManifestTreeStructure } from './manifests';
import { getVisibleCanvases } from './canvases';
import { getCompanionWindow } from './companionWindows';

/** */
function getVisibleRangeIdsInSubTree(nodes, canvasIds) {
  return nodes.reduce((rangeIdAcc, node) => {
    const currentBranchRangeIds = [];
    const currentLeafRangeIds = [];
    const nodeContainsVisibleCanvas = canvasIds.reduce(
      (acc, canvasId) => acc || node.data.getCanvasIds().indexOf(canvasId) !== -1,
      false,
    );
    if (node.nodes.length > 0) {
      const subTreeVisibleRangeIds = node.nodes.length > 0
        ? getVisibleRangeIdsInSubTree(node.nodes, canvasIds) : {
          branchRangeIds: [],
          leafRangeIds: [],
        };
      currentBranchRangeIds.push(...subTreeVisibleRangeIds.branchRangeIds);
      currentLeafRangeIds.push(...subTreeVisibleRangeIds.leafRangeIds);
    }
    if (currentBranchRangeIds.length > 0
      || currentLeafRangeIds.length > 0
      || nodeContainsVisibleCanvas) {
      if (node.nodes.length > 0) {
        currentBranchRangeIds.push(node.data.id);
      } else {
        currentLeafRangeIds.push(node.data.id);
      }
    }
    rangeIdAcc.branchRangeIds.push(...currentBranchRangeIds);
    rangeIdAcc.leafRangeIds.push(...currentLeafRangeIds);
    return rangeIdAcc;
  }, {
    branchRangeIds: [],
    leafRangeIds: [],
  });
}

/** */
const getVisibleLeafAndBranchRangeIds = createSelector(
  [
    getManifestTreeStructure,
    getVisibleCanvases,
  ],
  (tree, canvases) => {
    if (!canvases) {
      return {
        branchRangeIds: [],
        leafRangeIds: [],
      };
    }
    const canvasIds = canvases.map(canvas => canvas.id);
    return getVisibleRangeIdsInSubTree(tree.nodes, canvasIds);
  },
);

/** */
export const getVisibleRangeIds = createSelector(
  [
    getVisibleLeafAndBranchRangeIds,
  ],
  (visibleLeafAndBranchRangeIds) => {
    return union(visibleLeafAndBranchRangeIds.leafRangeIds, visibleLeafAndBranchRangeIds.branchRangeIds);
  },
);

const getVisibleBranchRangeIds = createSelector(
  [
    getVisibleLeafAndBranchRangeIds,
  ],
  (visibleLeafAndBranchRangeIds) => {
    return visibleLeafAndBranchRangeIds.branchRangeIds;
  },
);

/** */
export function getManuallyExpandedRangeIds(state, { companionWindowId }) {
  const companionWindow = getCompanionWindow(state, { companionWindowId });
  return companionWindow.expandedRangeIds || [];
}

/** */
export function getExpandedRangeIds(state, { ...args }) {
  const visibleBranchRangeIds = getVisibleBranchRangeIds(state, { ...args });
  const manuallyExpandedRangeIds = getManuallyExpandedRangeIds(state, { ...args });
  return union(manuallyExpandedRangeIds, visibleBranchRangeIds);
}
