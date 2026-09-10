import OpenSeadragon from 'openseadragon';
import OpenSeadragonCanvasOverlay from '../../../src/lib/OpenSeadragonCanvasOverlay';

vi.mock('openseadragon');

describe('OpenSeadragonCanvasOverlay', () => {
  let canvasOverlay;
  const ref = { current: undefined };
  beforeEach(() => {
    document.body.innerHTML = '<div id="canvas"><canvas></div>';
    ref.current = document.getElementById('canvas');
    OpenSeadragon.mockClear();
    OpenSeadragon.mockImplementation(function () {
      return {
        canvas: ref,
        container: {
          clientHeight: 100,
          clientWidth: 200,
        },
        viewport: {
          // the container is 200x100, so the margin-inclusive bounds have a
          // matching 2:1 aspect ratio
          getBoundsNoRotateWithMargins: vi.fn(() => ({
            height: 200,
            width: 400,
            x: 40,
            y: 80,
          })),
          getCenter: () => ({ x: 0, y: 0 }),
          getFlip: () => false,
          getRotation: () => 0,
          getZoom: vi.fn(() => 0.5),
        },
        world: {
          // a canvas painted by a much smaller image; the overlay should ignore
          // these pixel dimensions entirely
          getItemAt: vi.fn(() => ({
            source: {
              dimensions: {
                x: 100,
                y: 50,
              },
            },
            viewportToImageZoom: vi.fn(() => 2),
          })),
        },
      };
    });
    canvasOverlay = new OpenSeadragonCanvasOverlay(new OpenSeadragon(), ref);
  });
  describe('constructor', () => {
    it('sets up initial values and canvas', () => {
      expect(canvasOverlay.containerHeight).toEqual(0);
      expect(canvasOverlay.containerWidth).toEqual(0);
    });
  });
  describe('context2d', () => {
    it('calls getContext on canvas', () => {
      const contextMock = vi.fn();
      ref.current = {
        firstElementChild: {
          getContext: contextMock,
        },
      };
      // eslint-disable-next-line no-unused-expressions
      canvasOverlay.context2d;
      expect(contextMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('clear', () => {
    it('calls getContext and clearRect on canvas', () => {
      const clearRect = vi.fn();
      const contextMock = vi.fn(() => ({
        clearRect,
      }));
      ref.current = {
        firstElementChild: {
          getContext: contextMock,
        },
      };
      canvasOverlay.clear();
      expect(contextMock).toHaveBeenCalledTimes(2);
      expect(clearRect).toHaveBeenCalledTimes(1);
    });
  });
  describe('resize', () => {
    it('sets various values based off of the container and viewport bounds', () => {
      canvasOverlay.resize();
      expect(canvasOverlay.containerHeight).toEqual(100);
      expect(canvasOverlay.containerWidth).toEqual(200);
      expect(canvasOverlay.viewportOrigin).toEqual({ x: 40, y: 80 });
      expect(canvasOverlay.viewportWidth).toEqual(400);
      expect(canvasOverlay.viewportHeight).toEqual(200);
    });
  });
  describe('scale', () => {
    it('is the ratio of container pixels to viewport (IIIF canvas) coordinates', () => {
      canvasOverlay.resize();
      expect(canvasOverlay.scale).toEqual(0.5);
    });
    it('is 1 before the overlay has been sized', () => {
      expect(canvasOverlay.scale).toEqual(1);
    });
  });
  describe('canvasUpdate', () => {
    /** set up a stubbed 2d context and return its spies */
    const setupContext = () => {
      const scale = vi.fn();
      const setAttribute = vi.fn();
      const setTransform = vi.fn();
      const translate = vi.fn();
      const contextMock = vi.fn(() => ({
        scale,
        setTransform,
        translate,
      }));
      ref.current = {
        firstElementChild: {
          getContext: contextMock,
          setAttribute,
        },
        setAttribute,
      };

      return { scale, setTransform, translate };
    };

    it('sets appropriate sizes and calls update argument', () => {
      const { scale, setTransform, translate } = setupContext();
      const update = vi.fn();
      canvasOverlay.resize();
      canvasOverlay.canvasUpdate(update);
      expect(update).toHaveBeenCalledTimes(1);
      expect(scale).toHaveBeenCalledWith(0.5, 0.5);
      expect(translate).toHaveBeenCalledWith(-20, -40);
      expect(setTransform).toHaveBeenCalledWith(1, 0, 0, 1, 0, 0);
    });

    it('scales by the canvas coordinate space rather than the image pixel size', () => {
      const { scale } = setupContext();
      const getItemAt = vi.spyOn(canvasOverlay.viewer.world, 'getItemAt');

      canvasOverlay.resize();
      canvasOverlay.canvasUpdate(vi.fn());

      // the image painting the canvas is 100px wide where the canvas is 400
      // units wide; the overlay must not pick up that 4x factor
      expect(scale).toHaveBeenCalledWith(0.5, 0.5);
      expect(getItemAt).not.toHaveBeenCalled();
    });
  });
});
