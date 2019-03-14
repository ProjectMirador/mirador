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
  it('should handle MAXIMIZE_WINDOW', () => {
    const action = {
      type: ActionTypes.MAXIMIZE_WINDOW,
      windowId: 'abc123',
    };
    const before = {
      abc123: { maximized: false },
      abc321: { maximized: false },
    };
    const after = {
      abc123: { maximized: true },
      abc321: { maximized: false },
    };

    expect(windowsReducer(before, action)).toEqual(after);
  });
  it('should handle MINIMIZE_WINDOW', () => {
    const action = {
      type: ActionTypes.MINIMIZE_WINDOW,
      windowId: 'abc123',
    };
    const before = {
      abc123: { maximized: true },
      abc321: { maximized: false },
    };
    const after = {
      abc123: { maximized: false },
      abc321: { maximized: false },
    };

    expect(windowsReducer(before, action)).toEqual(after);
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

  describe('SET_WINDOW_SIDE_BAR_PANEL', () => {
    it('sets the sideBarPanel value to the given value when it was changed', () => {
      const action = {
        type: ActionTypes.SET_WINDOW_SIDE_BAR_PANEL,
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

  describe('UPDATE_WINDOW', () => {
    it('updates an existing window', () => {
      const action = {
        type: ActionTypes.UPDATE_WINDOW,
        id: 'abc123',
        payload: { foo: 11, baz: 33 },
      };
      const beforeState = {
        abc123: {
          foo: 1,
          bar: 2,
        },
      };
      const expectedState = {
        abc123: {
          foo: 11,
          bar: 2,
          baz: 33,
        },
      };
      expect(windowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });

  it('should handle SET_WINDOW_SIZE', () => {
    expect(windowsReducer({
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
    expect(windowsReducer({
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

  it('should handle ADD_COMPANION_WINDOW', () => {
    // on the right, just tacks the new id on
    expect(windowsReducer({
      abc123: {
        id: 'abc123',
        companionWindowIds: ['123'],
      },
    }, {
      type: ActionTypes.ADD_COMPANION_WINDOW,
      id: 'xyz',
      windowId: 'abc123',
      payload: {
        position: 'right',
      },
    })).toEqual({
      abc123: {
        id: 'abc123',
        companionWindowIds: ['123', 'xyz'],
      },
    });

    // on the left, replaces all ids of windows in that position and sets some additional properties
    expect(windowsReducer({
      abc123: {
        id: 'abc123',
        companionWindowIds: ['left123'],
      },
    }, {
      type: ActionTypes.ADD_COMPANION_WINDOW,
      id: 'xyz',
      windowId: 'abc123',
      companionWindows: {
        left123: { position: 'left' },
      },
      payload: {
        content: 'content',
        position: 'left',
      },
    })).toEqual({
      abc123: {
        id: 'abc123',
        companionAreaOpen: true,
        sideBarPanel: 'content',
        companionWindowIds: ['xyz'],
      },
    });
  });

  it('should handle REMOVE_COMPANION_WINDOW', () => {
    // on the right, just tacks the new id on
    expect(windowsReducer({
      abc123: {
        id: 'abc123',
        companionWindowIds: ['123', 'xyz'],
      },
    }, {
      type: ActionTypes.REMOVE_COMPANION_WINDOW,
      id: 'xyz',
      windowId: 'abc123',
    })).toEqual({
      abc123: {
        id: 'abc123',
        companionWindowIds: ['123'],
      },
    });
  });
});
