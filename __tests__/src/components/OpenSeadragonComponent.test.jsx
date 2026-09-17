import { render } from '@tests/utils/test-utils';
import OpenSeadragon from 'openseadragon';
import OpenSeadragonComponent from '../../../src/components/OpenSeadragonComponent';

vi.mock('openseadragon');

describe('OpenSeadragonComponent', () => {
  let addOnceHandler;
  let addHandler;
  let applyConstraints;
  let fitBoundsWithConstraints;
  let goHome;
  let panTo;
  let zoomTo;

  beforeEach(() => {
    addOnceHandler = vi.fn();
    addHandler = vi.fn();
    applyConstraints = vi.fn();
    fitBoundsWithConstraints = vi.fn();
    goHome = vi.fn();
    panTo = vi.fn();
    zoomTo = vi.fn();

    // Mock methods used in the component
    OpenSeadragon.mockImplementation(function () {
      return {
        addHandler,
        addOnceHandler,
        canvas: {},
        destroy: vi.fn(),
        innerTracker: {},
        removeAllHandlers: vi.fn(),
        viewport: {
          applyConstraints,
          centerSpringX: { target: { value: 0 } },
          centerSpringY: { target: { value: 0 } },
          fitBounds: vi.fn(),
          fitBoundsWithConstraints,
          getRotation: vi.fn(() => 0),
          getFlip: vi.fn(() => false),
          getZoom: vi.fn(() => 1),
          panTo,
          pointFromPixel: vi.fn(),
          zoomSpring: { target: { value: 1 } },
          zoomTo,
          goHome,
        },
        world: { addOnceHandler, addHandler },
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
   * Invoke the most recently registered tile-loaded handler
   */
  function invokeTileLoadedHandler() {
    // Extract and invoke the most recently registered 'tile-loaded' handler
    // to simulate OSD firing the event when tiles finish loading
    // OSD provides addOnceHandler to register events on viewer
    const { lastCall } = addOnceHandler.mock; // Vitest's lastCall
    const [_eventName, tileLoadedHandler] = lastCall || [];
    if (tileLoadedHandler) tileLoadedHandler();
  }

  function invokeItemAddedHandler() {
    const { lastCall } = addHandler.mock;
    const [_eventName, itemAddedHandler] = lastCall || [];
    if (itemAddedHandler) itemAddedHandler();
  }

  /**
   * Render component and complete initial tile loading
   * @param {Array} bounds - Initial bounds
   * @returns {object} Render result
   */
  function renderAndInitialize(viewerConfig = { bounds: [0, 0, 5000, 3000] }) {
    const result = render(<OpenSeadragonComponent viewerConfig={viewerConfig} />);

    // Component registers a 'item-added' handler during mount to set initial viewport
    invokeItemAddedHandler();

    // Clear mocks after initialization
    fitBoundsWithConstraints.mockClear();
    addOnceHandler.mockClear();

    return result;
  }

  it('resets zoom and center when bounds change', () => {
    const { rerender } = renderAndInitialize();

    // Change bounds to different dimensions
    rerender(<OpenSeadragonComponent viewerConfig={{ bounds: [0, 0, 3000, 2000] }} />);

    // Component registered a 'tile-loaded' handler when bounds change
    invokeTileLoadedHandler();

    // Should call fitBoundsWithConstraints with the new bounds to reset zoom and center
    expect(fitBoundsWithConstraints).toHaveBeenCalledWith(
      expect.objectContaining({
        height: 2000,
        width: 3000,
        x: 0,
        y: 0,
      }),
      true,
    );
  });

  it('does not reset zoom when bounds remain the same', () => {
    const { rerender } = renderAndInitialize();

    // Rerender with same bounds
    rerender(<OpenSeadragonComponent viewerConfig={{ bounds: [0, 0, 5000, 3000] }} />);

    // Should not register a new tile-loaded handler
    expect(addOnceHandler).not.toHaveBeenCalled();

    // Should not call fitBoundsWithConstraints
    expect(fitBoundsWithConstraints).not.toHaveBeenCalled();
  });

  it('sets the zoom when there are now bounds', () => {
    const { rerender } = renderAndInitialize({});

    // Should not register a new tile-loaded handler
    expect(addOnceHandler).not.toHaveBeenCalled();

    // expect add-item handler to be called
    expect(addHandler).toHaveBeenCalled(1);

    // expect there to be no bounds and viewer should center
    expect(goHome).toHaveBeenCalled(1);

    // Should not call fitBoundsWithConstraints
    expect(fitBoundsWithConstraints).not.toHaveBeenCalled();
  });

  // Regression tests: zoomTo (like OSD's own zoomBy) never clamps to
  // min/max zoom on its own -- without a paired applyConstraints() call,
  // an explicit zoom value (e.g. from ZoomControls' zoom-in/out buttons,
  // which compute the next zoom themselves) could zoom in or out
  // arbitrarily far.
  describe('zoom constraints', () => {
    it('applies constraints when restoring an initial saved x/y/zoom', () => {
      render(<OpenSeadragonComponent viewerConfig={{ x: 10, y: 10, zoom: 2 }} />);
      invokeItemAddedHandler();

      expect(zoomTo).toHaveBeenCalledWith(2, expect.objectContaining({ x: 10, y: 10 }), true);
      expect(applyConstraints).toHaveBeenCalled();
    });

    // zoom is independent of x/y -- it should still apply (and still be
    // constrained) even when there's no pan position to restore alongside it.
    it('applies zoom (and constraints) even when x/y are not set', () => {
      render(<OpenSeadragonComponent viewerConfig={{ zoom: 2 }} />);
      invokeItemAddedHandler();

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
  });
});
