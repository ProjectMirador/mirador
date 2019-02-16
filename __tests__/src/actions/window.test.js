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

  describe('setWindowCompanionWindow', () => {
    it('returns the appropriate action type', () => {
      const windowId = 'abc123';
      const panelType = 'info';
      const position = 'right';
      const expectedAction = {
        type: ActionTypes.SET_WINDOW_COMPANION_WINDOW,
        windowId,
        panelType,
        position,
      };
      expect(actions.setWindowCompanionWindow(windowId, 'info', 'right')).toEqual(expectedAction);
    });
  });

  describe('popOutCompanionWindow', () => {
    it('returns a thunk which dispatches the appropriate actions', () => {
      const mockDispatch = jest.fn();
      const windowId = 'abc123';
      const panelType = 'info';
      const position = 'right';
      const thunk = actions.popOutCompanionWindow(windowId, panelType, position);

      expect(typeof thunk).toEqual('function');
      thunk(mockDispatch);
      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: ActionTypes.SET_WINDOW_COMPANION_WINDOW, windowId, panelType, position,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: ActionTypes.TOGGLE_WINDOW_SIDE_BAR_PANEL, windowId, panelType: 'closed',
      });
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
});
