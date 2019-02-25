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
          xywh: [0, 0, 400, 400],
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

  describe('popOutCompanionWindow', () => {
    it('returns a thunk which dispatches the appropriate actions', () => {
      const mockState = {
        windows: {
          abc123: {
            companionWindowIds: ['cw-1'],
          },
        },
      };
      const mockDispatch = jest.fn(() => ({ id: 'cw-2' }));
      const mockGetState = jest.fn(() => mockState);
      const windowId = 'abc123';
      const panelType = 'info';
      const position = 'right';
      const thunk = actions.popOutCompanionWindow(windowId, panelType, position);

      expect(typeof thunk).toEqual('function');
      thunk(mockDispatch, mockGetState);
      expect(mockDispatch).toHaveBeenCalledTimes(3);

      const addCompanionWindowAction = mockDispatch.mock.calls[0][0];
      expect(addCompanionWindowAction.type).toBe(ActionTypes.ADD_COMPANION_WINDOW);
      expect(addCompanionWindowAction.id).toMatch(/cw-.*/);
      expect(addCompanionWindowAction.payload.content).toEqual('info');
      expect(addCompanionWindowAction.payload.position).toEqual('right');
      expect(addCompanionWindowAction.payload.id).toMatch(/cw-.*/);

      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        type: ActionTypes.UPDATE_WINDOW,
        id: 'abc123',
        payload: { companionWindowIds: ['cw-1', 'cw-2'] },
      });

      expect(mockDispatch).toHaveBeenNthCalledWith(3, {
        type: ActionTypes.TOGGLE_WINDOW_SIDE_BAR_PANEL, windowId, panelType: 'closed',
      });
    });
  });
});
