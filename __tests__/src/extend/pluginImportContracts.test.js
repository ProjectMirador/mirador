/**
 * Regression test for real state (selectors/actions) usage found in a
 * GitHub survey of ~12 published Mirador plugins
 * (see https://github.com/ProjectMirador/mirador/issues/3480).
 *
 * Scoped largely to Redux state — not components/containers.
 * This file exists specifically for the latter: catch RTK migration (or any other
 * internal refactor of reducers/actions/selectors) accidentally changing
 * the *behavior* of something a real, currently-shipping plugin depends
 * on, even if we never officially promised it.
 *
 * A failure here does not necessarily mean don't make that change — it
 * means "a real plugin will likely break, go decide if that's an acceptable,
 * documented breaking change or not."
 */

import manifestFixture001 from '../../fixtures/version-3/001.json';
import * as selectors from '../../../src/state/selectors';
import {
  getCanvasLabel,
  selectInfoResponses,
  getSequenceViewingDirection,
  getNextCanvasGrouping,
  getPreviousCanvasGrouping,
} from '../../../src/state/selectors/canvases';
import { getManifestoInstance } from '../../../src/state/selectors/manifests';
import { getConfig } from '../../../src/state/selectors/config';
import { miradorSlice } from '../../../src/state/selectors/utils';

import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';
import { receiveManifest } from '../../../src/state/actions/manifest';
import { removeInfoResponse } from '../../../src/state/actions/infoResponse';

import ns from '../../../src/config/css-ns';
import { OSDReferences } from '../../../src/plugins/OSDReferences';

const windowId = 'window1';
const manifestId = 'manifest1';

const state = {
  companionWindows: {
    cw1: { content: 'annotations', id: 'cw1', position: 'right' },
  },
  config: {
    id: 'mirador-container-1',
    theme: { direction: 'ltr' },
    themes: {},
    window: { imageToolsEnabled: false },
  },
  infoResponses: {},
  manifests: {
    [manifestId]: { id: manifestId, json: manifestFixture001 },
  },
  viewers: {
    [windowId]: { flip: false, rotation: 0, x: 1, y: 2, zoom: 0.5 },
  },
  windows: {
    [windowId]: {
      companionWindowIds: ['cw1'],
      id: windowId,
      manifestId,
      view: 'single',
    },
  },
};

