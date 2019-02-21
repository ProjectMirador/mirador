import { companionWindowsReducer } from '../../../src/state/reducers/companionWindows';
import ActionTypes from '../../../src/state/actions/action-types';

describe('companionWindowsReducer', () => {
  describe('ADD_COMPANION_WINDOW', () => {
    it('adds a new companion window', () => {
      const action = {
        type: ActionTypes.ADD_COMPANION_WINDOW,
        id: 'abc123',
        payload: { content: 'info', position: 'right' },
      };
      const beforeState = {};
      const expectedState = {
        abc123: {
          position: 'right',
          content: 'info',
        },
      };
      expect(companionWindowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });

  describe('UPDATE_COMPANION_WINDOW', () => {
    it('updates an existing companion window', () => {
      const action = {
        type: ActionTypes.UPDATE_COMPANION_WINDOW,
        id: 'abc123',
        payload: { content: 'canvases', foo: 'bar' },
      };
      const beforeState = {
        abc123: {
          position: 'right',
          content: 'info',
        },
      };
      const expectedState = {
        abc123: {
          position: 'right',
          content: 'canvases',
          foo: 'bar',
        },
      };
      expect(companionWindowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });

  describe('REMOVE_COMPANION_WINDOW', () => {
    it('should remove a companion window', () => {
      const action = {
        type: ActionTypes.REMOVE_COMPANION_WINDOW,
        id: 'abc123',
      };
      const beforeState = {
        abc123: {
          position: 'right',
          content: 'info',
        },
      };
      const expectedState = {};
      expect(companionWindowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });
});
