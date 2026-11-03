import { configureStore } from '@reduxjs/toolkit';
import ActionTypes from '../../../src/state/actions/action-types';
import { windowsListenerMiddleware } from '../../../src/state/listeners/windows';

vi.mock('../../../src/state/selectors', () => ({
  getElasticLayout: () => ({
    x: {
      height: 50,
      width: 50,
      x: 50,
      y: 12,
    },
  }),
  getWorkspace: () => ({
    viewportPosition: { height: 100, width: 100 },
  }),
}));

/** Builds a real store wired exactly like production, recording dispatched actions. */
function createRecordingStore() {
  const recordedActions = [];
  const recordAction = () => (next) => (action) => {
    recordedActions.push(action);
    return next(action);
  };

  const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(windowsListenerMiddleware.middleware).concat(recordAction),
    reducer: (state = {}) => state,
  });

  return { ...store, getActions: () => recordedActions };
}

describe('windows listeners', () => {
  describe('panToFocusedWindow (FOCUS_WINDOW listener)', () => {
    it('does nothing if pan was disabled', async () => {
      const store = createRecordingStore();

      store.dispatch({ pan: false, type: ActionTypes.FOCUS_WINDOW, windowId: 'x' });
      await windowsListenerMiddleware.middleware;

      expect(store.getActions()).toEqual([{ pan: false, type: ActionTypes.FOCUS_WINDOW, windowId: 'x' }]);
    });

    it('sets the viewport position to the newly focused window', async () => {
      const store = createRecordingStore();

      store.dispatch({ pan: true, type: ActionTypes.FOCUS_WINDOW, windowId: 'x' });
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(store.getActions()).toContainEqual({
        payload: {
          position: {
            x: 25,
            y: -13,
          },
        },
        type: ActionTypes.SET_WORKSPACE_VIEWPORT_POSITION,
      });
    });
  });
});
