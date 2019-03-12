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
      const mockState = {
        windows: {
          abc123: { companionWindowIds: [] },
        },
        companionWindows: {},
      };

      const mockDispatch = jest.fn(() => ({}));
      const mockGetState = jest.fn(() => mockState);
      const thunk = actions.addCompanionWindow('abc123', payload);
      thunk(mockDispatch, mockGetState);

      const action = mockDispatch.mock.calls[0][0];

      expect(action.type).toBe(ActionTypes.ADD_COMPANION_WINDOW);
      expect(action.payload).toMatchObject(payload);
      expect(action.payload.id).toMatch(/cw-.*/);
    });

    it('should set the correct default values', () => {
      const payload = {};
      const defaults = { foo: 'bar' };

      const mockState = {
        windows: {
          abc123: { companionWindowIds: [] },
        },
        companionWindows: {},
      };

      const mockDispatch = jest.fn(() => ({}));
      const mockGetState = jest.fn(() => mockState);
      const thunk = actions.addCompanionWindow('abc123', payload, defaults);
      thunk(mockDispatch, mockGetState);

      const action = mockDispatch.mock.calls[0][0];

      expect(action.payload.foo).toBe('bar');
    });

    it('should generate a new companionWindow ID', () => {
      const payload = {};

      const mockState = {
        windows: {
          abc123: { companionWindowIds: [] },
        },
        companionWindows: {},
      };

      const mockDispatch = jest.fn(() => ({}));
      const mockGetState = jest.fn(() => mockState);

      const thunk = actions.addCompanionWindow('abc123', payload);
      thunk(mockDispatch, mockGetState);
      const action = mockDispatch.mock.calls[0][0];

      expect(action.id).toEqual(
        expect.stringMatching(/^cw-\w+-\w+/),
      );
    });
  });

  describe('updateCompanionWindow', () => {
    it('should return correct action object', () => {
      const payload = {
        content: 'info',
        position: 'right',
        foo: 'bar',
      };

      const action = actions.updateCompanionWindow('abc123', 'cw-123', payload);

      expect(action.type).toBe(ActionTypes.UPDATE_COMPANION_WINDOW);
      expect(action.id).toBe('cw-123');
      expect(action.payload).toEqual(payload);
    });
  });

  describe('removeCompanionWindow', () => {
    it('should return correct action object', () => {
      const action = actions.removeCompanionWindow('window', 'cw-123');
      expect(action.type).toBe(ActionTypes.REMOVE_COMPANION_WINDOW);
      expect(action.id).toBe('cw-123');
      expect(action.windowId).toBe('window');
    });
  });
});
