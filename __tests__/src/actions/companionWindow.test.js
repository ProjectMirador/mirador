import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

describe('companionWindow actions', () => {
  describe('addCompanionWindow', () => {
    it('should create a new companion window with the given options', () => {
      const options = {
        id: 'abc123',
        windowId: 'x',
        content: 'info',
        position: 'right',
      };

      const expectedAction = {
        type: ActionTypes.SET_COMPANION_WINDOW,
        id: 'abc123',
        windowId: 'x',
        content: 'info',
        position: 'right',
      };
      expect(actions.addCompanionWindow(options)).toEqual(expectedAction);
    });

    it('should generate a new companionWindow ID if one is not provided', () => {
      const options = {
        windowId: 'x',
        content: 'info',
        position: 'right',
      };

      expect(actions.addCompanionWindow(options).id).toEqual(
        expect.stringMatching(/^cw-\w+-\w+/),
      );
    });
  });

  describe('removeCompanionWindow', () => {
    it('should send the REMOVE_COMPANION_WINDOW action with the given ID', () => {
      const expectedAction = {
        type: ActionTypes.REMOVE_COMPANION_WINDOW,
        id: 'abc123',
      };

      expect(actions.removeCompanionWindow('abc123')).toEqual(expectedAction);
    });
  });
});
