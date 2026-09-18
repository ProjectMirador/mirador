import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';
import { getConfig, getWindowConfig } from '../../../src/state/selectors';

vi.mock('../../../src/state/selectors', () => ({
  getCanvasGrouping: (state, { canvasId }) => [{ id: canvasId }],
  getConfig: vi.fn(() => ({ osdConfig: {} })),
  getWindowConfig: vi.fn(() => ({ preserveMiradorViewport: true })),
  getNextCanvasGrouping: () => [{ id: 'canvasIndex-2' }],
  getPreviousCanvasGrouping: () => [{ id: 'canvasIndex-0' }],
}));

/**
 * Builds a real redux store (with thunk support) that records every dispatched
 * action, in place of the deprecated redux-mock-store package. createStore()
 * requires a reducer, so `(state = {}) => state`is no-op here since state is never
 * read — the selectors these thunks call are mocked above.
 */
function createRecordingStore() {
  const recordedActions = [];
  const recordAction = () => (next) => (action) => {
    recordedActions.push(action);
    return next(action);
  };
  const store = createStore((state = {}) => state, applyMiddleware(thunk, recordAction));

  return { ...store, getActions: () => recordedActions };
}

describe('canvas actions', () => {
  describe('setCanvas', () => {
    let store = null;
    beforeEach(() => {
      store = createRecordingStore();
    });

    it('sets to a defined canvas', () => {
      const id = 'abc123';
      const expectedAction = {
        canvasId: 'a',
        preserveMiradorViewport: true,
        type: ActionTypes.SET_CANVAS,
        visibleCanvases: ['a'],
        windowId: id,
      };
      store.dispatch(actions.setCanvas(id, 'a'));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });
  describe('setPreviousCanvas', () => {
    let store = null;
    beforeEach(() => {
      store = createRecordingStore();
    });

    it('sets to a defined canvas', () => {
      const id = 'abc123';
      const expectedAction = {
        canvasId: 'canvasIndex-0',
        preserveMiradorViewport: true,
        type: ActionTypes.SET_CANVAS,
        visibleCanvases: ['canvasIndex-0'],
        windowId: id,
      };
      store.dispatch(actions.setPreviousCanvas(id));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });
  describe('setNextCanvas', () => {
    let store = null;
    beforeEach(() => {
      store = createRecordingStore();
    });

    it('sets to a defined canvas', () => {
      const id = 'abc123';
      const expectedAction = {
        canvasId: 'canvasIndex-2',
        preserveMiradorViewport: true,
        type: ActionTypes.SET_CANVAS,
        visibleCanvases: ['canvasIndex-2'],
        windowId: id,
      };
      store.dispatch(actions.setNextCanvas(id));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });
  describe('setCanvas legacy osdConfig.preserveViewport fallback (#4536)', () => {
    let store = null;
    let warnSpy = null;

    beforeEach(() => {
      store = createRecordingStore();
      getWindowConfig.mockReturnValue({ preserveMiradorViewport: false });
      warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      getWindowConfig.mockReturnValue({ preserveMiradorViewport: true });
      getConfig.mockReturnValue({ osdConfig: {} });
      warnSpy.mockRestore();
    });

    it('falls back to the legacy osdConfig.preserveViewport when window.preserveMiradorViewport is unset, and warns', () => {
      getConfig.mockReturnValue({ osdConfig: { preserveViewport: true } });

      store.dispatch(actions.setCanvas('abc123', 'a'));

      expect(store.getActions()[0]).toEqual(expect.objectContaining({ preserveMiradorViewport: true }));
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('osdConfig.preserveViewport is deprecated'));
    });

    it('does not turn on preserveMiradorViewport just because the legacy option is present and false', () => {
      getConfig.mockReturnValue({ osdConfig: { preserveViewport: false } });

      store.dispatch(actions.setCanvas('abc123', 'a'));

      expect(store.getActions()[0]).toEqual(expect.objectContaining({ preserveMiradorViewport: false }));
    });

    it('does not warn when the legacy option was never set', () => {
      getConfig.mockReturnValue({ osdConfig: {} });

      store.dispatch(actions.setCanvas('abc123', 'a'));

      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('an explicit options.preserveMiradorViewport always wins over the legacy fallback', () => {
      getConfig.mockReturnValue({ osdConfig: { preserveViewport: true } });

      store.dispatch(actions.setCanvas('abc123', 'a', null, { preserveMiradorViewport: false }));

      expect(store.getActions()[0]).toEqual(expect.objectContaining({ preserveMiradorViewport: false }));
    });
  });

  describe('updateViewport', () => {
    it('sets viewer state', () => {
      const id = 'abc123';
      const expectedAction = {
        payload: {
          x: 1,
          y: 0,
          zoom: 0.5,
        },
        type: ActionTypes.UPDATE_VIEWPORT,
        windowId: id,
      };
      expect(actions.updateViewport(id, { x: 1, y: 0, zoom: 0.5 })).toEqual(expectedAction);
    });
  });
});
