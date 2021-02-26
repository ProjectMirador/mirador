import { createSelector } from 'reselect';
import { TreeNode } from 'manifesto.js/dist-esmodule/TreeNode';
import { getManifestoInstance } from './manifests';
import { getWindow } from './getters';
export var getSequences = createSelector([getManifestoInstance], function (manifest) {
  if (!manifest || !manifest.getTopRanges) return null;
  var topRangesOrRoot = manifest.getTopRanges();
  var v2TopRanges = topRangesOrRoot.filter(function (r) {
    return r.getProperty('viewingHint') === 'top';
  });
  var v3RangeSequences = [];

  if (v2TopRanges.length === 0 && topRangesOrRoot.length === 1) {
    v3RangeSequences = topRangesOrRoot[0].getRanges().filter(function (r) {
      return r.getBehavior() === 'sequence';
    });
  }

  var sequences = [].concat( // v2: multi-sequence manifests, or v3: items
  manifest.getSequences(), // v3: all top-level ranges with behavior=sequence
  v3RangeSequences);
  return sequences;
});
export var getSequence = createSelector([getSequences, getWindow, function (state, _ref) {
  var sequenceId = _ref.sequenceId;
  return sequenceId;
}], function (sequences, window, sequenceId) {
  if (!sequences) return null;

  if (sequenceId || window && window.sequenceId) {
    var currentSequence = sequences.find(function (s) {
      return s.id === (sequenceId || window.sequenceId);
    });
    if (currentSequence) return currentSequence;
  }

  return sequences[0];
});
/** Return the canvas index for a certain window.
* @param {object} state
* @param {String} windowId
* @param {Number}
*/

export var getCanvasIndex = createSelector([getWindow, getSequence], function (window, sequence) {
  return (sequence && window && window.canvasId && sequence.getCanvasById(window.canvasId) || {}).index || 0;
});
/**
 * Returns the viewing hint for the first sequence in the manifest or the manifest
 * @param {object} state
 * @param {object} props
 * @param {string} props.manifestId
 * @param {string} props.windowId
 * @return {Number}
 */

export var getSequenceViewingHint = createSelector([getSequence, getManifestoInstance], function (sequence, manifest) {
  if (!manifest) return null;
  var viewingHint = sequence && sequence.getViewingHint() || manifest.getViewingHint();
  if (viewingHint) return viewingHint;
  return null;
});
/** */

export var getSequenceViewingDirection = createSelector([getWindow, getSequence, getManifestoInstance], function (window, sequence, manifest) {
  var viewingDirection = window && window.viewingDirection || sequence && sequence.getViewingDirection() || manifest && manifest.getViewingDirection();
  if (viewingDirection) return viewingDirection;
  return null;
});
/**
 * Returns the behaviors viewing hint for the manifest
 * @param {object} state
 * @param {object} props
 * @param {string} props.manifestId
 * @param {string} props.windowId
 * @return {Number}
 */

export var getSequenceBehaviors = createSelector([getSequence, getManifestoInstance], function (sequence, manifest) {
  if (!manifest || !sequence) return [];
  var sequenceBehaviors = sequence && sequence.getProperty('behavior');

  if (sequenceBehaviors) {
    if (Array.isArray(sequenceBehaviors)) return sequenceBehaviors;
    return [sequenceBehaviors];
  }

  var behaviors = manifest.getProperty('behavior');
  if (!behaviors) return [];
  if (Array.isArray(behaviors)) return behaviors;
  return [behaviors];
});
/** */

export var getSequenceTreeStructure = createSelector([getSequence, getManifestoInstance], function (sequence, manifest) {
  if (sequence && sequence.getProperty('type') && sequence.isRange()) return sequence.getTree(new TreeNode('root'));
  return manifest && manifest.getDefaultTree();
});