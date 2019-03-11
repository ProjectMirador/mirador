import OpenSeadragon from 'openseadragon';
import OpenSeadragonCanvasOverlay from '../../../src/lib/OpenSeadragonCanvasOverlay';

jest.mock('openseadragon');

describe('OpenSeadragonCanvasOverlay', () => {
  let canvasOverlay;
  beforeEach(() => {
    document.body.innerHTML = '<div id="canvas"></div>';
    OpenSeadragon.mockClear();
    OpenSeadragon.mockImplementation(() => ({
      canvas: document.getElementById('canvas'),
      container: {
        clientHeight: 100,
        clientWidth: 200,
      },
      viewport: {
        getBounds: jest.fn(() => ({
          x: 40, y: 80, width: 200, height: 300,
        })),
        getZoom: jest.fn(() => (0.75)),
      },
      world: {
        getItemAt: jest.fn(() => ({
          source: {
            dimensions: {
              x: 1000,
              y: 2000,
            },
          },
          viewportToImageZoom: jest.fn(() => (0.075)),
        })),
      },
    }));
    canvasOverlay = new OpenSeadragonCanvasOverlay(new OpenSeadragon());
  });
  describe('constructor', () => {
    it('sets up initial values and canvas', () => {
      expect(canvasOverlay.containerHeight).toEqual(0);
      expect(canvasOverlay.containerWidth).toEqual(0);
      expect(canvasOverlay.canvasDiv.outerHTML).toEqual(
        '<div style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%;"><canvas></canvas></div>',
      );
    });
  });
  describe('context2d', () => {
    it('calls getContext on canvas', () => {
      const contextMock = jest.fn();
      canvasOverlay.canvas = {
        getContext: contextMock,
      };
      canvasOverlay.context2d; // eslint-disable-line no-unused-expressions
      expect(contextMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('clear', () => {
    it('calls getContext and clearRect on canvas', () => {
      const clearRect = jest.fn();
      const contextMock = jest.fn(() => ({
        clearRect,
      }));
      canvasOverlay.canvas = {
        getContext: contextMock,
      };
      canvasOverlay.clear();
      expect(contextMock).toHaveBeenCalledTimes(1);
      expect(clearRect).toHaveBeenCalledTimes(1);
    });
  });
  describe('resize', () => {
    it('sets various values based off of image and container sizes', () => {
      canvasOverlay.resize();
      expect(canvasOverlay.containerHeight).toEqual(100);
      expect(canvasOverlay.containerWidth).toEqual(200);
      expect(canvasOverlay.imgAspectRatio).toEqual(0.5);
    });
    it('when image is undefined returns early', () => {
      OpenSeadragon.mockClear();
      OpenSeadragon.mockImplementation(() => ({
        canvas: document.getElementById('canvas'),
        container: {
          clientHeight: 100,
          clientWidth: 200,
        },
        viewport: {
          getBounds: jest.fn(() => (new OpenSeadragon.Rect(0, 0, 200, 200))),
        },
        world: {
          getItemAt: jest.fn(),
        },
      }));
      canvasOverlay = new OpenSeadragonCanvasOverlay(new OpenSeadragon());
      canvasOverlay.resize();
      expect(canvasOverlay.imgHeight).toEqual(undefined);
      expect(canvasOverlay.imgWidth).toEqual(undefined);
    });
  });
  describe('canvasUpdate', () => {
    it('sets appropriate sizes and calls update argument', () => {
      const scale = jest.fn();
      const setAttribute = jest.fn();
      const setTransform = jest.fn();
      const translate = jest.fn();
      const contextMock = jest.fn(() => ({
        scale,
        setTransform,
        translate,
      }));
      canvasOverlay.canvas = {
        getContext: contextMock,
        setAttribute,
      };
      const update = jest.fn();
      canvasOverlay.resize();
      canvasOverlay.canvasUpdate(update);
      expect(update).toHaveBeenCalledTimes(1);
      expect(scale).toHaveBeenCalledWith(0.075, 0.075);
      expect(translate).toHaveBeenCalledWith(-39.96, -26.65333333333333);
      expect(setTransform).toHaveBeenCalledWith(1, 0, 0, 1, 0, 0);
    });
  });
});
