import * as actions from '../../../src/actions/index';
import ActionTypes from '../../../src/action-types';

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
