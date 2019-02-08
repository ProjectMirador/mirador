import manifesto from 'manifesto.js';
import manifestFixture from '../../fixtures/version-2/001.json';
import {
  getWindowManifest,
  getManifestLogo,
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
    const manifest = { manifestation: manifesto.create(manifestFixture) };
    const received = getManifestLogo(manifest);
    expect(received).toEqual(manifestFixture.logo['@id']);
  });

  it('should return null if manifest has no logo', () => {
    const manifest = { manifestation: manifesto.create({}) };
    const received = getManifestLogo(manifest);
    expect(received).toBeNull();
  });
});
