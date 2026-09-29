import { render } from '@tests/utils/test-utils';
import OpenSeadragon from 'openseadragon';
import OpenSeadragonComponent from '../../../src/components/OpenSeadragonComponent';

vi.mock('openseadragon');

describe('OpenSeadragonComponent', () => {
  let addHandler;
  let applyConstraints;
  let fitBounds;
  let fitBoundsWithConstraints;
  let goHome;
  let panTo;
  let zoomTo;
  let checkVisibility;
  let element;

  beforeEach(() => {
    addHandler = vi.fn();
    applyConstraints = vi.fn();
    fitBounds = vi.fn();
    fitBoundsWithConstraints = vi.fn();
    goHome = vi.fn();
    panTo = vi.fn();
    zoomTo = vi.fn();
    checkVisibility = vi.fn(() => true);
    element = { checkVisibility };

    // Mock methods used in the component
    OpenSeadragon.mockImplementation(function () {
      return {
        addHandler,
        animationTime: 1.2,
        canvas: {},
        destroy: vi.fn(),
        element,
        forceRedraw: vi.fn(),
        innerTracker: {},
        removeAllHandlers: vi.fn(),
        viewport: {
          applyConstraints,
          centerSpringX: { target: { value: 0 } },
          centerSpringY: { target: { value: 0 } },
          fitBounds,
          fitBoundsWithConstraints,
          getFlip: vi.fn(() => false),
          getRotation: vi.fn(() => 0),
          getZoom: vi.fn(() => 1),
          goHome,
          panTo,
          pointFromPixel: vi.fn(),
          setFlip: vi.fn(),
          setRotation: vi.fn(),
          zoomSpring: { target: { value: 1 } },
          zoomTo,
        },
      };
    });

    OpenSeadragon.Rect = vi.fn(function (x, y, width, height) {
      return { height, width, x, y };
    });
    OpenSeadragon.Point = vi.fn(function (x, y) {
      return { x, y };
    });
  });

  /**
   * Invoke the registered 'animation-finish' handler, simulating OSD
   * reporting the viewport has settled.
   */
  function invokeAnimationFinishHandler(viewport) {
    const call = addHandler.mock.calls.find(([eventName]) => eventName === 'animation-finish');
    if (call) call[1]({ eventSource: { viewport } });
  }

  /**
   * Render component and complete initial application of the viewport
   * @param {object} viewerConfig - Initial viewer config
   * @returns {object} Render result
   */
  function renderAndInitialize(viewerConfig = { bounds: [0, 0, 5000, 3000] }) {
    const result = render(<OpenSeadragonComponent viewerConfig={viewerConfig} />);
    return result;
  }

  it('fits to bounds immediately on first render', () => {
    render(<OpenSeadragonComponent viewerConfig={{ bounds: [0, 0, 5000, 3000] }} />);

    expect(fitBounds).toHaveBeenCalledWith(expect.objectContaining({ height: 3000, width: 5000, x: 0, y: 0 }), true);
  });

  it('goes home when there are no bounds/x/y/zoom', () => {
    render(<OpenSeadragonComponent viewerConfig={{}} />);

    expect(goHome).toHaveBeenCalledWith(true);
    expect(fitBounds).not.toHaveBeenCalled();
  });

  it('resets zoom and center immediately when bounds change -- no more waiting on tile-loaded', () => {
    const { rerender } = render(<OpenSeadragonComponent viewerConfig={{ bounds: [0, 0, 5000, 3000], canvasKey: 'a' }} />);
    fitBounds.mockClear();

    rerender(<OpenSeadragonComponent viewerConfig={{ bounds: [0, 0, 3000, 2000], canvasKey: 'b' }} />);

    expect(fitBounds).toHaveBeenCalledWith(expect.objectContaining({ height: 2000, width: 3000, x: 0, y: 0 }), true);
  });

  it('does not reset zoom when bounds remain the same', () => {
    const { rerender } = render(<OpenSeadragonComponent viewerConfig={{ bounds: [0, 0, 5000, 3000] }} />);
    fitBounds.mockClear();

    rerender(<OpenSeadragonComponent viewerConfig={{ bounds: [0, 0, 5000, 3000] }} />);

    expect(fitBounds).not.toHaveBeenCalled();
  });

  it('does not reset zoom when an unrelated prop changes but bounds/x/y/zoom stay the same', () => {
    const { rerender } = render(<OpenSeadragonComponent viewerConfig={{ bounds: [0, 0, 5000, 3000] }} />);
    fitBounds.mockClear();

    // A fresh object with identical content, mirroring how viewerConfig is
    // recomputed on every render in the real app.
    rerender(<OpenSeadragonComponent viewerConfig={{ bounds: [0, 0, 5000, 3000] }} osdConfig={{}} />);

    expect(fitBounds).not.toHaveBeenCalled();
    expect(goHome).not.toHaveBeenCalled();
  });

  // Regression tests: zoomTo (like OSD's own zoomBy) never clamps to
  // min/max zoom on its own -- without a paired applyConstraints() call,
  // an explicit zoom value (e.g. from ZoomControls' zoom-in/out buttons,
  // which compute the next zoom themselves) could zoom in or out
  // arbitrarily far.
  describe('zoom constraints', () => {
    it('applies constraints when restoring an initial saved x/y/zoom', () => {
      render(<OpenSeadragonComponent viewerConfig={{ x: 10, y: 10, zoom: 2 }} />);

      expect(zoomTo).toHaveBeenCalledWith(2, expect.objectContaining({ x: 10, y: 10 }), true);
      expect(applyConstraints).toHaveBeenCalled();
    });

    // zoom is independent of x/y -- it should still apply (and still be
    // constrained) even when there's no pan position to restore alongside it.
    it('applies zoom (and constraints) even when x/y are not set', () => {
      render(<OpenSeadragonComponent viewerConfig={{ zoom: 2 }} />);

      expect(zoomTo).toHaveBeenCalledWith(2, expect.anything(), true);
      expect(applyConstraints).toHaveBeenCalled();
      expect(panTo).not.toHaveBeenCalled();
    });

    it('applies constraints when zoom changes on an already-initialized viewer', () => {
      const { rerender } = renderAndInitialize({ x: 10, y: 10, zoom: 2 });
      applyConstraints.mockClear();
      zoomTo.mockClear();

      rerender(<OpenSeadragonComponent viewerConfig={{ x: 10, y: 10, zoom: 4 }} />);

      expect(zoomTo).toHaveBeenCalledWith(4, expect.objectContaining({ x: 10, y: 10 }), false);
      expect(applyConstraints).toHaveBeenCalled();
    });

    // The mocked spring targets are pinned at 0, so x alone differing (the
    // common case above) always short-circuits the pan condition's OR --
    // y's own comparison only ever runs when x already matches. x/y use
    // 0.4 rather than 0 so they round to the mocked target (0) without
    // being falsy themselves -- the main effect's own guard treats a
    // literal 0 as "missing" and returns before reaching this logic.
    it('pans on a live update when only y differs from the current position', () => {
      const { rerender } = renderAndInitialize({ x: 0.4, y: 0.4, zoom: 2 });
      panTo.mockClear();

      rerender(<OpenSeadragonComponent viewerConfig={{ x: 0.4, y: 5, zoom: 2 }} />);

      expect(panTo).toHaveBeenCalledWith(expect.objectContaining({ x: 0.4, y: 5 }), false);
    });

    // zoom uses 1 to match the mocked zoomSpring's static target, so the
    // zoom comparison also reports "already matches" rather than firing.
    it('does not pan on a live update when x and y both already match the current position', () => {
      const { rerender } = renderAndInitialize({ x: 0.4, y: 0.4, zoom: 1 });
      panTo.mockClear();
      zoomTo.mockClear();

      rerender(<OpenSeadragonComponent viewerConfig={{ x: 0.4, y: 0.4, zoom: 1 }} />);

      expect(panTo).not.toHaveBeenCalled();
      expect(zoomTo).not.toHaveBeenCalled();
    });
  });

  describe('onViewportChange', () => {
    it('does not report a viewport change before the initial viewport has been applied', () => {
      const updateViewport = vi.fn();

      // Rendering with no viewer yet applied -- animation-finish fires
      // before useApplyViewport has ever successfully applied anything.
      invokeAnimationFinishHandler({
        centerSpringX: { target: { value: 0 } },
        centerSpringY: { target: { value: 0 } },
        getBounds: () => [0, 0, 100, 100],
        getFlip: () => false,
        getRotation: () => 0,
        zoomSpring: { target: { value: 1 } },
      });

      render(<OpenSeadragonComponent viewerConfig={{ bounds: [0, 0, 5000, 3000] }} onUpdateViewport={updateViewport} />);

      expect(updateViewport).not.toHaveBeenCalled();
    });

    it('does not report a viewport change while automatically recentering for changed bounds', () => {
      const updateViewport = vi.fn();
      const { rerender } = renderAndInitialize({ bounds: [0, 0, 5000, 3000], canvasKey: 'a' });
      rerender(
        <OpenSeadragonComponent
          viewerConfig={{ bounds: [0, 0, 3000, 2000], canvasKey: 'a' }}
          onUpdateViewport={updateViewport}
        />,
      );

      // isApplying is true until a settled report matching what was just
      // applied comes back.
      invokeAnimationFinishHandler({
        centerSpringX: { target: { value: 0 } },
        centerSpringY: { target: { value: 0 } },
        getBounds: () => [0, 0, 100, 100],
        getFlip: () => false,
        getRotation: () => 0,
        zoomSpring: { target: { value: 1 } },
      });

      expect(updateViewport).not.toHaveBeenCalled();
    });

    it('reports the settled viewport back once initialized and not resetting', () => {
      const updateViewport = vi.fn();
      render(<OpenSeadragonComponent viewerConfig={{ bounds: [0, 0, 5000, 3000] }} onUpdateViewport={updateViewport} />);

      invokeAnimationFinishHandler({
        centerSpringX: { target: { value: 12.4 } },
        centerSpringY: { target: { value: 7.6 } },
        getBounds: () => [0, 0, 100, 100],
        getFlip: () => true,
        getRotation: () => 90,
        zoomSpring: { target: { value: 3 } },
      });

      expect(updateViewport).toHaveBeenCalledWith({
        bounds: [0, 0, 100, 100],
        canvasKey: undefined,
        flip: true,
        rotation: 90,
        x: 12,
        y: 8,
        zoom: 3,
      });
    });
  });

  describe('applying a live update with incomplete x/y/zoom', () => {
    it('does not apply anything when bounds are unchanged and x/y/zoom are incomplete', () => {
      const { rerender } = renderAndInitialize({ bounds: [0, 0, 5000, 3000], x: 10 });
      panTo.mockClear();
      zoomTo.mockClear();

      // Same bounds, still-incomplete position (only x) -- relies on
      // bounds instead, so this update should be a no-op.
      rerender(<OpenSeadragonComponent viewerConfig={{ bounds: [0, 0, 5000, 3000], x: 20 }} />);

      expect(panTo).not.toHaveBeenCalled();
      expect(zoomTo).not.toHaveBeenCalled();
    });
  });

  // Confirms OpenSeadragonComponent still defers applying the viewport
  // until the element is visible (#3540) -- now via useApplyViewport,
  // triggered by viewerConfig rather than add-item/remove-item.
  it('does not apply the viewport while hidden, and does once the element becomes visible (#3540)', () => {
    let intersectionCallback;
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn(function IntersectionObserverMock(callback) {
        intersectionCallback = callback;
        return { disconnect: vi.fn(), observe: vi.fn() };
      }),
    );
    checkVisibility.mockReturnValue(false);

    render(<OpenSeadragonComponent viewerConfig={{}} />);

    expect(checkVisibility).toHaveBeenCalled();
    expect(goHome).not.toHaveBeenCalled();

    intersectionCallback([{ isIntersecting: true }]);

    expect(goHome).toHaveBeenCalledTimes(1);
  });
});
