import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

describe('layers actions', () => {
  describe('updateLayers', () => {
    it('sets the layers state from the legacy positional call', () => {
      const windowId = 'foo';
      const canvasId = 'bar';
      const expectedAction = {
        payload: { canvasId, some: 'data', windowId },
        type: ActionTypes.UPDATE_LAYERS,
      };
      expect(actions.updateLayers(windowId, canvasId, { some: 'data' })).toEqual(expectedAction);
    });

    it('sets the layers state from a single-object call', () => {
      const expectedAction = {
        payload: { canvasId: 'bar', some: 'data', windowId: 'foo' },
        type: ActionTypes.UPDATE_LAYERS,
      };
      expect(actions.updateLayers({ canvasId: 'bar', some: 'data', windowId: 'foo' })).toEqual(expectedAction);
    });
  });
});
