import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

describe('config actions', () => {
  describe('setConfig', () => {
    it('sets the config', () => {
      const config = { foo: 'bar' };
      const expectedAction = {
        type: ActionTypes.SET_CONFIG,
        config,
      };
      expect(actions.setConfig(config)).toEqual(expectedAction);
    });
  });
  describe('updateConfig', () => {
    it('updates the config', () => {
      const config = { foo: 'bar' };
      const expectedAction = {
        type: ActionTypes.UPDATE_CONFIG,
        config,
      };
      expect(actions.updateConfig(config)).toEqual(expectedAction);
    });
  });
});
