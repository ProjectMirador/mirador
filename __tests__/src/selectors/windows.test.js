import manifestFixture001 from '../../fixtures/version-2/001.json';
import manifestFixture002 from '../../fixtures/version-2/002.json';
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
