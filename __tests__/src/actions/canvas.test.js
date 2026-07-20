import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

vi.mock('../../../src/state/selectors', () => ({
  getCanvasGrouping: (state, { canvasId }) => [{ id: canvasId }],
  getConfig: vi.fn((state) => {
    const osdConfig = { osdConfig: { preserveViewport: true } };
    return osdConfig;
  }),
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
        preserveViewport: true,
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
        preserveViewport: true,
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
        preserveViewport: true,
        type: ActionTypes.SET_CANVAS,
        visibleCanvases: ['canvasIndex-2'],
        windowId: id,
      };
      store.dispatch(actions.setNextCanvas(id));
      expect(store.getActions()[0]).toEqual(expectedAction);
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
