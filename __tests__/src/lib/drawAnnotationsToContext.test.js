import { drawAnnotationsToContext } from '../../../src/lib/drawAnnotationsToContext';
import CanvasAnnotationDisplay from '../../../src/lib/CanvasAnnotationDisplay';

vi.mock('../../../src/lib/CanvasAnnotationDisplay', () => ({
  default: vi.fn(),
}));

describe('drawAnnotationsToContext', () => {
  let context;
  let osdCanvasOverlay;
  let canvasWorld;
  let toContext;

  beforeEach(() => {
    vi.clearAllMocks();
    toContext = vi.fn();
    CanvasAnnotationDisplay.mockImplementation(function CanvasAnnotationDisplayMock() {
      return { toContext };
    });

    context = {};
    osdCanvasOverlay = {
      context2d: context,
      scale: 0.75,
    };
    canvasWorld = {
      canvases: [{ id: 'canvas-1' }, { id: 'canvas-2' }],
    };
  });

  /** */
  function baseOptions(overrides = {}) {
    return {
      canvasWorld,
      highlightAllAnnotations: false,
      hoveredAnnotationIds: [],
      osdCanvasOverlay,
      selectedAnnotationId: null,
      ...overrides,
    };
  }

  it('constructs a CanvasAnnotationDisplay for each resource across all annotations and draws it', () => {
    const resourceA = { id: 'r1', targetId: 'canvas-1' };
    const resourceB = { id: 'r2', targetId: 'canvas-2' };
    const annotations = [{ resources: [resourceA] }, { resources: [resourceB] }];

    drawAnnotationsToContext(annotations, { default: {} }, baseOptions());

    expect(CanvasAnnotationDisplay).toHaveBeenCalledTimes(2);
    expect(toContext).toHaveBeenCalledTimes(2);
    expect(toContext).toHaveBeenCalledWith(context);
  });

  it('skips a resource whose targetId has no matching canvas', () => {
    const resource = { id: 'r1', targetId: 'missing-canvas' };

    drawAnnotationsToContext([{ resources: [resource] }], { default: {} }, baseOptions());

    expect(CanvasAnnotationDisplay).not.toHaveBeenCalled();
    expect(toContext).not.toHaveBeenCalled();
  });

  it('marks a resource as hovered only when its id is in hoveredAnnotationIds', () => {
    const resource = { id: 'r1', targetId: 'canvas-1' };

    drawAnnotationsToContext([{ resources: [resource] }], { default: {} }, baseOptions({ hoveredAnnotationIds: ['r1'] }));

    expect(CanvasAnnotationDisplay).toHaveBeenCalledWith(expect.objectContaining({ hovered: true, selected: false }));
  });

  it('marks a resource as selected only when its id matches selectedAnnotationId', () => {
    const resource = { id: 'r1', targetId: 'canvas-1' };

    drawAnnotationsToContext([{ resources: [resource] }], { default: {} }, baseOptions({ selectedAnnotationId: 'r1' }));

    expect(CanvasAnnotationDisplay).toHaveBeenCalledWith(expect.objectContaining({ hovered: false, selected: true }));
  });

  it('passes canvasWorld, resource, and the overlay scale through to each display', () => {
    const resource = { id: 'r1', targetId: 'canvas-1' };

    drawAnnotationsToContext([{ resources: [resource] }], { default: {} }, baseOptions());

    expect(CanvasAnnotationDisplay).toHaveBeenCalledWith(expect.objectContaining({ canvasWorld, overlayScale: 0.75, resource }));
  });

  describe('palette', () => {
    it('uses the palette default as-is when highlightAllAnnotations is true', () => {
      const resource = { id: 'r1', targetId: 'canvas-1' };
      const currentPalette = { default: { globalAlpha: 1 }, hidden: { globalAlpha: 0.2 } };

      drawAnnotationsToContext([{ resources: [resource] }], currentPalette, baseOptions({ highlightAllAnnotations: true }));

      expect(CanvasAnnotationDisplay).toHaveBeenCalledWith(
        expect.objectContaining({ palette: expect.objectContaining({ default: { globalAlpha: 1 } }) }),
      );
    });

    it('merges the hidden palette into default when highlightAllAnnotations is false', () => {
      const resource = { id: 'r1', targetId: 'canvas-1' };
      const currentPalette = { default: { globalAlpha: 1 }, hidden: { globalAlpha: 0.2 } };

      drawAnnotationsToContext([{ resources: [resource] }], currentPalette, baseOptions({ highlightAllAnnotations: false }));

      expect(CanvasAnnotationDisplay).toHaveBeenCalledWith(
        expect.objectContaining({ palette: expect.objectContaining({ default: { globalAlpha: 0.2 } }) }),
      );
    });
  });
});
