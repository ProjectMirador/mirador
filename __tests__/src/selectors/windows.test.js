import manifestFixture001 from '../../fixtures/version-2/001.json';
import manifestFixture002 from '../../fixtures/version-2/002.json';
import manifestFixture019 from '../../fixtures/version-2/019.json';
import {
  getWindowTitles,
  getThumbnailNavigationPosition,
  getWindowViewType,
  getCompanionWindowForPosition,
  getCompanionWindowsOfWindow,
} from '../../../src/state/selectors/windows';


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
