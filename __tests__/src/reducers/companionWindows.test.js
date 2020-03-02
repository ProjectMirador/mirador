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

  describe('TOGGLE_TOC_NODE', () => {
    const action = {
      id: 'cw123',
      nodeId: '0-1',
      type: ActionTypes.TOGGLE_TOC_NODE,
    };

    it('should add the id of a toggled node that do not exist in the state', () => {
      const emptyBeforeState = {
        cw123: {},
        cw456: {},
      };
      const expectedStateFromEmpty = {
        cw123: {
          tocNodes: {
            '0-1': { expanded: true },
          },
        },
        cw456: {},
      };
      expect(companionWindowsReducer(emptyBeforeState, action)).toEqual(expectedStateFromEmpty);

      const filledBeforeState = {
        cw123: {
          tocNodes: {
            '0-0': { expanded: true },
            '0-2-0': { expanded: true },
          },
        },
        cw456: {},
      };
      const expectedStateAfterFilled = {
        cw123: {
          tocNodes: {
            '0-0': { expanded: true },
            '0-1': { expanded: true },
            '0-2-0': { expanded: true },
          },
        },
        cw456: {},
      };
      expect(companionWindowsReducer(filledBeforeState, action)).toEqual(expectedStateAfterFilled);
    });

    it('should switch the expanded value for existing nodeIds in the state', () => {
      const stateWithTrue = {
        cw123: {
          tocNodes: {
            '0-0': { expanded: true },
            '0-1': { expanded: true },
            '0-2-0': { expanded: true },
          },
        },
        cw456: {},
      };

      const stateWithFalse = {
        cw123: {
          tocNodes: {
            '0-0': { expanded: true },
            '0-1': { expanded: false },
            '0-2-0': { expanded: true },
          },
        },
        cw456: {},
      };

      expect(companionWindowsReducer(stateWithTrue, action)).toEqual(stateWithFalse);
      expect(companionWindowsReducer(stateWithFalse, action)).toEqual(stateWithTrue);
    });
  });

  it('should handle IMPORT_MIRADOR_STATE', () => {
    expect(companionWindowsReducer({}, {
      state: { companionWindows: { new: 'stuff' } },
      type: ActionTypes.IMPORT_MIRADOR_STATE,
    })).toEqual({ new: 'stuff' });
  });
});
