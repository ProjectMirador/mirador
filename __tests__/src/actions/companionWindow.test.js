import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

describe('companionWindow actions', () => {
  describe('addCompanionWindow', () => {
    it('should return correct action object', () => {
      const payload = {
        content: 'info',
        position: 'right',
        foo: 'bar',
      };
      const action = actions.addCompanionWindow(payload);
      expect(action.type).toBe(ActionTypes.ADD_COMPANION_WINDOW);
      expect(action.payload).toMatchObject(payload);
      expect(action.payload.id).toMatch(/cw-.*/);
    });

    it('should set the correct default values', () => {
      const payload = {};
      const defaults = { foo: 'bar' };
      const action = actions.addCompanionWindow(payload, defaults);
      expect(action.payload.foo).toBe('bar');
    });

    it('should generate a new companionWindow ID', () => {
      const payload = {};

      expect(actions.addCompanionWindow(payload).id).toEqual(
        expect.stringMatching(/^cw-\w+-\w+/),
      );
    });
  });

  describe('updateCompanionWindow', () => {
    it('should return correct action object', () => {
      const mockState = {
        windows: {
          abc123: {
            companionWindowIds: ['cw-1', 'cw-2'],
          },
        },
        companionWindows: {
          'cw-1': { position: 'right' },
          'cw-2': { position: 'not-right' },
        },
      };

      const payload = {
        content: 'info',
        position: 'right',
      };
      const thunk = actions.updateCompanionWindow('abc123', 'cw-123', payload);

      const mockDispatch = jest.fn(() => {});
      const mockGetState = jest.fn(() => mockState);

      thunk(mockDispatch, mockGetState);

      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        type: ActionTypes.REMOVE_COMPANION_WINDOW,
        id: 'cw-1',
      });

      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        type: ActionTypes.UPDATE_WINDOW,
        id: 'abc123',
        payload: { companionWindowIds: ['cw-2'] },
      });

      const updateCompanionWindowAction = mockDispatch.mock.calls[2][0];

      expect(updateCompanionWindowAction.type).toBe(ActionTypes.UPDATE_COMPANION_WINDOW);
      expect(updateCompanionWindowAction.id).toBe('cw-123');
      expect(updateCompanionWindowAction.payload).toEqual(payload);
    });
  });

  describe('removeCompanionWindow', () => {
    it('should return correct action object', () => {
      const action = actions.removeCompanionWindow('cw-123');
      expect(action.type).toBe(ActionTypes.REMOVE_COMPANION_WINDOW);
      expect(action.id).toBe('cw-123');
    });
  });

  describe('popOutCompanionWindow', () => {
    it('returns a thunk which dispatches the appropriate actions', () => {
      const mockState = {
        windows: {
          abc123: {
            companionWindowIds: ['cw-1', 'cw-2'],
          },
        },
        companionWindows: {
          'cw-1': { position: 'right' },
          'cw-2': { position: 'not-right' },
        },
      };
      const mockDispatch = jest.fn(() => ({ id: 'cw-3' }));
      const mockGetState = jest.fn(() => mockState);
      const windowId = 'abc123';
      const panelType = 'info';
      const position = 'right';
      const thunk = actions.popOutCompanionWindow(windowId, panelType, position);

      expect(typeof thunk).toEqual('function');
      thunk(mockDispatch, mockGetState);

      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        type: ActionTypes.REMOVE_COMPANION_WINDOW,
        id: 'cw-1',
      });

      const addCompanionWindowAction = mockDispatch.mock.calls[1][0];
      expect(addCompanionWindowAction.type).toBe(ActionTypes.ADD_COMPANION_WINDOW);
      expect(addCompanionWindowAction.payload).toMatchObject({ content: 'info', position: 'right' });
      expect(addCompanionWindowAction.id.startsWith('cw-')).toBe(true);

      expect(mockDispatch).toHaveBeenNthCalledWith(3, {
        type: ActionTypes.UPDATE_WINDOW,
        id: 'abc123',
        payload: { companionWindowIds: ['cw-2', 'cw-3'] },
      });
    });

    it('sets the window sidebar panel type if the companion window appears in the left position', () => {
      const mockState = {
        windows: {
          abc123: { companionWindowIds: [] },
        },
        companionWindows: {},
      };

      const mockDispatch = jest.fn(() => ({ id: 'cw-3' }));
      const mockGetState = jest.fn(() => mockState);
      const windowId = 'abc123';
      const panelType = 'info';
      const position = 'left';
      const thunk = actions.popOutCompanionWindow(windowId, panelType, position);
      thunk(mockDispatch, mockGetState);

      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        type: ActionTypes.SET_WINDOW_SIDE_BAR_PANEL,
        windowId: 'abc123',
        panelType: 'info',
      });

      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        type: ActionTypes.UPDATE_WINDOW,
        id: 'abc123',
        payload: { companionAreaOpen: true },
      });
    });
  });
});
