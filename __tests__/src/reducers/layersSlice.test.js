import { layersReducer, updateLayers } from '../../../src/state/reducers/layersSlice';
import ActionTypes from '../../../src/state/actions/action-types';

describe('layers slice', () => {
  const windowId = 'foo';
  const canvasId = 'bar';

  describe('updateLayers action creator', () => {
    it('builds the expected action', () => {
      expect(updateLayers(windowId, canvasId, { some: 'data' })).toEqual({
        canvasId,
        payload: { some: 'data' },
        type: ActionTypes.UPDATE_LAYERS,
        windowId,
      });
    });
  });

  describe('UPDATE_LAYERS', () => {
    it('should handle UPDATE_LAYERS', () => {
      expect(layersReducer({}, updateLayers(windowId, canvasId, { some: 'data' }))).toEqual({
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

      expect(layersReducer(originalState, updateLayers(windowId, canvasId, { some: 'data' }))).toEqual({
        baz: {
          whatever: {},
        },
        foo: {
          bar: { existing: 'props', some: 'data' },
          oof: {},
        },
      });
    });
  });

  describe('REMOVE_WINDOW', () => {
    it('removes the layers entry for the removed window', () => {
      const originalState = {
        foo: { bar: { some: 'data' } },
        other: { baz: {} },
      };

      expect(layersReducer(originalState, { type: ActionTypes.REMOVE_WINDOW, windowId })).toEqual({
        other: { baz: {} },
      });
    });
  });
});
