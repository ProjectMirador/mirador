import { render } from '@tests/utils/test-utils';
import OpenSeadragon from 'openseadragon';
import OpenSeadragonComponent from '../../../src/components/OpenSeadragonComponent';

vi.mock('openseadragon');

describe('OpenSeadragonComponent', () => {
  let addOnceHandler;
  let fitBoundsWithConstraints;

  beforeEach(() => {
    addOnceHandler = vi.fn();
    fitBoundsWithConstraints = vi.fn();

    // Mock methods used in the component
    OpenSeadragon.mockImplementation(() => ({
      addHandler: vi.fn(),
      addOnceHandler,
      canvas: {},
      destroy: vi.fn(),
      innerTracker: {},
      removeAllHandlers: vi.fn(),
      viewport: {
        centerSpringX: { target: { value: 0 } },
        centerSpringY: { target: { value: 0 } },
        fitBounds: vi.fn(),
        fitBoundsWithConstraints,
        zoomSpring: { target: { value: 1 } },
      },
      world: { addOnceHandler },
    }));

    OpenSeadragon.Rect = vi.fn((x, y, width, height) => ({
      height, width, x, y,
    }));
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

  /**
   * Render component and complete initial tile loading
   * @param {Array} bounds - Initial bounds
   * @returns {object} Render result
   */
  function renderAndInitialize(bounds = [0, 0, 5000, 3000]) {
    const result = render(
      <OpenSeadragonComponent windowId="test" viewerConfig={{ bounds }} />,
    );

    // Component registers a 'tile-loaded' handler during mount to set initial viewport
    invokeTileLoadedHandler();

    // Clear mocks after initialization
    fitBoundsWithConstraints.mockClear();
    addOnceHandler.mockClear();

    return result;
  }

  it('resets zoom and center when bounds change', () => {
    const { rerender } = renderAndInitialize();

    // Change bounds to different dimensions
    rerender(
      <OpenSeadragonComponent windowId="test" viewerConfig={{ bounds: [0, 0, 3000, 2000] }} />,
    );

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
    rerender(
      <OpenSeadragonComponent windowId="test" viewerConfig={{ bounds: [0, 0, 5000, 3000] }} />,
    );

    // Should not register a new tile-loaded handler
    expect(addOnceHandler).not.toHaveBeenCalled();

    // Should not call fitBoundsWithConstraints
    expect(fitBoundsWithConstraints).not.toHaveBeenCalled();
  });
});
