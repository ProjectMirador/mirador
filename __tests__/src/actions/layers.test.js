import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

describe('layers actions', () => {
  describe('updateLayers', () => {
    it('sets the layers state', () => {
      const windowId = 'foo';
      const canvasId = 'bar';
      const expectedAction = {
        payload: { canvasId, some: 'data', windowId },
        type: ActionTypes.UPDATE_LAYERS,
      };
      expect(actions.updateLayers(windowId, canvasId, { some: 'data' })).toEqual(expectedAction);
    });
  });
});
