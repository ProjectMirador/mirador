import manifestFixture001 from '../../fixtures/version-2/001.json';
import manifestFixture002 from '../../fixtures/version-2/002.json';
import manifestFixture019 from '../../fixtures/version-2/019.json';
import {
  getCompanionAreaVisibility,
  getWindowTitles,
  getThumbnailNavigationPosition,
  getWindowViewType,
  getCompanionWindow,
  getCompanionWindowForPosition,
  getCompanionWindowsOfWindow,
  getViewer,
  getWindowDraggability,
  selectCompanionWindowDimensions,
  getCanvasIndex,
  getWindowManifests,
  getWindows,
  getMaximizedWindows,
} from '../../../src/state/selectors/windows';

describe('getWindows', () => {
  it('should return windows from state', () => {
    const state = {
      windows: {
        a: { manifestId: 'amanifest' },
        b: { manifestId: 'bmanifest' },
      },
    };

    const received = getWindows(state);

    expect(received).toEqual(state.windows);
  });
});

describe('getMaximizedWindows', () => {
  it('filters windows to only those maximized', () => {
    const state = {
      windows: {
        a: { manifestId: 'amanifest', maximized: true },
        b: { manifestId: 'bmanifest' },
      },
    };

    const received = getMaximizedWindows(state);

    expect(received.length).toEqual(1);
    expect(received[0].manifestId).toEqual('amanifest');
  });
});

describe('getWindowTitles', () => {
  it('should return manifest titles for the open windows', () => {
    const state = {
      manifests: {
        amanifest: { json: manifestFixture001 },
        bmanifest: { json: manifestFixture002 },
        cmanifest: { json: manifestFixture019 },
      },
      windows: {
        a: { manifestId: 'amanifest' },
        b: { manifestId: 'bmanifest' },
      },
    };

    const received = getWindowTitles(state);

    expect(received).toEqual({
      a: 'Bodleian Library Human Freaks 2 (33)',
      b: 'Test 2 Manifest: Metadata Pairs',
    });
  });
});

describe('getWindowManifests', () => {
  it('should return manifest titles for the open windows', () => {
    const state = {
      windows: {
        a: { manifestId: 'amanifest' },
        b: { manifestId: 'bmanifest' },
      },
    };

    const received = getWindowManifests(state);

    expect(received).toEqual(['amanifest', 'bmanifest']);
  });
});

describe('getCanvasIndex', () => {
  it('returns the index if provided', () => {
    expect(getCanvasIndex({}, { canvasIndex: 25 })).toEqual(25);
  });
  it('returns the current canvasIndex for the window if provided', () => {
    const state = {
      windows: {
        a: { canvasIndex: 13 },
      },
    };

    expect(getCanvasIndex(state, { windowId: 'a' })).toEqual(13);
  });
  it('returns the default canvasIndex for the manifest', () => {
    const state = {
      manifests: {
        x: { json: { ...manifestFixture019, start: { id: 'https://purl.stanford.edu/fr426cg9537/iiif/canvas/fr426cg9537_1' } } },
      },
      windows: {
        a: { manifestId: 'x' },
      },
    };

    expect(getCanvasIndex(state, { windowId: 'a' })).toEqual(1);
  });
  it('defaults to the first canvas', () => {
    expect(getCanvasIndex({}, {})).toEqual(0);
  });
});

describe('getThumbnailNavigationPosition', () => {
  const state = {
    companionWindows: {
      cw_a: { position: 'bottom' },
    },
    windows: {
      a: { id: 'a', thumbnailNavigationId: 'cw_a' },
      b: { id: 'b', thumbnailNavigationId: 'cw_b' },
    },
  };

  it('should return thumbnail navigation position if window exists', () => {
    const received = getThumbnailNavigationPosition(state, { windowId: 'a' });
    expect(received).toBe('bottom');
  });

  it('should return undefined if position does not exist in window', () => {
    const received = getThumbnailNavigationPosition(state, { windowId: 'b' });
    expect(received).toBeUndefined();
  });

  it('should return undefined if window does not exists', () => {
    const received = getThumbnailNavigationPosition(state, { windowId: 'c' });
    expect(received).toBeUndefined();
  });
});

describe('getWindowViewType', () => {
  const state = {
    windows: {
      a: { id: 'a', view: 'single' },
      b: { id: 'b' },
    },
  };

  it('should return view type if window exists', () => {
    const received = getWindowViewType(state, { windowId: 'a' });
    expect(received).toBe('single');
  });

  it('should return undefined if view type does not exist in window', () => {
    const received = getWindowViewType(state, { windowId: 'b' });
    expect(received).toBeUndefined();
  });

  it('should return undefined if window does not exists', () => {
    const received = getWindowViewType(state, { windowId: 'c' });
    expect(received).toBeUndefined();
  });
});

