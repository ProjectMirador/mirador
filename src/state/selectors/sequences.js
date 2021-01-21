import { createSelector } from 'reselect';
import { TreeNode } from 'manifesto.js/dist-esmodule/TreeNode';
import { v4 as uuid } from 'uuid';
import {
  getManifestoInstance,
} from './manifests';
import { getWindow } from './getters';

export const getSequences = createSelector(
  [getManifestoInstance],
  (manifest) => {
    if (!manifest || !manifest.getTopRanges) return null;

    const topRangesOrRoot = manifest.getTopRanges();
    const v2TopRanges = topRangesOrRoot.filter(r => r.getProperty('viewingHint') === 'top');
    let v3RangeSequences = [];

    if (v2TopRanges.length === 0 && topRangesOrRoot.length === 1) {
      v3RangeSequences = topRangesOrRoot[0].getRanges().filter(r => r.getBehavior() === 'sequence');

      /**  Add manifesto canvases (items) to the ranges if 'items' property of ranges
       *  is empty
       */
      if (v3RangeSequences.length > 0 && manifest.items && manifest.items.length > 0
          && manifest.items[0].items && manifest.items[0].items.length > 0) {
        /** Use manifesto canvases provided in manifest 'items' property to populate
         * range 'items'/canvases
        */
        const canvases = manifest.items[0].items;

        v3RangeSequences.map((sequence) => {
          if (sequence.items.length === 0) {
            const updatedSequence = sequence;
            updatedSequence.items = sequence.canvases.map(canvasId => {
              const fullCanvas = canvases.find(c => c.id === canvasId);
              return fullCanvas;
            });
            return updatedSequence;
          }
          return sequence;
        });
      }
    }

      /** v3 sequence (not range sequence): assign id if not there
       * Case: only sequence (not range) for v3 manifest is created by manifesto from all
       * the items/canvases to display as default; this has id listed as undefined
      */
      const manifestSequences = manifest.getSequences();
      if (v3RangeSequences && manifestSequences && manifestSequences.length > 0
        && !manifestSequences[0].id) {
          manifestSequences[0].id = uuid();
          manifestSequences[0].label = 'Table of Contents';
        }

    const sequences = [].concat(
      // v2: multi-sequence manifests, or v3: items
      manifestSequences,
      // v3: all top-level ranges with behavior=sequence
      v3RangeSequences,
    );

    return sequences;
  },
);

export const getSequence = createSelector(
  [
    getSequences,
    getWindow,
    (state, { sequenceId }) => sequenceId,
  ],
  (sequences, window, sequenceId) => {
    if (!sequences) return null;
    if (sequenceId || (window && window.sequenceId)) {
      const currentSequence = sequences.find(s => s.id === (sequenceId || window.sequenceId));
      if (currentSequence) return currentSequence;
    }

    return sequences[0];
  },
);

/** Return the canvas index for a certain window.
* @param {object} state
* @param {String} windowId
* @param {Number}
*/
export const getCanvasIndex = createSelector(
  [
    getWindow,
    getSequence,
  ],
  (window, sequence) => {
    let canvas = {};
  
    if (sequence && window && window.canvasId
      && typeof sequence.getCanvasById === 'function') {
      canvas = sequence.getCanvasById(window.canvasId);
    }
    return canvas.index || 0;
   },
);

/**
 * Returns the viewing hint for the first sequence in the manifest or the manifest
 * @param {object} state
 * @param {object} props
 * @param {string} props.manifestId
 * @param {string} props.windowId
 * @return {Number}
 */
export const getSequenceViewingHint = createSelector(
  [getSequence, getManifestoInstance],
  (sequence, manifest) => {
    if (!manifest) return null;
    const viewingHint = (sequence && sequence.getViewingHint())
      || manifest.getViewingHint();
    if (viewingHint) return viewingHint;
    return null;
  },
);

/** */
export const getSequenceViewingDirection = createSelector(
  [getWindow, getSequence, getManifestoInstance],
  (window, sequence, manifest) => {
    const viewingDirection = (window && window.viewingDirection)
      || (sequence && sequence.getViewingDirection())
      || (manifest && manifest.getViewingDirection());
    if (viewingDirection) return viewingDirection;
    return null;
  },
);

/**
 * Returns the behaviors viewing hint for the manifest
 * @param {object} state
 * @param {object} props
 * @param {string} props.manifestId
 * @param {string} props.windowId
 * @return {Number}
 */
export const getSequenceBehaviors = createSelector(
  [getSequence, getManifestoInstance],
  (sequence, manifest) => {
    if (!manifest || !sequence) return [];
    const sequenceBehaviors = sequence && sequence.getProperty('behavior');

    if (sequenceBehaviors) {
      if (Array.isArray(sequenceBehaviors)) return sequenceBehaviors;
      return [sequenceBehaviors];
    }

    const behaviors = manifest.getProperty('behavior');

    if (!behaviors) return [];
    if (Array.isArray(behaviors)) return behaviors;
    return [behaviors];
  },
);

/** */
export const getSequenceTreeStructure = createSelector(
  [getSequence, getManifestoInstance],
  (sequence, manifest) => {
    if (sequence && sequence.getProperty('type') && sequence.isRange()) return sequence.getTree(new TreeNode('root'));

    return manifest && manifest.getDefaultTree();
  },
);
