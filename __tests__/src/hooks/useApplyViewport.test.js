import { renderHook } from '@testing-library/react';
import useApplyViewport from '../../../src/hooks/useApplyViewport';

vi.mock('../../../src/lib/viewport', () => ({
  applyViewport: vi.fn(),
  isSameCanvas: (a, b) => a?.canvasKey === b?.canvasKey,
  isSameViewport: (a, b) => a === b,
}));

const { applyViewport } = await import('../../../src/lib/viewport');

/** Build a minimal viewer stub -- just enough surface for useApplyViewport itself */
function createViewer() {
  return {
    animationTime: 1.2,
    element: { checkVisibility: () => true },
    forceRedraw: vi.fn(),
    viewport: {
      centerSpringX: { target: { value: 0 } },
      centerSpringY: { target: { value: 0 } },
      zoomSpring: { target: { value: 1 } },
    },
  };
}

describe('useApplyViewport', () => {
  beforeEach(() => {
    applyViewport.mockClear();
  });

  // Regression test: on a fresh load, canvasKey can become known (via a
  // saga setting window.canvasId) before canvasWorld has real dimensions
  // (the full manifest still parsing) -- so the first apply can be
  // bounds-less (goHome on an empty world), and once bounds resolve
  // moments later canvasKey is unchanged. applyViewport's non-immediate
  // path only knows how to animate toward an explicit x/y/zoom, so without
  // this fix the bounds-only update was silently dropped and the
  // goHome-on-empty-world camera position stuck permanently.
  it('applies immediately when bounds newly appear for the same canvasKey (no explicit position)', () => {
    const viewer = createViewer();
    const { rerender } = renderHook(({ desiredViewport }) => useApplyViewport(viewer, desiredViewport), {
      initialProps: { desiredViewport: { canvasKey: 'a' } },
    });

    expect(applyViewport).toHaveBeenCalledWith(viewer.viewport, { canvasKey: 'a' }, { immediately: true });

    rerender({ desiredViewport: { bounds: [0, 0, 100, 100], canvasKey: 'a' } });

    expect(applyViewport).toHaveBeenLastCalledWith(
      viewer.viewport,
      { bounds: [0, 0, 100, 100], canvasKey: 'a' },
      { immediately: true },
    );
  });

  it('still animates a same-canvas update that has an explicit saved position', () => {
    const viewer = createViewer();
    const { rerender } = renderHook(({ desiredViewport }) => useApplyViewport(viewer, desiredViewport), {
      initialProps: { desiredViewport: { bounds: [0, 0, 100, 100], canvasKey: 'a' } },
    });

    rerender({ desiredViewport: { canvasKey: 'a', x: 10, y: 10, zoom: 2 } });

    expect(applyViewport).toHaveBeenLastCalledWith(
      viewer.viewport,
      { canvasKey: 'a', x: 10, y: 10, zoom: 2 },
      { immediately: false },
    );
  });
});