describe('getCompanionWindowForPosition', () => {
  const state = {
    companionWindows: {
      abc: { id: 'abc', position: 'right' },
      xyz: { id: 'xyz', position: 'bottom' },
    },
    windows: { a: { companionWindowIds: ['abc'] } },
  };

  it('the companion window type based on the given position', () => {
    const received = getCompanionWindowForPosition(state, {
      position: 'right',
      windowId: 'a',
    });

    expect(received.id).toEqual('abc');
  });

  it('returns undefined if the given window does not exist', () => {
    const received = getCompanionWindowForPosition(state, {
      position: 'right',
      windowId: 'c',
    });

    expect(received).toBeUndefined();
  });

  it('returns undefined if a companion window at the given position does not exist', () => {
    const received = getCompanionWindowForPosition(state, {
      position: 'bottom',
      windowId: 'a',
    });

    expect(received).toBeUndefined();
  });
});

describe('getCompanionWindow', () => {
  const state = {
    companionWindows: {
      bar: {
        content: 'canvas',
        id: 'bar',
      },
    },
  };

  it('should return companion windows for a given window id', () => {
    const received = getCompanionWindow(state, { companionWindowId: 'bar' });

    expect(received).toEqual({
      content: 'canvas',
      id: 'bar',
    });
  });
});

describe('getCompanionWindowsOfWindow', () => {
  const state = {
    companionWindows: {
      bar: {
        content: 'canvas',
        id: 'bar',
      },
      foo: {
        content: 'info',
        id: 'foo',
      },
    },
    windows: {
      abc123: {
        companionWindowIds: ['foo', 'bar'],
      },
    },
  };

  it('should return companion windows for a given window id', () => {
    const received = getCompanionWindowsOfWindow(state, { windowId: 'abc123' });

    expect(received).toEqual([
      {
        content: 'info',
        id: 'foo',
      },
      {
        content: 'canvas',
        id: 'bar',
      },
    ]);
  });
});

describe('getViewer', () => {
  const state = {
    viewers: {
      bar: {
        id: 'bar',
      },
    },
  };

  it('should return companion windows for a given window id', () => {
    const received = getViewer(state, { windowId: 'bar' });

    expect(received).toEqual({
      id: 'bar',
    });
  });
});

describe('getCompanionAreaVisibility', () => {
  describe('in the left position', () => {
    it('is true if the companionArea and sideBar are set to be open', () => {
      const state = {
        windows: {
          abc123: { companionAreaOpen: true, sideBarOpen: true },
        },
      };
      const props = { position: 'left', windowId: 'abc123' };

      expect(getCompanionAreaVisibility(state, props)).toBe(true);
    });

    it('is false if either companionArea or the sideBar are set to be closed', () => {
      const companionAreaClosedState = {
        windows: {
          abc123: { companionAreaOpen: false, sideBarOpen: true },
        },
      };
      const sideBarClosedState = {
        windows: {
          abc123: { companionAreaOpen: true, sideBarOpen: false },
        },
      };
      const props = { position: 'left', windowId: 'abc123' };

      expect(getCompanionAreaVisibility(companionAreaClosedState, props)).toBe(false);
      expect(getCompanionAreaVisibility(sideBarClosedState, props)).toBe(false);
    });
  });

  describe('in any non-left position', () => {
    it('is true', () => {
      const state = {
        windows: {
          abc123: { companionAreaOpen: false, sideBarOpen: false },
        },
      };
      const props = { position: 'right', windowId: 'abc123' };

      expect(getCompanionAreaVisibility(state, props)).toBe(true);
    });
  });
});

describe('getWindowDraggability', () => {
  describe('in elastic mode', () => {
    it('is always true', () => {
      const state = {
        config: { workspace: { type: 'elastic' } },
        windows: {},
      };
      const props = {};

      expect(getWindowDraggability(state, props)).toBe(true);
    });
  });

  describe('in non-elastic mode', () => {
    it('is false if there is only one window', () => {
      const state = {
        config: { workspace: { type: 'mosaic' } },
        windows: { abc123: {} },
      };
      const props = { windowId: 'abc123' };

      expect(getWindowDraggability(state, props)).toBe(false);
    });

    it('is false when the window is maximized', () => {
      const state = {
        config: { workspace: { type: 'mosaic' } },
        windows: { abc123: { maximized: true }, abc321: { maximized: false } },
      };
      const props = { windowId: 'abc123' };

      expect(getWindowDraggability(state, props)).toBe(false);
    });

    it('is true if there are many windows (as long as the window is not maximized)', () => {
      const state = {
        config: { workspace: { type: 'mosaic' } },
        windows: { abc123: { maximized: false }, abc321: { maximized: false } },
      };
      const props = { windowId: 'abc123' };

      expect(getWindowDraggability(state, props)).toBe(true);
    });
  });
});

describe('selectCompanionWindowDimensions', () => {
  it('tallies up the width/height of the companion windows', () => {
    const state = {
      companionWindows: {
        abc: { id: 'abc', position: 'right' },
        def: { id: 'def', position: 'right' },
        xyz: { id: 'xyz', position: 'bottom' },
      },
      windows: { a: { companionWindowIds: ['abc', 'def', 'xyz'] } },
    };

    const props = { windowId: 'a' };

    expect(selectCompanionWindowDimensions(state, props)).toEqual({
      height: 201,
      width: 235 * 2,
    });
  });
});
