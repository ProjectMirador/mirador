import * as actions from '../../actions/index';
import ActionTypes from '../../action-types';


describe('actions', () => {
  describe('addWindow', () => {
    it('should create a new window with merged defaults', () => {
      const options = {
        id: 'helloworld',
        canvasIndex: 1,
      };

      const expectedAction = {
        type: ActionTypes.ADD_WINDOW,
        payload: {
          id: 'helloworld',
          canvasIndex: 1,
          collectionIndex: 0,
          manifestIndex: 0,
          rangeId: null,
          xywh: null,
          rotation: null,
        },
      };
      expect(actions.addWindow(options)).toEqual(expectedAction);
    });
  });
  describe('removeWindow', () => {
    it('removes the window and returns windowId', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.REMOVE_WINDOW,
        windowId: id,
      };
      expect(actions.removeWindow(id)).toEqual(expectedAction);
    });
  });
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
});
