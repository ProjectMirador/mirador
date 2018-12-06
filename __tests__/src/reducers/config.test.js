import reducer from '../../../src/reducers/config';
import ActionTypes from '../../../src/action-types';

describe('config reducer', () => {
  describe('SET_CONFIG', () => {
    it('should handle SET_CONFIG', () => {
      expect(reducer({}, {
        type: ActionTypes.SET_CONFIG,
        config: { manifestVersion: 'v3' },
      })).toEqual({
        manifestVersion: 'v3',
      });
    });
    it('does not deep merge', () => {
      expect(reducer({ stuff: { foo: 'bar' } }, {
        type: ActionTypes.SET_CONFIG,
        config: { stuff: { foo: 'bat' } },
      })).toEqual({
        stuff: { foo: 'bat' },
      });
    });
  });
  describe('UPDATE_CONFIG', () => {
    it('should handle UPDATE_CONFIG', () => {
      expect(reducer({}, {
        type: ActionTypes.UPDATE_CONFIG,
        config: { manifestVersion: 'v3' },
      })).toEqual({
        manifestVersion: 'v3',
      });
    });
    it('does a deep merge', () => {
      expect(reducer({ stuff: { foo: 'bar' }, hello: 'world' }, {
        type: ActionTypes.UPDATE_CONFIG,
        config: { stuff: { foo: 'bat' } },
      })).toEqual({
        stuff: { foo: 'bat' },
        hello: 'world',
      });
    });
  });
});
