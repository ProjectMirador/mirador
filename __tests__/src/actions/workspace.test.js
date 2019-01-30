import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

describe('workspace actions', () => {
  describe('fullscreenWorkspace', () => {
    it('should create a new window with merged defaults', () => {
      const options = true;

      const expectedAction = {
        type: ActionTypes.FULLSCREEN_WORKSPACE,
        fullscreen: true,
      };
      expect(actions.fullscreenWorkspace(options)).toEqual(expectedAction);
    });
  });
});
