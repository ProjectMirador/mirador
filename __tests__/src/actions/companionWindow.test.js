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
      expect(action.payload.position).toEqual('right');
      expect(action.payload.content).toEqual('info');
      expect(action.payload.foo).toEqual('bar');
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
      const payload = {
        content: 'info',
        position: 'right',
      };
      const action = actions.updateCompanionWindow('cw-123', payload);
      expect(action.type).toBe(ActionTypes.UPDATE_COMPANION_WINDOW);
      expect(action.id).toBe('cw-123');
      expect(action.payload).toEqual(payload);
    });
  });

  describe('removeCompanionWindow', () => {
    it('should return correct action object', () => {
      const action = actions.removeCompanionWindow('cw-123');
      expect(action.type).toBe(ActionTypes.REMOVE_COMPANION_WINDOW);
      expect(action.id).toBe('cw-123');
    });
  });
});
