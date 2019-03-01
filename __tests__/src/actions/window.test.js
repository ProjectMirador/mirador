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
          companionWindowIds: [],
          manifestId: null,
          rangeId: null,
          thumbnailNavigationPosition: 'bottom',
          x: 2700,
          y: 2700,
          width: 400,
          height: 400,
          rotation: null,
          view: 'single',
        },
      };
      expect(actions.addWindow(options)).toEqual(expectedAction);
    });
  });

  describe('updateWindow', () => {
    it('should return correct action object', () => {
      const payload = {
        foo: 1,
        bar: 2,
      };
      const action = actions.updateWindow('window-123', payload);
      expect(action.type).toBe(ActionTypes.UPDATE_WINDOW);
      expect(action.id).toBe('window-123');
      expect(action.payload).toEqual(payload);
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

  describe('setWindowViewType', () => {
    it('returns the appropriate action type', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.SET_WINDOW_VIEW_TYPE,
        windowId: id,
        viewType: 'book',
      };
      expect(actions.setWindowViewType(id, 'book')).toEqual(expectedAction);
    });
  });

  describe('setWindowSideBarPanel', () => {
    it('returns the appropriate action type', () => {
      const windowId = 'abc123';
      const panelType = 'panelType';
      const expectedAction = {
        type: ActionTypes.SET_WINDOW_SIDE_BAR_PANEL,
        windowId,
        panelType,
      };
      expect(actions.setWindowSideBarPanel(windowId, 'panelType')).toEqual(expectedAction);
    });
  });

  describe('setWindowSize', () => {
    it('returns the appropriate action type', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.SET_WINDOW_SIZE,
        payload: {
          windowId: id,
          size: {
            x: 20,
            y: 20,
            width: 200,
            height: 200,
          },
        },
      };
      expect(actions.setWindowSize(id, {
        x: 20,
        y: 20,
        width: 200,
        height: 200,
      })).toEqual(expectedAction);
    });
  });

  describe('updateWindowPosition', () => {
    it('returns the appropriate action type', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.UPDATE_WINDOW_POSITION,
        payload: {
          windowId: id,
          position: {
            x: 20,
            y: 20,
          },
        },
      };
      expect(actions.updateWindowPosition(id, {
        x: 20,
        y: 20,
      })).toEqual(expectedAction);
    });
  });
});
