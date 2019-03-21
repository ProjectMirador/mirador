import manifestFixture001 from '../../fixtures/version-2/001.json';
import manifestFixture019 from '../../fixtures/version-2/019.json';
import {
  getSelectedCanvas,
  getSelectedCanvases,
  getCanvasLabel,
} from '../../../src/state/selectors/canvases';

describe('getSelectedCanvas', () => {
  const state = {
    manifests: {
      x: {
        id: 'x',
        json: manifestFixture019,
      },
    },
    windows: {
      a: {
        canvasIndex: 1,
        id: 'a',
        manifestId: 'x',
      },
    },
  };

  const noManifestationState = {
    manifests: {
      x: {
        id: 'x',
      },
    },
    windows: {
      a: {
        canvasIndex: 1,
        id: 'a',
        manifestId: 'x',
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
    manifests: {
      x: {
        id: 'x',
        json: manifestFixture019,
      },
    },
    windows: {
      a: {
        canvasIndex: 1,
        id: 'a',
        manifestId: 'x',
        view: 'book',
      },
    },
  };

  const noManifestationState = {
    manifests: {
      x: {
        id: 'x',
      },
    },
    windows: {
      a: {
        canvasIndex: 1,
        id: 'a',
        manifestId: 'x',
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

describe('getCanvasLabel', () => {
  it('should return label of the canvas', () => {
    const state = { manifests: { a: { json: manifestFixture001 } } };
    const received = getCanvasLabel(state, {
      canvasIndex: 0,
      manifestId: 'a',
    });
    expect(received).toBe('Whole Page');
  });

  it('should return undefined if the canvas is undefined', () => {
    const state = { manifests: { } };
    expect(getCanvasLabel(state, {
      canvasIndex: 0,
      manifestId: 'b',
    })).toBeUndefined();
  });

  it('should return the canvas index as (+1) as string if no label given', () => {
    const manifest = {
      '@context': 'http://iiif.io/api/presentation/2/context.json',
      '@id':
       'http://iiif.io/api/presentation/2.1/example/fixtures/19/manifest.json',
      '@type': 'sc:Manifest',
      sequences: [
        {
          canvases: [
            {
              '@id': 'some-canvas-without-a-label',
            },
          ],
        },
      ],
    };

    const state = { manifests: { a: { json: manifest } } };
    const received = getCanvasLabel(state, {
      canvasIndex: 0,
      manifestId: 'a',
    });
    expect(received).toBe('1');
  });
});
