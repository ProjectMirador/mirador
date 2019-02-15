import { companionWindowsReducer } from '../../../src/state/reducers/companion_windows';
import ActionTypes from '../../../src/state/actions/action-types';

describe('companionWindowsReducer', () => {
  describe('SET_COMPANION_WINDOW', () => {
    it('adds a new companion window if a companion window for the given position does not exist', () => {
      const action = {
        type: ActionTypes.SET_COMPANION_WINDOW,
        id: 'abc123',
        windowId: 'x',
        position: 'right',
        content: 'info',
      };
      const beforeState = {};
      const expectedState = {
        abc123: {
          id: 'abc123', windowId: 'x', position: 'right', content: 'info',
        },
      };

      expect(companionWindowsReducer(beforeState, action)).toEqual(expectedState);
    });

    it('updates an existing companion window based on windowId and position (regardless of companionWindowId)', () => {
      const action = {
        type: ActionTypes.SET_COMPANION_WINDOW,
        id: 'xyz321',
        windowId: 'x',
        position: 'right',
        content: 'info',
      };
      const beforeState = {
        abc123: {
          id: 'abc123', windowId: 'x', position: 'right', content: 'canvas_navigation',
        },
      };
      const expectedState = {
        abc123: {
          id: 'abc123', windowId: 'x', position: 'right', content: 'info',
        },
      };

      expect(companionWindowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });

  describe('REMOVE_COMPANION_WINDOW', () => {
    it('removes the companion window w/ the given ID', () => {
      const action = { type: ActionTypes.REMOVE_COMPANION_WINDOW, id: 'abc123' };
      const beforeState = { abc123: { id: 'abc123' } };
      const expectedState = {};

      expect(companionWindowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });

  describe('REMOVE_WINDOW', () => {
    it('removes any companion window that has the given windowId', () => {
      const action = {
        type: ActionTypes.REMOVE_WINDOW,
        windowId: 'x',
      };
      const beforeState = {
        abc123: { windowId: 'x' },
        abc456: { windowId: 'y' },
        abc789: { windowId: 'x' },
      };
      const expectedState = {
        abc456: { windowId: 'y' },
      };

      expect(companionWindowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });
});
