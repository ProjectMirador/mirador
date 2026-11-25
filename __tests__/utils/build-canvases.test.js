import { buildCanvasesV2, buildCanvasesV3 } from './build-canvases';

describe('buildManifest', () => {
  it('builds a minimal Presentation 2 manifest', () => {
    expect(buildCanvasesV2()).toEqual([
      {
        '@id': 'canvas-1',
        '@type': 'sc:Canvas',
        label: 'Canvas 1',
      },
    ]);
  });

  it('builds a minimal Presentation 3 manifest', () => {
    expect(buildCanvasesV3()).toEqual([
      {
        id: 'canvas-1',
        label: {
          en: ['Canvas 1'],
        },
        type: 'Canvas',
      },
    ]);
  });

  it('supports custom IDs and labels for V2', () => {
    expect(
      buildCanvasesV2({
        count: 3,
        canvasOverrides: { 1: { label: 'override canvas 1' }, 2: { id: 'override-canvas-2' } },
      }),
    ).toEqual([
      {
        '@id': 'canvas-1',
        '@type': 'sc:Canvas',
        label: 'override canvas 1',
      },
      {
        '@id': 'override-canvas-2',
        '@type': 'sc:Canvas',
        label: 'Canvas 2',
      },
      {
        '@id': 'canvas-3',
        '@type': 'sc:Canvas',
        label: 'Canvas 3',
      },
    ]);
  });

  it('supports custom IDs and labels for V3', () => {
    expect(
      buildCanvasesV3({
        count: 3,
        canvasOverrides: { 1: { label: 'override canvas 1' }, 2: { id: 'override-canvas-2' } },
      }),
    ).toEqual([
      {
        id: 'canvas-1',
        type: 'Canvas',
        label: {
          en: ['override canvas 1'],
        },
      },
      {
        id: 'override-canvas-2',
        type: 'Canvas',
        label: {
          en: ['Canvas 2'],
        },
      },
      {
        id: 'canvas-3',
        type: 'Canvas',
        label: {
          en: ['Canvas 3'],
        },
      },
    ]);
  });
});
