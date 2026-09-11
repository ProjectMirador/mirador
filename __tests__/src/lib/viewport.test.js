import { applyViewport, isSameBounds, isSameViewport } from '../../../src/lib/viewport';

describe('isSameBounds', () => {
  it('is true for identical arrays', () => {
    expect(isSameBounds([0, 0, 100, 200], [0, 0, 100, 200])).toBe(true);
  });

  it('is false for different values', () => {
    expect(isSameBounds([0, 0, 100, 200], [0, 0, 100, 201])).toBe(false);
  });

  it('is false when one side is missing', () => {
    expect(isSameBounds([0, 0, 100, 200], undefined)).toBe(false);
    expect(isSameBounds(undefined, [0, 0, 100, 200])).toBe(false);
  });
});

describe('isSameViewport', () => {
  // Regression: two different canvases can declare identical dimensions
  // (common for scanned books/manuscripts with uniform page sizes) --
  // bounds-equality alone must not be mistaken for "nothing changed".
  it('is false when canvasKey differs, even if bounds are identical', () => {
    const a = { bounds: [0, 0, 10433, 8026], canvasKey: 'canvas-1' };
    const b = { bounds: [0, 0, 10433, 8026], canvasKey: 'canvas-2' };

    expect(isSameViewport(a, b)).toBe(false);
  });

  // Book -> single, same canvas survives: canvasKey changes even though
  // the surviving canvas's own bounds may or may not also change.
  it('is false when canvasKey changes from a multi-canvas group to a single survivor', () => {
    const a = { bounds: [0, 0, 2000, 1000], canvasKey: 'canvas-1,canvas-2' };
    const b = { bounds: [0, 0, 1000, 1000], canvasKey: 'canvas-1' };

    expect(isSameViewport(a, b)).toBe(false);
  });

  it('is true when everything matches', () => {
    const a = { bounds: [0, 0, 100, 200], canvasKey: 'canvas-1', x: 1, y: 2, zoom: 3 };
    const b = { bounds: [0, 0, 100, 200], canvasKey: 'canvas-1', x: 1, y: 2, zoom: 3 };

    expect(isSameViewport(a, b)).toBe(true);
  });
});

describe('applyViewport', () => {
  let viewport;

  beforeEach(() => {
    viewport = {
      centerSpringX: { target: { value: 0 } },
      centerSpringY: { target: { value: 0 } },
      fitBounds: vi.fn(),
      getFlip: vi.fn(() => false),
      getRotation: vi.fn(() => 0),
      goHome: vi.fn(),
      panTo: vi.fn(),
      setFlip: vi.fn(),
      setRotation: vi.fn(),
      zoomSpring: { target: { value: 1 } },
      zoomTo: vi.fn(),
    };
  });

  it('fits to bounds immediately when no explicit position is given', () => {
    applyViewport(viewport, { bounds: [0, 0, 100, 200] }, { immediately: true });

    expect(viewport.fitBounds).toHaveBeenCalledWith(expect.objectContaining({ height: 200, width: 100 }), true);
  });

  it('goes home immediately when neither bounds nor an explicit position is given', () => {
    applyViewport(viewport, {}, { immediately: true });

    expect(viewport.goHome).toHaveBeenCalledWith(true);
    expect(viewport.fitBounds).not.toHaveBeenCalled();
  });

  it('snaps to an explicit position immediately', () => {
    applyViewport(viewport, { x: 10, y: 20, zoom: 2 }, { immediately: true });

    expect(viewport.panTo).toHaveBeenCalledWith(expect.objectContaining({ x: 10, y: 20 }), true);
    expect(viewport.zoomTo).toHaveBeenCalledWith(2, expect.objectContaining({ x: 10, y: 20 }), true);
    expect(viewport.fitBounds).not.toHaveBeenCalled();
  });

  it('animates to an updated explicit position when not immediate', () => {
    applyViewport(viewport, { x: 10, y: 20, zoom: 2 }, { immediately: false });

    expect(viewport.panTo).toHaveBeenCalledWith(expect.objectContaining({ x: 10, y: 20 }), false);
    expect(viewport.zoomTo).toHaveBeenCalledWith(2, expect.objectContaining({ x: 10, y: 20 }), false);
  });

  it('does nothing when not immediate and any of x/y/zoom is missing', () => {
    applyViewport(viewport, { x: 10, y: 20 }, { immediately: false });

    expect(viewport.panTo).not.toHaveBeenCalled();
    expect(viewport.zoomTo).not.toHaveBeenCalled();
  });
});
