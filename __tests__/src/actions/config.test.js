import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';
import configFixture from '../../fixtures/config/export.example.json';

describe('config actions', () => {
  describe('setConfig', () => {
    it('sets the config', () => {
      const config = { foo: 'bar' };
      const expectedAction = {
        config,
        type: ActionTypes.SET_CONFIG,
      };
      expect(actions.setConfig(config)).toEqual(expectedAction);
    });
  });
  describe('updateConfig', () => {
    it('updates the config', () => {
      const config = { foo: 'bar' };
      const expectedAction = {
        config,
        type: ActionTypes.UPDATE_CONFIG,
      };
      expect(actions.updateConfig(config)).toEqual(expectedAction);
    });
  });

  describe('importConfig', () => {
    it('imports the config', () => {
      const config = configFixture;
      const expectedAction = {
        config,
        type: ActionTypes.IMPORT_CONFIG,
      };
      expect(actions.importConfig(config)).toEqual(expectedAction);
    });
  });
});
