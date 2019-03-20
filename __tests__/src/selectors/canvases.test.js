import manifestFixture019 from '../../fixtures/version-2/019.json';
import {
  getSelectedCanvas,
  getSelectedCanvases,
} from '../../../src/state/selectors/canvases';

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
        json: manifestFixture019,
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
    const selectedCanvas = getSelectedCanvas(state, { windowId: 'a' });

    expect(selectedCanvas.id).toEqual(
      'https://purl.stanford.edu/fr426cg9537/iiif/canvas/fr426cg9537_1',
    );
  });

  it('should return undefined when there is no manifestation to get a canvas from', () => {
    const selectedCanvas = getSelectedCanvas(noManifestationState, { windowId: 'a' });

    expect(selectedCanvas).toBeUndefined();
  });
});

describe('getSelectedCanvases', () => {
  const state = {
    windows: {
      a: {
        id: 'a',
        manifestId: 'x',
        canvasIndex: 1,
        view: 'book',
      },
    },
    manifests: {
      x: {
        id: 'x',
        json: manifestFixture019,
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

  it('should return canvas groupings based on the canvas index stored window state', () => {
    const selectedCanvases = getSelectedCanvases(state, { windowId: 'a' });

    expect(selectedCanvases.length).toEqual(2);
    expect(selectedCanvases.map(canvas => canvas.id)).toEqual([
      'https://purl.stanford.edu/fr426cg9537/iiif/canvas/fr426cg9537_1',
      'https://purl.stanford.edu/rz176rt6531/iiif/canvas/rz176rt6531_1',
    ]);
  });

  it('should return undefined when there is no manifestation to get a canvas from', () => {
    const selectedCanvas = getSelectedCanvases(noManifestationState, { windowId: 'a' });

    expect(selectedCanvas).toBeUndefined();
  });
});
