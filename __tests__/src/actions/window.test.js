import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

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
          thumbnailNavigationPosition: 'bottom',
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

  describe('toggleWindowSideBar', () => {
    it('returns the appropriate action type', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.TOGGLE_WINDOW_SIDE_BAR,
        windowId: id,
      };
      expect(actions.toggleWindowSideBar(id)).toEqual(expectedAction);
    });
  });

  describe('setWindowThumbnailPosition', () => {
    it('returns the appropriate action type', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.SET_WINDOW_THUMBNAIL_POSITION,
        windowId: id,
        position: 'right',
      };
      expect(actions.setWindowThumbnailPosition(id, 'right')).toEqual(expectedAction);
    });
  });

  describe('toggleWindowSideBarPanel', () => {
    it('returns the appropriate action type', () => {
      const windowId = 'abc123';
      const panelType = 'panelType';
      const expectedAction = {
        type: ActionTypes.TOGGLE_WINDOW_SIDE_BAR_PANEL,
        windowId,
        panelType,
      };
      expect(actions.toggleWindowSideBarPanel(windowId, 'panelType')).toEqual(expectedAction);
    });
  });
});
