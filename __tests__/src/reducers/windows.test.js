import { windowsReducer } from '../../../src/state/reducers/windows';
import ActionTypes from '../../../src/state/actions/action-types';
import manifestJson from '../../fixtures/version-2/019.json';

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
  it('should handle RECEIVE_MANIFEST', () => {
    const state = {
      window: {
        canvasIndex: 1,
        manifestId: 'a',
      },
      window2: {
      },
    };
    expect(windowsReducer(state, {
      manifestId: 'a',
      manifestJson,
      type: ActionTypes.RECEIVE_MANIFEST,
    })).toEqual({
      window: {
        canvasId: 'https://purl.stanford.edu/fr426cg9537/iiif/canvas/fr426cg9537_1',
        canvasIndex: undefined,
        manifestId: 'a',
      },
      window2: {},
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
      viewType: 'book',
      windowId: 'abc123',
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
        panelType: 'info',
        type: ActionTypes.SET_WINDOW_SIDE_BAR_PANEL,
        windowId: 'abc123',
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
        canvasId: 'http://example.com/canvas/1',
        id: 'abc123',
      },
      def456: {
        canvasId: 'http://example.com/canvas/1',
        id: 'def456',
      },
    }, {
      canvasId: 'http://example.com/canvas/5',
      selectedContentSearchAnnotation: 'xyz',
      type: ActionTypes.SET_CANVAS,
      windowId: 'abc123',
    })).toEqual({
      abc123: {
        canvasId: 'http://example.com/canvas/5',
        id: 'abc123',
        selectedContentSearchAnnotation: 'xyz',
      },
      def456: {
        canvasId: 'http://example.com/canvas/1',
        id: 'def456',
      },
    });
  });

  describe('UPDATE_WINDOW', () => {
    it('updates an existing window', () => {
      const action = {
        id: 'abc123',
        payload: {
          baz: 33,
          foo: 11,
        },
        type: ActionTypes.UPDATE_WINDOW,
      };
      const beforeState = {
        abc123: {
          bar: 2,
          foo: 1,
        },
      };
      const expectedState = {
        abc123: {
          bar: 2,
          baz: 33,
          foo: 11,
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
      payload: {
        size: {
          height: 200,
          width: 200,
          x: 20,
          y: 20,
        },
        windowId: 'abc123',
      },
      type: ActionTypes.SET_WINDOW_SIZE,
    })).toEqual({
      abc123: {
        height: 200,
        id: 'abc123',
        width: 200,
        x: 20,
        y: 20,
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
      payload: {
        position: {
          x: 20,
          y: 20,
        },
        windowId: 'abc123',
      },
      type: ActionTypes.UPDATE_WINDOW_POSITION,
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
        companionWindowIds: ['123'],
        id: 'abc123',
      },
    }, {
      id: 'xyz',
      payload: {
        position: 'right',
      },
      type: ActionTypes.ADD_COMPANION_WINDOW,
      windowId: 'abc123',
    })).toEqual({
      abc123: {
        companionWindowIds: ['123', 'xyz'],
        id: 'abc123',
      },
    });

    // on the left, replaces all ids of windows in that position and sets some additional properties
    expect(windowsReducer({
      abc123: {
        companionWindowIds: ['left123'],
        id: 'abc123',
      },
    }, {
      companionWindows: {
        left123: { position: 'left' },
      },
      id: 'xyz',
      payload: {
        content: 'content',
        position: 'left',
      },
      type: ActionTypes.ADD_COMPANION_WINDOW,
      windowId: 'abc123',
    })).toEqual({
      abc123: {
        companionAreaOpen: true,
        companionWindowIds: ['xyz'],
        id: 'abc123',
        sideBarPanel: 'content',
      },
    });
  });

  it('should handle UPDATE_COMPANION_WINDOW', () => {
    // opens the companion area to if the companion window was on the left
    expect(windowsReducer({
      abc123: {
        companionAreaOpen: false,
      },
    }, {
      id: 'xyz',
      payload: {
        position: 'left',
      },
      type: ActionTypes.UPDATE_COMPANION_WINDOW,
      windowId: 'abc123',
    })).toEqual({
      abc123: {
        companionAreaOpen: true,
      },
    });

    // does nothing if the companion window wasn't on the left
    expect(windowsReducer({
      abc123: {
        companionAreaOpen: false,
      },
    }, {
      id: 'xyz',
      payload: {
        position: 'right',
      },
      type: ActionTypes.UPDATE_COMPANION_WINDOW,
      windowId: 'abc123',
    })).toEqual({
      abc123: {
        companionAreaOpen: false,
      },
    });
  });

  it('should handle REMOVE_COMPANION_WINDOW', () => {
    // on the right, just tacks the new id on
    expect(windowsReducer({
      abc123: {
        companionWindowIds: ['123', 'xyz'],
        id: 'abc123',
      },
    }, {
      id: 'xyz',
      type: ActionTypes.REMOVE_COMPANION_WINDOW,
      windowId: 'abc123',
    })).toEqual({
      abc123: {
        companionWindowIds: ['123'],
        id: 'abc123',
      },
    });
  });

  describe('SELECT_ANNOTATION', () => {
    it('handles when no selectedAnnotations exist', () => {
      const beforeState = { abc123: {} };
      const action = {
        annotationId: 'aId',
        targetId: 'cId',
        type: ActionTypes.SELECT_ANNOTATION,
        windowId: 'abc123',
      };
      const expectedState = {
        abc123: { selectedAnnotations: { cId: ['aId'] } },
      };

      expect(windowsReducer(beforeState, action)).toEqual(expectedState);
    });

    it('adds new annotation IDs to existing canvas IDs', () => {
      const beforeState = { abc123: { selectedAnnotations: { cId: ['prevId'] } } };
      const action = {
        annotationId: 'aId',
        targetId: 'cId',
        type: ActionTypes.SELECT_ANNOTATION,
        windowId: 'abc123',
      };
      const expectedState = {
        abc123: { selectedAnnotations: { cId: ['prevId', 'aId'] } },
      };

      expect(windowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });

  describe('DESELECT_ANNOTATION', () => {
    it('remvoves the given annotation Id', () => {
      const beforeState = { abc123: { selectedAnnotations: { cId: ['aId1', 'aId2'] } } };
      const action = {
        annotationId: 'aId1',
        targetId: 'cId',
        type: ActionTypes.DESELECT_ANNOTATION,
        windowId: 'abc123',
      };
      const expectedState = {
        abc123: { selectedAnnotations: { cId: ['aId2'] } },
      };

      expect(windowsReducer(beforeState, action)).toEqual(expectedState);
    });

    it('remvoves the given canvas Id from the selected annotations if there are no more IDs', () => {
      const beforeState = { abc123: { selectedAnnotations: { cId1: ['aId1'], cId2: ['aId2'] } } };
      const action = {
        annotationId: 'aId2',
        targetId: 'cId2',
        type: ActionTypes.DESELECT_ANNOTATION,
        windowId: 'abc123',
      };
      const expectedState = {
        abc123: { selectedAnnotations: { cId1: ['aId1'] } },
      };

      expect(windowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });

  describe('TOGGLE_ANNOTATION_DISPLAY', () => {
    it('handles TOGGLE_ANNOTATION_DISPLAY by toggling the given window\'s displayAllAnnotation value', () => {
      const beforeState = { abc123: { displayAllAnnotations: false } };
      const action = {
        type: ActionTypes.TOGGLE_ANNOTATION_DISPLAY, windowId: 'abc123',
      };
      const expectedState = {
        abc123: { displayAllAnnotations: true },
      };

      expect(windowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });

  describe('HIGHLIGHT_ANNOTATION', () => {
    it('sets the highlightedAnnotation attribute on the given window', () => {
      const beforeState = { abc123: {} };
      const action = {
        annotationId: 'aaa123', type: ActionTypes.HIGHLIGHT_ANNOTATION, windowId: 'abc123',
      };
      const expectedState = {
        abc123: { highlightedAnnotation: 'aaa123' },
      };

      expect(windowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });

  describe('SELECT_CONTENT_SEARCH_ANNOTATION', () => {
    it('sets the highlightedAnnotation attribute on the given window', () => {
      const beforeState = { abc123: {} };
      const action = {
        annotationId: ['aaa123'], canvasId: 'info:canvas/5', type: ActionTypes.SELECT_CONTENT_SEARCH_ANNOTATION, windowId: 'abc123',
      };
      const expectedState = {
        abc123: { canvasId: 'info:canvas/5', selectedContentSearchAnnotation: ['aaa123'] },
      };

      expect(windowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });

  it('should handle IMPORT_MIRADOR_STATE', () => {
    expect(windowsReducer({}, {
      state: { windows: { new: 'stuff' } },
      type: ActionTypes.IMPORT_MIRADOR_STATE,
    })).toEqual({ new: 'stuff' });
  });

  describe('RECEIVE_SEARCH', () => {
    it('set the canvas index and annotation id if provided', () => {
      const beforeState = { abc123: {} };
      const action = {
        annotationId: 'aaa123', canvasId: 'info:canvas/5', type: ActionTypes.RECEIVE_SEARCH, windowId: 'abc123',
      };
      const expectedState = {
        abc123: { canvasId: 'info:canvas/5', selectedContentSearchAnnotation: ['aaa123'] },
      };

      expect(windowsReducer(beforeState, action)).toEqual(expectedState);
    });
    it('passes through existing data otherwise', () => {
      const beforeState = { abc123: { canvasId: 'info:canvas/5', selectedContentSearchAnnotation: ['aaa123'] } };
      const action = {
        type: ActionTypes.RECEIVE_SEARCH, windowId: 'abc123',
      };
      const expectedState = {
        abc123: { canvasId: 'info:canvas/5', selectedContentSearchAnnotation: ['aaa123'] },
      };

      expect(windowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });
});
