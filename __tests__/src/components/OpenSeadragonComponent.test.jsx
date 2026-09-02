import { render } from '@tests/utils/test-utils';
import OpenSeadragon from 'openseadragon';
import OpenSeadragonComponent from '../../../src/components/OpenSeadragonComponent';

vi.mock('openseadragon');

describe('OpenSeadragonComponent', () => {
  let addOnceHandler;
  let addHandler;
  let fitBoundsWithConstraints;
  let goHome;
  let checkVisibility;

  beforeEach(() => {
    addOnceHandler = vi.fn();
    addHandler = vi.fn();
    fitBoundsWithConstraints = vi.fn();
    goHome = vi.fn();
    checkVisibility = vi.fn(() => true);

    // Mock methods used in the component
    OpenSeadragon.mockImplementation(function () {
      return {
        addHandler,
        addOnceHandler,
        canvas: {},
        element: { checkVisibility },
        destroy: vi.fn(),
        innerTracker: {},
        removeAllHandlers: vi.fn(),
        viewport: {
          centerSpringX: { target: { value: 0 } },
          centerSpringY: { target: { value: 0 } },
          fitBounds: vi.fn(),
          fitBoundsWithConstraints,
          zoomSpring: { target: { value: 1 } },
          goHome,
        },
        world: { addOnceHandler, addHandler },
      };
    });

    OpenSeadragon.Rect = vi.fn(function (x, y, width, height) {
      return { height, width, x, y };
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

  it('does not setInitialBounds when viewer is not visible, will setInitialBounds when viewer becomes visible', () => {
    checkVisibility.mockReturnValue(false);
    const disconnect = vi.fn();
    const observe = vi.fn();
    let intersectionCallback;
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn(function IntersectionObserverMock(callback) {
        intersectionCallback = callback;
        return { disconnect, observe };
      }),
    );

    const { rerender } = renderAndInitialize({});

    expect(checkVisibility).toHaveBeenCalled();
    expect(addHandler).toHaveBeenCalled(1);
    expect(observe).toHaveBeenCalled();
    expect(fitBoundsWithConstraints).not.toHaveBeenCalled();
    expect(goHome).not.toHaveBeenCalled();

    // makes viewer visible
    intersectionCallback([{ isIntersecting: true }]);
    expect(goHome).toHaveBeenCalled();
    expect(disconnect).toHaveBeenCalled();
  });
});
