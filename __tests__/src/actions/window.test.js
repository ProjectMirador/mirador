import * as actions from '../../../src/actions/index';
import ActionTypes from '../../../src/action-types';

describe('window actions', () => {
  describe('addWindow', () => {
    it('should create a new window with merged defaults', () => {
      const options = {
        id: 'helloworld',
        canvasIndex: 1,
      };

      const expectedAction = {
        type: ActionTypes.ADD_WINDOW,
        window: {
          id: 'helloworld',
          canvasIndex: 1,
          collectionIndex: 0,
          manifestId: null,
          rangeId: null,
          xywh: [0, 0, 400, 400],
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
});
