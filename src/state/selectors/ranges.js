import { createSelector } from 'reselect';
import { getManifestoInstance } from './manifests';
import { getCurrentCanvasId } from './windows';

/**
 * Return manifest structures/ranges
 * @param {object} state
 * @param {object} props
 * @param {string} props.manifestId
 * @param {string} props.windowId
 * @return {Array[Object]}
 */
export const parentRangeIdsForCurrentCanvas = createSelector(
  getManifestoInstance,
  getCurrentCanvasId,
  (manifest, currentCanvasId) => {
    const ranges = manifest.__jsonld.structures; // eslint-disable-line no-underscore-dangle
    const canvasParents = ranges.filter(range => range.canvases
                                        && range.canvases.includes(currentCanvasId));
    return [].concat(
      ...canvasParents
        .map(parent => getParentRangesFromStructures(ranges, parent['@id'])),
    );
  },
);

/**
 * Given a rangeId and structures, return all parents of this range
 * @param {Array[Object]} ranges
 * @param {String} rangeId
 * @return {Array[Object]} (An array containing all parent ranges)
 */
const getParentRangesFromStructures = (ranges, rangeId) => {
  const parents = [rangeId];

  /**
   * get immediate range parent utility
   */
  const parentRange = (allRanges, currentRangeId) => allRanges.filter(
    range => (range.ranges ? range.ranges.includes(currentRangeId) : false),
  )[0] || false;

  /**
   * inner recursive wrapper
   */
  const parentRanges = (allRanges, currentRangeId, knownParents) => {
    const parent = parentRange(allRanges, currentRangeId);
    if (parent) {
      knownParents.push(parent['@id']);
      parentRanges(allRanges, parent['@id'], knownParents);
    } return knownParents;
  };

  return parentRanges(ranges, rangeId, parents);
};
