import { layersReducer } from '../../../src/state/reducers/layersSlice';
import ActionTypes from '../../../src/state/actions/action-types';

describe('layers reducer', () => {
  const windowId = 'foo';
  const canvasId = 'bar';
  describe('UPDATE_LAYERS', () => {
    it('should handle UPDATE_LAYERS', () => {
      expect(
        layersReducer(
          {},
          {
            payload: { canvasId, some: 'data', windowId },
            type: ActionTypes.UPDATE_LAYERS,
          },
        ),
      ).toEqual({
        foo: {
          bar: {
            some: 'data',
          },
        },
      });
    });

    it('does a deep merge', () => {
      const originalState = {
        baz: {
          whatever: {},
        },
        foo: {
          bar: { existing: 'props' },
          oof: {},
        },
      };

      expect(
        layersReducer(originalState, {
          payload: { canvasId, some: 'data', windowId },
          type: ActionTypes.UPDATE_LAYERS,
        }),
      ).toEqual({
        baz: {
          whatever: {},
        },
        foo: {
          bar: { existing: 'props', some: 'data' },
          oof: {},
        },
      });
    });

    it('throws a useable error for the pre-migration flat action shape', () => {
      expect(() =>
        layersReducer(
          {},
          {
            canvasId,
            payload: { some: 'data' },
            type: ActionTypes.UPDATE_LAYERS,
            windowId,
          },
        ),
      ).toThrow(/updateLayers expects action.payload/);
    });

    it('throws a useable error when action.payload is missing entirely', () => {
      expect(() => layersReducer({}, { type: ActionTypes.UPDATE_LAYERS })).toThrow(/updateLayers expects action.payload/);
    });
  });

  describe('REMOVE_WINDOW', () => {
    it('removes the layers state for that window', () => {
      expect(layersReducer({ foo: { bar: { some: 'data' } } }, { type: ActionTypes.REMOVE_WINDOW, windowId })).toEqual({});
    });
  });
});
