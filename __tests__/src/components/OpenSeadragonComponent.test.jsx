import { render } from '@tests/utils/test-utils';
import OpenSeadragon from 'openseadragon';
import OpenSeadragonComponent from '../../../src/components/OpenSeadragonComponent';

vi.mock('openseadragon');

describe('OpenSeadragonComponent', () => {
  let addHandler;
  let fitBounds;
  let goHome;
  let panTo;
  let zoomTo;
  let checkVisibility;
  let element;
  let viewport;

  beforeEach(() => {
    addHandler = vi.fn();
    fitBounds = vi.fn();
    goHome = vi.fn();
    panTo = vi.fn();
    zoomTo = vi.fn();
    checkVisibility = vi.fn(() => true);
    element = { checkVisibility };

    viewport = {
      centerSpringX: { target: { value: 0 } },
      centerSpringY: { target: { value: 0 } },
      fitBounds,
      getFlip: vi.fn(() => false),
      getRotation: vi.fn(() => 0),
      goHome,
      panTo,
      setFlip: vi.fn(),
      setRotation: vi.fn(),
      zoomSpring: { target: { value: 1 } },
      zoomTo,
    };

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
        viewport,
      };
    });

    OpenSeadragon.Rect = vi.fn(function (x, y, width, height) {
      return { height, width, x, y };
    });
    OpenSeadragon.Point = vi.fn(function (x, y) {
      return { x, y };
    });
  });

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
