import manifesto from 'manifesto.js';
import manifestFixture001 from '../../fixtures/version-2/001.json';
import {
  getWindowManifest,
  getManifestLogo,
  getManifestCanvases,
  getThumbnailNavigationPosition,
  getManifestTitle,
  getWindowViewType,
} from '../../../src/state/selectors';


describe('getWindowManifest()', () => {
  const state = {
    windows: {
      a: { id: 'a', manifestId: 'x' },
      b: { id: 'b', manifestId: 'y' },
      c: { id: 'c' },
    },
    manifests: {
      x: { id: 'x' },
    },
  };

  it('should return the manifest of a certain window', () => {
    const received = getWindowManifest(state, 'a');
    const expected = { id: 'x' };
    expect(received).toEqual(expected);
  });

  it('should return undefined if window doesnt exist', () => {
    const received = getWindowManifest(state, 'unknown');
    expect(received).toBeUndefined();
  });

  it('should return undefined if window has no manifest id', () => {
    const received = getWindowManifest(state, 'c');
    expect(received).toBeUndefined();
  });

  it('should return undefined if manifest does not exist', () => {
    const received = getWindowManifest(state, 'b');
    expect(received).toBeUndefined();
  });
});

describe('getManifestLogo()', () => {
  it('should return manifest logo id', () => {
    const manifest = { manifestation: manifesto.create(manifestFixture001) };
    const received = getManifestLogo(manifest);
    expect(received).toEqual(manifestFixture001.logo['@id']);
  });

  it('should return null if manifest has no logo', () => {
    const manifest = { manifestation: manifesto.create({}) };
    const received = getManifestLogo(manifest);
    expect(received).toBeNull();
  });
});

describe('getManifestCanvases', () => {
  it('returns an empty array if the manifestation is not loaded', () => {
    const manifest = {};
    const received = getManifestCanvases(manifest);
    expect(received).toEqual([]);
  });

  it('returns canvases from the manifest', () => {
    const manifest = { manifestation: manifesto.create(manifestFixture001) };
    const received = getManifestCanvases(manifest);
    expect(received.length).toBe(1);
    expect(received[0].id).toBe('https://iiif.bodleian.ox.ac.uk/iiif/canvas/9cca8fdd-4a61-4429-8ac1-f648764b4d6d.json');
  });
});

describe('getThumbnailNavigationPosition', () => {
  const state = {
    windows: {
      a: { id: 'a', thumbnailNavigationPosition: 'bottom' },
      b: { id: 'b' },
    },
  };

  it('should return thumbnail navigation position if window exists', () => {
    const received = getThumbnailNavigationPosition(state, 'a');
    expect(received).toBe('bottom');
  });

  it('should return undefined if position does not exist in window', () => {
    const received = getThumbnailNavigationPosition(state, 'b');
    expect(received).toBeUndefined();
  });

  it('should return undefined if window does not exists', () => {
    const received = getThumbnailNavigationPosition(state, 'c');
    expect(received).toBeUndefined();
  });
});

describe('getManifestTitle', () => {
  it('should return manifest title', () => {
    const manifest = { manifestation: manifesto.create(manifestFixture001) };
    const received = getManifestTitle(manifest);
    expect(received).toBe('Bodleian Library Human Freaks 2 (33)');
  });

  it('should return undefined if manifest undefined', () => {
    const received = getManifestTitle(undefined);
    expect(received).toBeUndefined();
  });

  it('should return undefined if no manifestation', () => {
    const manifest = {};
    const received = getManifestTitle(manifest);
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
    const received = getWindowViewType(state, 'a');
    expect(received).toBe('single');
  });

  it('should return undefined if view type does not exist in window', () => {
    const received = getWindowViewType(state, 'b');
    expect(received).toBeUndefined();
  });

  it('should return undefined if window does not exists', () => {
    const received = getWindowViewType(state, 'c');
    expect(received).toBeUndefined();
  });
});
