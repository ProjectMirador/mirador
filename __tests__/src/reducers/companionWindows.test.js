import { companionWindowsReducer } from '../../../src/state/reducers/companionWindows';
import ActionTypes from '../../../src/state/actions/action-types';

describe('companionWindowsReducer', () => {
  describe('ADD_COMPANION_WINDOW', () => {
    it('adds a new companion window', () => {
      const action = {
        id: 'abc123',
        payload: { content: 'info', position: 'right' },
        type: ActionTypes.ADD_COMPANION_WINDOW,
      };
      const beforeState = {};
      const expectedState = {
        abc123: {
          content: 'info',
          position: 'right',
        },
      };
      expect(companionWindowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });

  describe('ADD_WINDOW', () => {
    it('adds default companion window(s)', () => {
      const action = {
        companionWindows: [{
          content: 'info',
          id: 'banana',
          position: 'left',
        }, {
          content: 'canvas',
          id: 'Banane',
          position: 'right',
        }],
        type: ActionTypes.ADD_WINDOW,
      };
      const beforeState = {};
      const expectedState = {
        banana: {
          content: 'info',
          id: 'banana',
          position: 'left',
        },
        Banane: {
          content: 'canvas',
          id: 'Banane',
          position: 'right',
        },
      };
      expect(companionWindowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });


  describe('UPDATE_COMPANION_WINDOW', () => {
    it('updates an existing companion window', () => {
      const action = {
        id: 'abc123',
        payload: { content: 'canvas', foo: 'bar' },
        type: ActionTypes.UPDATE_COMPANION_WINDOW,
      };
      const beforeState = {
        abc123: {
          content: 'info',
          position: 'right',
        },
      };
      const expectedState = {
        abc123: {
          content: 'canvas',
          foo: 'bar',
          position: 'right',
        },
      };
      expect(companionWindowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });

  describe('REMOVE_COMPANION_WINDOW', () => {
    it('should remove a companion window', () => {
      const action = {
        id: 'abc123',
        type: ActionTypes.REMOVE_COMPANION_WINDOW,
      };
      const beforeState = {
        abc123: {
          content: 'info',
          position: 'right',
        },
      };
      const expectedState = {};
      expect(companionWindowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });

  describe('REMOVE_WINDOW', () => {
    it('should remove a companion window', () => {
      const action = {
        companionWindowIds: ['a', 'b'],
        id: 'abc123',
        type: ActionTypes.REMOVE_WINDOW,
      };
      const beforeState = {
        a: {},
        b: {},
        c: {},
      };
      const expectedState = { c: {} };
      expect(companionWindowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });
  it('should handle IMPORT_MIRADOR_STATE', () => {
    expect(companionWindowsReducer({}, {
      state: { companionWindows: { new: 'stuff' } },
      type: ActionTypes.IMPORT_MIRADOR_STATE,
    })).toEqual({ new: 'stuff' });
  });
});
