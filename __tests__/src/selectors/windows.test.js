import manifestFixture001 from '../../fixtures/version-2/001.json';
import manifestFixture002 from '../../fixtures/version-2/002.json';
import manifestFixture015 from '../../fixtures/version-2/015.json';
import manifestFixture019 from '../../fixtures/version-2/019.json';
import {
  getWindowTitles,
  getWindowViewType,
  getViewer,
  getWindowDraggability,
  getCanvasIndex,
  getWindowManifests,
  getWindows,
  getMaximizedWindowsIds,
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

describe('getMaximizedWindowsIds', () => {
  it('filters windows to only those maximized', () => {
    const state = {
      windows: {
        a: { id: 'a', maximized: true },
        b: { id: 'b' },
      },
    };

    const received = getMaximizedWindowsIds(state);

    expect(received).toEqual(['a']);
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
  it('returns the current canvasIndex for the window', () => {
    const state = {
      manifests: {
        y: { json: { ...manifestFixture015 } },
      },
      windows: {
        a: { canvasId: 'http://iiif.io/api/presentation/2.0/example/fixtures/canvas/15/c2.json', manifestId: 'y' },
      },
    };

    expect(getCanvasIndex(state, { windowId: 'a' })).toEqual(1);
  });
  it('defaults to the first canvas', () => {
    expect(getCanvasIndex({}, {})).toEqual(0);
  });
});

describe('getWindowViewType', () => {
  const state = {
    config: {
      window: {
        defaultView: 'default',
      },
    },
    manifests: {
      x: { json: { ...manifestFixture001 } },
      y: { json: { ...manifestFixture015 } },
    },
    windows: {
      a: { id: 'a', view: 'single' },
      b: { id: 'b' },
      d: { id: 'd', manifestId: 'x' },
      e: { id: 'e', manifestId: 'x', view: 'book' },
      f: { id: 'f', manifestId: 'y' },
    },
  };

  it('should return view type if window exists', () => {
    const received = getWindowViewType(state, { windowId: 'a' });
    expect(received).toBe('single');
  });

  it('should return the default if view type does not exist in window', () => {
    const received = getWindowViewType(state, { windowId: 'b' });
    expect(received).toBe('default');
  });

  it('should return the default if window does not exists', () => {
    const received = getWindowViewType(state, { windowId: 'c' });
    expect(received).toBe('default');
  });

  it('should return modified viewingHint if view type does not exist', () => {
    const received = getWindowViewType(state, { windowId: 'd' });
    expect(received).toEqual('single');
  });

  it('should return window view type even if viewingHint is available', () => {
    const received = getWindowViewType(state, { windowId: 'e' });
    expect(received).toEqual('book');
  });

  it('should return modified viewingHint for a book', () => {
    const received = getWindowViewType(state, { windowId: 'f' });
    expect(received).toEqual('book');
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

describe('getWindowDraggability', () => {
  describe('in elastic mode', () => {
    it('is always true', () => {
      const state = {
        windows: {},
        workspace: { type: 'elastic' },
      };
      const props = {};

      expect(getWindowDraggability(state, props)).toBe(true);
    });
  });

  describe('in non-elastic mode', () => {
    it('is false if there is only one window', () => {
      const state = {
        windows: { abc123: {} },
        workspace: { type: 'mosaic' },
      };
      const props = { windowId: 'abc123' };

      expect(getWindowDraggability(state, props)).toBe(false);
    });

    it('is false when the window is maximized', () => {
      const state = {
        windows: { abc123: { maximized: true }, abc321: { maximized: false } },
        workspace: { type: 'mosaic' },
      };
      const props = { windowId: 'abc123' };

      expect(getWindowDraggability(state, props)).toBe(false);
    });

    it('is true if there are many windows (as long as the window is not maximized)', () => {
      const state = {
        windows: { abc123: { maximized: false }, abc321: { maximized: false } },
        workspace: { type: 'mosaic' },
      };
      const props = { windowId: 'abc123' };

      expect(getWindowDraggability(state, props)).toBe(true);
    });
  });
});
