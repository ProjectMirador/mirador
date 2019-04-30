import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

describe('errors actions', () => {
  describe('addError', () => {
    it('adds an error', () => {
      const errorMessage = 'errorMessage';
      const createdAction = actions.addError({ message: errorMessage });
      expect(createdAction).toHaveProperty('payload.message', errorMessage);
      expect(createdAction).toHaveProperty('id');
      expect(createdAction.id).toBeDefined();
    });
  });

  describe('confirmError', () => {
    it('confirms the knowledge of an error (so the error won\'t be shown again to the user)', () => {
      const errorId = 'testId123';
      const expectedAction = {
        id: errorId,
        type: ActionTypes.CONFIRM_ERROR,
      };

      expect(actions.confirmError(errorId)).toEqual(expectedAction);
    });
  });
});
