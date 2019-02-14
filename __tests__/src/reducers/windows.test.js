import { windowsReducer } from '../../../src/state/reducers/windows';
import ActionTypes from '../../../src/state/actions/action-types';

describe('windows reducer', () => {
  it('should handle ADD_WINDOW', () => {
    expect(windowsReducer({}, {
      type: ActionTypes.ADD_WINDOW,
      window: { id: 'abc123' },
    })).toEqual({
      abc123: {
        id: 'abc123',
      },
    });
  });
  it('should handle REMOVE_WINDOW', () => {
    expect(windowsReducer({
      abc123: {
        id: 'abc123',
      },
      def456: {
        id: 'def456',
      },
    }, {
      type: ActionTypes.REMOVE_WINDOW,
      windowId: 'abc123',
    })).toEqual({
      def456: {
        id: 'def456',
      },
    });
  });

  it('should handle TOGGLE_WINDOW_SIDE_BAR by toggling the sideBarOpen attribute', () => {
    const action = {
      type: ActionTypes.TOGGLE_WINDOW_SIDE_BAR,
      windowId: 'abc123',
    };
    const before = {
      abc123: { sideBarOpen: true },
      abc321: { sideBarOpen: false },
    };
    const after = {
      abc123: { sideBarOpen: false },
      abc321: { sideBarOpen: false },
    };

    expect(windowsReducer(before, action)).toEqual(after);
  });

  it('should handle SET_WINDOW_THUMBNAIL_POSITION by changing the thumbnailNavigationPosition attribute', () => {
    const action = {
      type: ActionTypes.SET_WINDOW_THUMBNAIL_POSITION,
      windowId: 'abc123',
      position: 'right',
    };
    const before = {
      abc123: { thumbnailNavigationPosition: 'bottom' },
      abc321: { thumbnailNavigationPosition: 'off' },
    };
    const after = {
      abc123: { thumbnailNavigationPosition: 'right' },
      abc321: { thumbnailNavigationPosition: 'off' },
    };

    expect(windowsReducer(before, action)).toEqual(after);
  });

  it('should handle SET_WINDOW_VIEW_TYPE by changing the view attribute', () => {
    const action = {
      type: ActionTypes.SET_WINDOW_VIEW_TYPE,
      windowId: 'abc123',
      viewType: 'book',
    };
    const before = {
      abc123: { view: 'single' },
      abc321: { view: 'book' },
    };
    const after = {
      abc123: { view: 'book' },
      abc321: { view: 'book' },
    };

    expect(windowsReducer(before, action)).toEqual(after);
  });

  describe('TOGGLE_WINDOW_SIDE_BAR_PANEL', () => {
    it('sets the sideBarPanel value to the given value when it was changed', () => {
      const action = {
        type: ActionTypes.TOGGLE_WINDOW_SIDE_BAR_PANEL,
        windowId: 'abc123',
        panelType: 'info',
      };
      const before = {
        abc123: { sideBarPanel: 'closed' },
        abc321: { sideBarPanel: 'closed' },
      };
      const after = {
        abc123: { sideBarPanel: 'info' },
        abc321: { sideBarPanel: 'closed' },
      };

      expect(windowsReducer(before, action)).toEqual(after);
    });

    it('sets the sideBarPanel value to "closed" when trying to open a panel that already is open', () => {
      const action = {
        type: ActionTypes.TOGGLE_WINDOW_SIDE_BAR_PANEL,
        windowId: 'abc123',
        panelType: 'info',
      };
      const before = {
        abc123: { sideBarPanel: 'info' },
        abc321: { sideBarPanel: 'closed' },
      };
      const after = {
        abc123: { sideBarPanel: 'closed' },
        abc321: { sideBarPanel: 'closed' },
      };

      expect(windowsReducer(before, action)).toEqual(after);
    });
  });

  describe('SET_WINDOW_COMPANION_WINDOW', () => {
    it('sets the given type under the given position when no companion window exists', () => {
      const action = {
        type: ActionTypes.SET_WINDOW_COMPANION_WINDOW,
        windowId: 'abc123',
        position: 'right',
        panelType: 'info',
      };
      const before = {
        abc123: {},
      };
      const after = {
        abc123: { companionWindows: { right: 'info' } },
      };

      expect(windowsReducer(before, action)).toEqual(after);
    });

    it('overwrites the given position and sets the new type when a companion window in the same position exists', () => {
      const action = {
        type: ActionTypes.SET_WINDOW_COMPANION_WINDOW,
        windowId: 'abc123',
        position: 'right',
        panelType: 'info',
      };
      const before = {
        abc123: { companionWindows: { right: 'canvas_navigation' } },
      };
      const after = {
        abc123: { companionWindows: { right: 'info' } },
      };

      expect(windowsReducer(before, action)).toEqual(after);
    });
  });

  it('should handle NEXT_CANVAS', () => {
    expect(windowsReducer({
      abc123: {
        id: 'abc123',
        canvasIndex: 1,
      },
      def456: {
        id: 'def456',
        canvasIndex: 1,
      },
    }, {
      type: ActionTypes.NEXT_CANVAS,
      windowId: 'abc123',
    })).toEqual({
      abc123: {
        id: 'abc123',
        canvasIndex: 2,
      },
      def456: {
        id: 'def456',
        canvasIndex: 1,
      },
    });
  });
  it('should handle PREVIOUS_CANVAS', () => {
    expect(windowsReducer({
      abc123: {
        id: 'abc123',
        canvasIndex: 4,
      },
      def456: {
        id: 'def456',
        canvasIndex: 1,
      },
    }, {
      type: ActionTypes.PREVIOUS_CANVAS,
      windowId: 'abc123',
    })).toEqual({
      abc123: {
        id: 'abc123',
        canvasIndex: 3,
      },
      def456: {
        id: 'def456',
        canvasIndex: 1,
      },
    });
  });
  it('should handle SET_CANVAS', () => {
    expect(windowsReducer({
      abc123: {
        id: 'abc123',
        canvasIndex: 1,
      },
      def456: {
        id: 'def456',
        canvasIndex: 1,
      },
    }, {
      type: ActionTypes.SET_CANVAS,
      windowId: 'abc123',
      canvasIndex: 5,
    })).toEqual({
      abc123: {
        id: 'abc123',
        canvasIndex: 5,
      },
      def456: {
        id: 'def456',
        canvasIndex: 1,
      },
    });
  });

  it('should handle UPDATE_VIEWPORT', () => {
    expect(windowsReducer({
      abc123: {
        id: 'abc123',
      },
      def456: {
        id: 'def456',
      },
    }, {
      type: ActionTypes.UPDATE_VIEWPORT,
      windowId: 'abc123',
      payload: { x: 0, y: 1, zoom: 0.5 },
    })).toEqual({
      abc123: {
        id: 'abc123',
        viewer: { x: 0, y: 1, zoom: 0.5 },
      },
      def456: {
        id: 'def456',
      },
    });
  });
  it('should handle SET_WINDOW_SIZE', () => {
    expect(reducer({
      abc123: {
        id: 'abc123',
      },
      def456: {
        id: 'def456',
      },
    }, {
      type: ActionTypes.SET_WINDOW_SIZE,
      payload: {
        windowId: 'abc123',
        size: {
          x: 20,
          y: 20,
          width: 200,
          height: 200,
        },
      },
    })).toEqual({
      abc123: {
        id: 'abc123',
        x: 20,
        y: 20,
        width: 200,
        height: 200,
      },
      def456: {
        id: 'def456',
      },
    });
  });
  it('should handle UPDATE_WINDOW_POSITION', () => {
    expect(reducer({
      abc123: {
        id: 'abc123',
      },
      def456: {
        id: 'def456',
      },
    }, {
      type: ActionTypes.UPDATE_WINDOW_POSITION,
      payload: {
        windowId: 'abc123',
        position: {
          x: 20,
          y: 20,
        },
      },
    })).toEqual({
      abc123: {
        id: 'abc123',
        x: 20,
        y: 20,
      },
      def456: {
        id: 'def456',
      },
    });
  });
});
