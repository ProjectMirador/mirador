import { configReducer } from '../../../src/state/reducers/config';
import ActionTypes from '../../../src/state/actions/action-types';
import configFixture from '../../fixtures/config/export.example.json';
import settings from '../../../src/config/settings';

describe('config reducer', () => {
  describe('SET_CONFIG', () => {
    it('should handle SET_CONFIG', () => {
      expect(configReducer({}, {
        config: { manifestVersion: 'v3' },
        type: ActionTypes.SET_CONFIG,
      })).toEqual({
        manifestVersion: 'v3',
      });
    });
    it('does not deep merge', () => {
      expect(configReducer({ stuff: { foo: 'bar' } }, {
        config: { stuff: { foo: 'bat' } },
        type: ActionTypes.SET_CONFIG,
      })).toEqual({
        stuff: { foo: 'bat' },
      });
    });
  });
  describe('UPDATE_CONFIG', () => {
    it('should handle UPDATE_CONFIG', () => {
      expect(configReducer({}, {
        config: { manifestVersion: 'v3' },
        type: ActionTypes.UPDATE_CONFIG,
      })).toEqual({
        manifestVersion: 'v3',
      });
    });
    it('does a deep merge', () => {
      expect(configReducer({
        hello: 'world',
        stuff: { foo: 'bar' },
      }, {
        config: { stuff: { foo: 'bat' } },
        type: ActionTypes.UPDATE_CONFIG,
      })).toEqual({
        hello: 'world',
        stuff: { foo: 'bat' },
      });
    });
  });
  describe('IMPORT_CONFIG', () => {
    it('should handle IMPORT_CONFIG', () => {
      expect(configReducer([], {
        config: configFixture,
        type: ActionTypes.IMPORT_CONFIG,
      })).toEqual(configFixture);
    });
  });
  it('should handle IMPORT_MIRADOR_STATE', () => {
    expect(configReducer({}, {
      state: { config: { new: 'stuff' } },
      type: ActionTypes.IMPORT_MIRADOR_STATE,
    })).toMatchObject({ new: 'stuff' });
  });
  it('handles pre-existing functions in IMPORT_MIRADOR_STATE by deep merging those stems', () => {
    const actual = configReducer(settings, {
      state: { config: { new: 'stuff', theme: { palette: { mode: 'dark' } } } },
      type: ActionTypes.IMPORT_MIRADOR_STATE,
    });

    expect(actual).toMatchObject({ theme: { ...settings.theme, palette: { ...settings.theme.palette, mode: 'dark' } } });
  });
});
