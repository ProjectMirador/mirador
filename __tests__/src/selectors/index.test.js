import manifesto from 'manifesto.js';
import manifestFixture001 from '../../fixtures/version-2/001.json';
import manifestFixture002 from '../../fixtures/version-2/002.json';
import manifestFixture019 from '../../fixtures/version-2/019.json';
import {
  getCanvasLabel,
  getDestructuredMetadata,
  getSelectedCanvas,
  getWindowManifest,
  getManifestLogo,
  getManifestCanvases,
  getManifestDescription,
  getThumbnailNavigationPosition,
  getManifestTitle,
  getManifestThumbnail,
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

describe('getManifestThumbnail()', () => {
  it('should return manifest thumbnail id', () => {
    const manifest = { manifestation: manifesto.create(manifestFixture001) };
    const received = getManifestThumbnail(manifest);
    expect(received).toEqual(manifestFixture001.thumbnail['@id']);
  });

  it('should return null if manifest has no thumbnail', () => {
    const manifest = { manifestation: manifesto.create({}) };
    const received = getManifestThumbnail(manifest);
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

describe('getManifestDescription', () => {
  it('should return manifest description', () => {
    const manifest = { manifestation: manifesto.create(manifestFixture001) };
    const received = getManifestDescription(manifest);
    expect(received).toBe('[Handbill of Mr. Becket, [1787] ]');
  });

  it('should return undefined if manifest undefined', () => {
    const received = getManifestDescription(undefined);
    expect(received).toBeUndefined();
  });

  it('should return undefined if no manifestation', () => {
    const manifest = {};
    const received = getManifestDescription(manifest);
    expect(received).toBeUndefined();
  });
});

describe('getSelectedCanvas', () => {
  const state = {
    windows: {
      a: {
        id: 'a',
        manifestId: 'x',
        canvasIndex: 1,
      },
    },
    manifests: {
      x: {
        id: 'x',
        manifestation: manifesto.create(manifestFixture019),
      },
    },
  };

  const noManifestationState = {
    windows: {
      a: {
        id: 'a',
        manifestId: 'x',
        canvasIndex: 1,
      },
    },
    manifests: {
      x: {
        id: 'x',
      },
    },
  };

  it('should return canvas based on the canvas index stored window state', () => {
    const selectedCanvas = getSelectedCanvas(state, 'a');

    expect(selectedCanvas.id).toEqual(
      'https://purl.stanford.edu/fr426cg9537/iiif/canvas/fr426cg9537_1',
    );
  });

  it('should return an empty object when there is no manifestation to get a canvas from', () => {
    const selectedCanvas = getSelectedCanvas(noManifestationState, 'a');

    expect(selectedCanvas).toEqual({});
  });
});

describe('getCanvasLabel', () => {
  it('should return label of the canvas', () => {
    const canvas = manifesto
      .create(manifestFixture001)
      .getSequences()[0]
      .getCanvases()[0];

    const received = getCanvasLabel(canvas);
    expect(received).toBe('Whole Page');
  });

  it('should return the given canvas index (+1) if the canvas is undefined', () => {
    expect(getCanvasLabel(undefined)).toBe(1);
    expect(getCanvasLabel(undefined, 2)).toBe(3);
  });

  it('should return the canvas index (+1) if no manifestation', () => {
    const canvas = { getLabel: () => {} };
    const received = getCanvasLabel(canvas);
    expect(received).toBe(1);
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