describe('real-world plugin selector/action survey', () => {
  describe('state/selectors barrel — real usage confirmed in the survey', () => {
    it('getWindowConfig merges default and per-window config', () => {
      expect(selectors.getWindowConfig(state, { windowId })).toEqual(expect.objectContaining({ imageToolsEnabled: false }));
    });

    it('getContainerId returns the configured container id', () => {
      expect(selectors.getContainerId(state)).toBe('mirador-container-1');
    });

    it('getVisibleCanvases returns an array', () => {
      expect(Array.isArray(selectors.getVisibleCanvases(state, { windowId }))).toBe(true);
    });

    it('selectInfoResponse is callable against window state', () => {
      expect(() => selectors.selectInfoResponse(state, { windowId })).not.toThrow();
    });

    it('selectInfoResponses is callable and returns an object — real usage (Handschriftenportal)', () => {
      expect(() => selectInfoResponses(state)).not.toThrow();
      expect(typeof selectInfoResponses(state)).toBe('object');
    });

    it('getTheme returns a theme object with a direction', () => {
      expect(selectors.getTheme(state)).toEqual(expect.objectContaining({ direction: 'ltr' }));
    });

    it("getWindowViewType returns the window's configured view", () => {
      expect(selectors.getWindowViewType(state, { windowId })).toBe('single');
    });

    it('getWindow returns the window by id', () => {
      expect(selectors.getWindow(state, { windowId })).toEqual(expect.objectContaining({ id: windowId, manifestId }));
    });

    it('getViewer returns the viewer state for a window', () => {
      expect(selectors.getViewer(state, { windowId })).toEqual({ flip: false, rotation: 0, x: 1, y: 2, zoom: 0.5 });
    });

    it('getCompanionWindowsForContent filters to the matching content type', () => {
      expect(selectors.getCompanionWindowsForContent(state, { windowId, content: 'annotations' })).toEqual([
        expect.objectContaining({ id: 'cw1', content: 'annotations' }),
      ]);
      expect(selectors.getCompanionWindowsForContent(state, { windowId, content: 'nonexistent' })).toEqual([]);
    });

    // These three depend on real canvas-grouping/sequence data we don't have a
    // realistic fixture for here — asserting they still resolve without
    // throwing and return the right *type* for an empty-grouping case, not
    // exact values. Real coverage for these already exists in
    // __tests__/src/selectors/canvases.test.js / sequences.test.js.
    it('getSequenceViewingDirection is callable and returns a string or null', () => {
      const result = selectors.getSequenceViewingDirection(state, { windowId });
      expect(result === null || typeof result === 'string').toBe(true);
    });

    it('getNextCanvasGrouping / getPreviousCanvasGrouping are callable and do not throw', () => {
      expect(() => getNextCanvasGrouping(state, { windowId })).not.toThrow();
      expect(() => getPreviousCanvasGrouping(state, { windowId })).not.toThrow();
    });
  });

  describe('state/selectors deep paths real plugins import directly', () => {
    it('canvases.getCanvasLabel is callable against window state', () => {
      expect(() => getCanvasLabel(state, { windowId })).not.toThrow();
    });

    it('manifests.getManifestoInstance resolves the real manifest fixture', () => {
      const manifest = getManifestoInstance(state, { manifestId });
      expect(manifest).toBeTruthy();
      expect(manifest.id).toBe(manifestFixture001.id);
    });

    it('config.getConfig returns the config object', () => {
      expect(getConfig(state)).toEqual(expect.objectContaining({ id: 'mirador-container-1' }));
    });

    it('utils.miradorSlice returns the mirador state slice — real usage (mirador-textoverlay)', () => {
      expect(miradorSlice(state)).toBe(state);
    });
  });

  describe('state/actions barrel — real usage confirmed in the survey', () => {
    it('updateWindow returns the documented action shape', () => {
      expect(actions.updateWindow('window1', { imageToolsEnabled: true })).toEqual({
        id: 'window1',
        payload: { imageToolsEnabled: true },
        type: 'mirador/UPDATE_WINDOW',
      });
    });

    it('receiveAnnotation returns the documented action shape', () => {
      expect(actions.receiveAnnotation('target1', 'anno1', { id: 'anno1' })).toEqual({
        annotationId: 'anno1',
        annotationJson: { id: 'anno1' },
        targetId: 'target1',
        type: 'mirador/RECEIVE_ANNOTATION',
      });
    });

    it('updateConfig returns the documented action shape', () => {
      expect(actions.updateConfig({ foo: 'bar' })).toEqual({
        config: { foo: 'bar' },
        type: 'mirador/UPDATE_CONFIG',
      });
    });

    it('updateViewport returns the documented action shape', () => {
      expect(actions.updateViewport('window1', { x: 1 })).toEqual({
        payload: { x: 1 },
        type: 'mirador/UPDATE_VIEWPORT',
        windowId: 'window1',
      });
    });

    it('updateCompanionWindow returns the documented action shape', () => {
      expect(actions.updateCompanionWindow('window1', 'cw1', { content: 'layers' })).toEqual({
        id: 'cw1',
        payload: { content: 'layers' },
        type: 'mirador/UPDATE_COMPANION_WINDOW',
        windowId: 'window1',
      });
    });

    it('addWindow is a thunk (dispatch, getState) => ..., not a plain action creator', () => {
      expect(typeof actions.addWindow({ manifestId: 'manifest1' })).toBe('function');
    });

    it('addCompanionWindow returns the documented action shape', () => {
      expect(actions.addCompanionWindow('window1', { content: 'annotations' })).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          payload: expect.objectContaining({ content: 'annotations', windowId: 'window1' }),
          type: 'mirador/ADD_COMPANION_WINDOW',
          windowId: 'window1',
        }),
      );
    });
  });

  describe('state/actions deep paths + ActionTypes real plugins import directly', () => {
    it('ActionTypes default export exists and is an object of strings', () => {
      expect(typeof ActionTypes).toBe('object');
      expect(Object.values(ActionTypes).every((v) => typeof v === 'string')).toBe(true);
    });

    it('receiveManifest returns an action of the documented type', () => {
      expect(receiveManifest('manifest1', {}).type).toBe('mirador/RECEIVE_MANIFEST');
    });

    it('removeInfoResponse returns an action of the documented type', () => {
      expect(removeInfoResponse('info1').type).toBe('mirador/REMOVE_INFO_RESPONSE');
    });
  });

  describe('non-state utilities real plugins import directly', () => {
    it('css-ns default export (ns) prefixes class names with the configured productionPrefix', () => {
      expect(ns('foo')).toBe('mirador-foo');
      expect(ns(['foo', 'bar'])).toBe('mirador-foo mirador-bar');
    });

    it('OSDReferences get/set/remove round-trip a ref by windowId', () => {
      const ref = { current: 'osd-instance' };
      OSDReferences.set(windowId, ref);
      expect(OSDReferences.get(windowId)).toBe(ref);

      OSDReferences.remove(windowId);
      expect(OSDReferences.get(windowId)).toBeUndefined();
    });
  });
});
