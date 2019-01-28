import * as actions from '../../../src/actions/index';
import ActionTypes from '../../../src/action-types';

describe('canvas actions', () => {
  describe('nextCanvas', () => {
    it('moves to the next canvas', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.NEXT_CANVAS,
        windowId: id,
      };
      expect(actions.nextCanvas(id)).toEqual(expectedAction);
    });
  });
  describe('previousCanvas', () => {
    it('moves to the previous canvas', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.PREVIOUS_CANVAS,
        windowId: id,
      };
      expect(actions.previousCanvas(id)).toEqual(expectedAction);
    });
  });
  describe('setCanvas', () => {
    it('sets to a defined canvas', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.SET_CANVAS,
        windowId: id,
        canvasIndex: 100,
      };
      expect(actions.setCanvas(id, 100)).toEqual(expectedAction);
    });
  });
});
