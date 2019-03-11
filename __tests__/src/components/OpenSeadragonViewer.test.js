import React from 'react';
import { shallow } from 'enzyme';
import OpenSeadragon from 'openseadragon';
import { OpenSeadragonViewer } from '../../../src/components/OpenSeadragonViewer';
import OpenSeadragonCanvasOverlay from '../../../src/lib/OpenSeadragonCanvasOverlay';
import Annotation from '../../../src/lib/Annotation';
import ZoomControls from '../../../src/containers/ZoomControls';

jest.mock('openseadragon');
jest.mock('../../../src/lib/OpenSeadragonCanvasOverlay');


describe('OpenSeadragonViewer', () => {
  let wrapper;
  let updateViewport;
  beforeEach(() => {
    OpenSeadragon.mockClear();
    OpenSeadragonCanvasOverlay.mockClear();

    updateViewport = jest.fn();

    wrapper = shallow(
      <OpenSeadragonViewer
        tileSources={[{ '@id': 'http://foo', width: 100, height: 200 }, { '@id': 'http://bar', width: 150, height: 201 }]}
        windowId="base"
        config={{}}
        updateViewport={updateViewport}
        t={k => k}
      >
        <div className="foo" />
      </OpenSeadragonViewer>,
    );
  });
  it('renders the component', () => {
    expect(wrapper.find('.mirador-osd-container').length).toBe(1);
  });
  it('renders child components', () => {
    expect(wrapper.find('.foo').length).toBe(1);
  });
  it('renders ZoomControls', () => {
    expect(wrapper.find(ZoomControls).length).toBe(1);
  });
  describe('tileSourcesMatch', () => {
    it('when they do not match', () => {
      expect(wrapper.instance().tileSourcesMatch([])).toBe(false);
    });
    it('when the @ids do match', () => {
      expect(wrapper.instance().tileSourcesMatch([{ '@id': 'http://foo' }])).toBe(true);
    });
  });
  describe('addTileSource', () => {
    it('calls addTiledImage asynchronously on the OSD viewer', async () => {
      wrapper.instance().addTileSource({}).then((event) => {
        expect(event).toBe('event');
      });
    });
    it('when a viewer is not available, returns an unresolved Promise', () => {
      expect(wrapper.instance().addTileSource({})).toEqual(expect.any(Promise));
    });
  });
  describe('fitBounds', () => {
    it('calls OSD viewport.fitBounds with provided x, y, w, h', () => {
      wrapper.instance().viewer = {
        viewport: {
          fitBounds: jest.fn(),
        },
      };
      wrapper.instance().fitBounds(1, 2, 3, 4);
      expect(
        wrapper.instance().viewer.viewport.fitBounds,
      ).toHaveBeenCalledWith(expect.any(OpenSeadragon.Rect), true);
    });
  });
  describe('boundsFromTileSources', () => {
    it('generates bounds from a set of tileSources', () => {
      expect(wrapper.instance().boundsFromTileSources()).toEqual(expect.arrayContaining(
        [0, 0, 249, 200],
      ));
    });
  });
  describe('boundingRectFromTileSource', () => {
    it('creates a bounding area for the current tileSource offset if needed', () => {
      expect(wrapper.instance().boundingRectFromTileSource(
        { '@id': 'http://bar', width: 150, height: 201 }, 1,
      )).toEqual(expect.arrayContaining(
        [100, 0, 149, 200],
      ));
    });
  });

  describe('componentDidMount', () => {
    let panTo;
    let zoomTo;
    let addHandler;
    beforeEach(() => {
      panTo = jest.fn();
      zoomTo = jest.fn();
      addHandler = jest.fn();

      wrapper = shallow(
        <OpenSeadragonViewer
          tileSources={[{ '@id': 'http://foo' }]}
          windowId="base"
          viewer={{ x: 1, y: 0, zoom: 0.5 }}
          config={{}}
          updateViewport={updateViewport}
          t={k => k}
        >
          <div className="foo" />
        </OpenSeadragonViewer>,
      );

      wrapper.instance().ref = { current: true };

      OpenSeadragon.mockImplementation(() => ({
        viewport: { panTo, zoomTo },
        addHandler,
        addTiledImage: jest.fn().mockResolvedValue('event'),
      }));
    });

    it('calls the OSD viewport panTo and zoomTo with the component state', () => {
      wrapper.instance().componentDidMount();

      expect(addHandler).toHaveBeenCalledWith('viewport-change', expect.anything());

      expect(panTo).toHaveBeenCalledWith(
        { x: 1, y: 0, zoom: 0.5 }, false,
      );
      expect(zoomTo).toHaveBeenCalledWith(
        0.5, { x: 1, y: 0, zoom: 0.5 }, false,
      );
    });

    it('sets up a OpenSeadragonCanvasOverlay', () => {
      wrapper.instance().componentDidMount();
      expect(OpenSeadragonCanvasOverlay).toHaveBeenCalledTimes(1);
    });

    it('sets up a listener on update-viewport', () => {
      wrapper.instance().componentDidMount();
      expect(addHandler).toHaveBeenCalledWith('update-viewport', expect.anything());
    });
  });

  describe('componentDidUpdate', () => {
    it('calls the OSD viewport panTo and zoomTo with the component state', () => {
      const panTo = jest.fn();
      const zoomTo = jest.fn();

      wrapper.instance().viewer = {
        viewport: {
          centerSpringX: { target: { value: 10 } },
          centerSpringY: { target: { value: 10 } },
          zoomSpring: { target: { value: 1 } },
          panTo,
          zoomTo,
        },
      };

      wrapper.setProps({ viewer: { x: 0.5, y: 0.5, zoom: 0.1 } });
      wrapper.setProps({ viewer: { x: 1, y: 0, zoom: 0.5 } });

      expect(panTo).toHaveBeenCalledWith(
        { x: 1, y: 0, zoom: 0.5 }, false,
      );
      expect(zoomTo).toHaveBeenCalledWith(
        0.5, { x: 1, y: 0, zoom: 0.5 }, false,
      );
    });

    it('sets up canvasUpdate to add annotations to the canvas', () => {
      const clear = jest.fn();
      const resize = jest.fn();
      const canvasUpdate = jest.fn();
      wrapper.instance().osdCanvasOverlay = {
        clear,
        resize,
        canvasUpdate,
      };

      wrapper.setProps(
        {
          annotations: [
            new Annotation(
              { '@id': 'foo', resources: [{ foo: 'bar' }] },
            ),
          ],
        },
      );
      wrapper.setProps(
        {
          annotations: [
            new Annotation(
              { '@id': 'foo', resources: [{ foo: 'bar' }] },
            ),
          ],
        },
      );
      wrapper.setProps(
        {
          annotations: [
            new Annotation(
              { '@id': 'bar', resources: [{ foo: 'bar' }] },
            ),
          ],
        },
      );
      wrapper.instance().updateCanvas();
      expect(clear).toHaveBeenCalledTimes(1);
      expect(resize).toHaveBeenCalledTimes(1);
      expect(canvasUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe('onViewportChange', () => {
    it('translates the OSD viewport data into an update to the component state', () => {
      wrapper.instance().onViewportChange({
        eventSource: {
          viewport: {
            centerSpringX: { target: { value: 1 } },
            centerSpringY: { target: { value: 0 } },
            zoomSpring: { target: { value: 0.5 } },
          },
        },
      });

      expect(updateViewport).toHaveBeenCalledWith(
        'base',
        { x: 1, y: 0, zoom: 0.5 },
      );
    });
  });

  describe('onUpdateViewport', () => {
    it('fires updateCanvas', () => {
      const updateCanvas = jest.fn();
      wrapper.instance().updateCanvas = updateCanvas;
      wrapper.instance().onUpdateViewport();
      expect(updateCanvas).toHaveBeenCalledTimes(1);
    });
  });

  describe('annotationsToContext', () => {
    it('converts the annotations to canvas', () => {
      const strokeRect = jest.fn();
      wrapper.instance().osdCanvasOverlay = {
        context2d: {
          strokeRect,
        },
      };

      const annotations = [
        new Annotation(
          { '@id': 'foo', resources: [{ on: 'www.example.com/#xywh=10,10,100,200' }] },
        ),
      ];
      wrapper.instance().annotationsToContext(annotations);
      const context = wrapper.instance().osdCanvasOverlay.context2d;
      expect(context.strokeStyle).toEqual('yellow');
      expect(context.lineWidth).toEqual(10);
      expect(strokeRect).toHaveBeenCalledWith(10, 10, 100, 200);
    });
  });
});
