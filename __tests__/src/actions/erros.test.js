import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

describe('errors actions', () => {
  describe('addError', () => {
    it('adds an error', () => {
      const errorMessage = 'errorMessage';
      const createdAction = actions.addError(errorMessage);

      expect(createdAction).toHaveProperty('message', errorMessage);
      expect(createdAction).toHaveProperty('id');
      expect(createdAction.id).toBeDefined();
    });
  });

  describe('removeError', () => {
    it('removes an existing error', () => {
      const errorId = 'testId123';
      const expectedAction = {
        type: ActionTypes.REMOVE_ERROR,
        id: errorId,
      };

      expect(actions.removeError(errorId)).toEqual(expectedAction);
    });
  });
});
