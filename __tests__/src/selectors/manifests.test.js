import manifesto from 'manifesto.js';
import manifestFixture001 from '../../fixtures/version-2/001.json';
import manifestFixture002 from '../../fixtures/version-2/002.json';
import manifestFixture019 from '../../fixtures/version-2/019.json';
import manifestFixtureWithAProvider from '../../fixtures/version-3/with_a_provider.json';
import {
  getDestructuredMetadata,
  getManifest,
  getManifestLogo,
  getManifestCanvases,
  getManifestDescription,
  getManifestProvider,
  getManifestTitle,
  getManifestThumbnail,
  getManifestMetadata,
} from '../../../src/state/selectors/manifests';


describe('getManifest()', () => {
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

  it('should return the manifest of a certain id', () => {
    const received = getManifest(state, { manifestId: 'x' });
    const expected = { id: 'x' };
    expect(received).toEqual(expected);
  });


  it('should return the manifest of a certain window', () => {
    const received = getManifest(state, { windowId: 'a' });
    const expected = { id: 'x' };
    expect(received).toEqual(expected);
  });

  it('should return undefined if window doesnt exist', () => {
    const received = getManifest(state, { windowId: 'unknown' });
    expect(received).toBeUndefined();
  });

  it('should return undefined if window has no manifest id', () => {
    const received = getManifest(state, { windowId: 'c' });
    expect(received).toBeUndefined();
  });

  it('should return undefined if manifest does not exist', () => {
    const received = getManifest(state, { windowId: 'b' });
    expect(received).toBeUndefined();
  });
});

describe('getManifestLogo()', () => {
  it('should return manifest logo id', () => {
    const received = getManifestLogo({ manifests: { x: { json: manifestFixture001 } } }, { manifestId: 'x' });
    expect(received).toEqual(manifestFixture001.logo['@id']);
  });

  it('should return null if manifest has no logo', () => {
    const received = getManifestLogo({ manifests: { x: {} } }, { manifestId: 'x' });
    expect(received).toBeUndefined();
  });
});

describe('getManifestThumbnail()', () => {
  it('should return manifest thumbnail id', () => {
    const state = { manifests: { x: { json: manifestFixture001 } } };
    const received = getManifestThumbnail(state, { manifestId: 'x' });
    expect(received).toEqual(manifestFixture001.thumbnail['@id']);
  });

  it('returns the first canvas thumbnail id', () => {
    const manifest = {
      '@context': 'http://iiif.io/api/presentation/2/context.json',
      '@id':
       'http://iiif.io/api/presentation/2.1/example/fixtures/19/manifest.json',
      '@type': 'sc:Manifest',
      sequences: [
        {
          canvases: [
            {
              thumbnail: { id: 'xyz' },
            },
          ],
        },
      ],
    };

    const state = { manifests: { x: { json: manifest } } };
    const received = getManifestThumbnail(state, { manifestId: 'x' });
    expect(received).toEqual('xyz');
  });

  it('returns a thumbnail sized image url from the first canvas', () => {
    const state = { manifests: { x: { json: manifestFixture019 } } };
    const received = getManifestThumbnail(state, { manifestId: 'x' });
    expect(received).toEqual('https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/full/,80/0/default.jpg');
  });

  it('should return null if manifest has no thumbnail', () => {
    const state = { manifests: { x: {} } };
    const received = getManifestThumbnail(state, { manifestId: 'x' });
    expect(received).toBeNull();
  });
});

describe('getManifestCanvases', () => {
  it('returns an empty array if the manifestation is not loaded', () => {
    const state = { manifests: { x: {} } };
    const received = getManifestCanvases(state, { manifestId: 'x' });
    expect(received).toEqual([]);
  });

  it('returns canvases from the manifest', () => {
    const state = { manifests: { x: { json: manifestFixture001 } } };
    const received = getManifestCanvases(state, { manifestId: 'x' });
    expect(received.length).toBe(1);
    expect(received[0].id).toBe('https://iiif.bodleian.ox.ac.uk/iiif/canvas/9cca8fdd-4a61-4429-8ac1-f648764b4d6d.json');
  });
});

describe('getManifestTitle', () => {
  it('should return manifest title', () => {
    const state = { manifests: { x: { json: manifestFixture001 } } };
    const received = getManifestTitle(state, { manifestId: 'x' });
    expect(received).toBe('Bodleian Library Human Freaks 2 (33)');
  });

  it('should return undefined if manifest undefined', () => {
    const received = getManifestTitle({ manifests: {} }, { manifestId: 'x' });
    expect(received).toBeUndefined();
  });
});

describe('getManifestDescription', () => {
  it('should return manifest description', () => {
    const state = { manifests: { x: { json: manifestFixture001 } } };
    const received = getManifestDescription(state, { manifestId: 'x' });
    expect(received).toBe('[Handbill of Mr. Becket, [1787] ]');
  });

  it('should return undefined if manifest undefined', () => {
    const received = getManifestDescription({ manifests: {} }, { manifestId: 'x' });
    expect(received).toBeUndefined();
  });
});

describe('getManifestProvider', () => {
  it('should return manifest provider label', () => {
    const state = { manifests: { x: { json: manifestFixtureWithAProvider } } };
    const received = getManifestProvider(state, { manifestId: 'x' });
    expect(received).toBe('Example Organization');
  });

  it('should return undefined if manifest undefined', () => {
    const received = getManifestProvider({ manifests: {} }, { manifestId: 'x' });
    expect(received).toBeUndefined();
  });
});
describe('getDestructuredMetadata', () => {
  it('should return the first value of label/value attributes for each object in the array ', () => {
    const iiifResource = manifesto.create(manifestFixture002);
    const received = getDestructuredMetadata(iiifResource);
    const expected = [{
      label: 'date',
      value: 'some date',
    }];

    expect(received).toEqual(expected);
  });

  it('returns an empty array if there is no metadata', () => {
    const iiifResource = manifesto.create(manifestFixture019);
    const received = getDestructuredMetadata(iiifResource);

    expect(received).toEqual([]);
  });
});

describe('getManifestMetadata', () => {
  it('should return the first value of label/value attributes for each object in the array ', () => {
    const state = { manifests: { x: { json: manifestFixture002 } } };
    const received = getManifestMetadata(state, { manifestId: 'x' });
    const expected = [{
      label: 'date',
      value: 'some date',
    }];

    expect(received).toEqual(expected);
  });

  it('returns an empty array if there is no metadata', () => {
    const iiifResource = manifesto.create(manifestFixture019);
    const received = getDestructuredMetadata(iiifResource);

    expect(received).toEqual([]);
  });
});
