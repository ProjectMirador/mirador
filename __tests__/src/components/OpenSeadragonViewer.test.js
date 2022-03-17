import React from 'react';
import { shallow } from 'enzyme';
import OpenSeadragon from 'openseadragon';
import { Utils } from 'manifesto.js';
import { OpenSeadragonViewer } from '../../../src/components/OpenSeadragonViewer';
import CanvasWorld from '../../../src/lib/CanvasWorld';
import fixture from '../../fixtures/version-2/019.json';

const canvases = Utils.parseManifest(fixture).getSequences()[0].getCanvases();

jest.mock('openseadragon');

/**
 * Helper function to create a shallow wrapper around OpenSeadragonViewer
 */
function createWrapper(props) {
  return shallow(
    <OpenSeadragonViewer
      classes={{}}
      infoResponses={[{
        id: 'a',
        json: {
          '@id': 'http://foo',
          height: 200,
          width: 100,
        },
      }, {
        id: 'b',
        json: {
          '@id': 'http://bar',
          height: 201,
          width: 150,
        },
      }]}
      nonTiledImages={[{
        getProperty: () => {},
        id: 'http://foo',
      }]}
      windowId="base"
      config={{}}
      updateViewport={jest.fn()}
      t={k => k}
      canvasWorld={new CanvasWorld(canvases)}
      {...props}
    >
      <div className="foo" />
      <div className="bar" />
    </OpenSeadragonViewer>,
  );
}

describe('OpenSeadragonViewer', () => {
  let wrapper;
  let updateViewport;
  beforeEach(() => {
    OpenSeadragon.mockClear();
    wrapper = createWrapper({});
    updateViewport = wrapper.instance().props.updateViewport;
  });
  it('renders the component', () => {
    expect(wrapper.find('.mirador-osd-container').length).toBe(1);
  });
  it('renders child components enhanced with additional props', () => {
    expect(wrapper.find('.foo').length).toBe(1);
    expect(wrapper.find('.foo').props()).toEqual(expect.objectContaining({
      zoomToWorld: wrapper.instance().zoomToWorld,
    }));
    expect(wrapper.find('.bar').length).toBe(1);
    expect(wrapper.find('.bar').props()).toEqual(expect.objectContaining({
      zoomToWorld: wrapper.instance().zoomToWorld,
    }));
  });

  describe('infoResponsesMatch', () => {
    it('when they do not match', () => {
      expect(wrapper.instance().infoResponsesMatch([])).toBe(false);
    });
    it('with an empty array', () => {
      wrapper = createWrapper({ infoResponses: [] });
      expect(wrapper.instance().infoResponsesMatch([])).toBe(true);
    });
    it('when the @ids do match', () => {
      const newInfos = [
        { id: 'a', json: { '@id': 'http://foo' } },
        { id: 'b', json: { '@id': 'http://bar' } },
      ];
      expect(wrapper.instance().infoResponsesMatch(newInfos)).toBe(true);
    });
    it('when the @ids do not match', () => {
      expect(wrapper.instance().infoResponsesMatch([{ id: 'a', json: { '@id': 'http://foo-degraded' } }])).toBe(false);
    });
    it('when the id props match', () => {
      wrapper = createWrapper({
        infoResponses: [{
          id: 'a',
          json: {
            height: 200,
            id: 'http://foo',
            width: 100,
          },
        }],
      });
      expect(wrapper.instance().infoResponsesMatch([{ id: 'a', json: { id: 'http://foo' } }])).toBe(true);
    });
  });

  describe('nonTiledImagedMatch', () => {
    it('when they do not match', () => {
      expect(wrapper.instance().nonTiledImagedMatch([])).toBe(false);
    });
    it('with an empty array', () => {
      wrapper = createWrapper({ nonTiledImages: [] });
      expect(wrapper.instance().nonTiledImagedMatch([])).toBe(true);
    });
    it('when the ids do match', () => {
      expect(wrapper.instance().nonTiledImagedMatch([{ id: 'http://foo' }])).toBe(true);
    });
  });

  describe('addAllImageSources', () => {
    it('calls addTileSource for every tileSources and then zoomsToWorld', async () => {
      wrapper = createWrapper({ infoResponses: [1, 2, 3, 4] });
      wrapper.setState({ viewer: { viewport: { fitBounds: () => {} }, world: { getItemCount: () => 0 } } });
      const mockAddTileSource = jest.fn();
      wrapper.instance().addTileSource = mockAddTileSource;
      await wrapper.instance().addAllImageSources();
      expect(mockAddTileSource).toHaveBeenCalledTimes(4);
    });

    it('calls addNonTileSource for every nonTiledImage and then zoomsToWorld', async () => {
      wrapper = createWrapper({
        nonTiledImages: [
          { getProperty: () => 'Image' },
          { getProperty: () => 'Image' },
          { getProperty: () => 'Image' },
          { getProperty: () => 'Image' },
        ],
      });
      const instance = wrapper.instance();
      const mockAddNonTiledImage = jest.fn();
      wrapper.instance().addNonTiledImage = mockAddNonTiledImage;
      await instance.addAllImageSources();
      expect(mockAddNonTiledImage).toHaveBeenCalledTimes(4);
    });
  });

  describe('addTileSource', () => {
    it('when a viewer is not available, returns an unresolved Promise', () => (
      expect(wrapper.instance().addTileSource({})).rejects.toBeUndefined()
    ));
  });

  describe('addNonTiledImage', () => {
    it('calls addSimpleImage asynchronously on the OSD viewer', () => {
      const viewer = {};
      viewer.addSimpleImage = ({ success }) => { success('event'); };
      wrapper.instance().setState({ viewer });

      return wrapper.instance()
        .addNonTiledImage({ getProperty: () => 'Image' })
        .then((event) => {
          expect(event).toBe('event');
        });
    });

    it('calls addSimpleImage asynchronously on the OSD viewer', () => (
      wrapper.instance()
        .addNonTiledImage({ getProperty: () => 'Video' })
        .then((event) => {
          expect(event).toBe(undefined);
        })
    ));
  });

  describe('refreshTileProperties', () => {
    it('updates the index and opacity of the OSD tiles from the canvas world', () => {
      const setOpacity = jest.fn();
      const setItemIndex = jest.fn();
      const canvasWorld = {
        contentResource: i => i,
        layerIndexOfImageResource: i => 1 - i,
        layerOpacityOfImageResource: i => 0.5,
      };
      wrapper = createWrapper({ canvasWorld });
      wrapper.instance().loaded = true;
      wrapper.instance().state.viewer = {
        world: {
          getItemAt: i => ({ setOpacity, source: { id: i } }),
          getItemCount: () => 2,
          setItemIndex,
        },
      };

      wrapper.instance().refreshTileProperties();

      expect(setOpacity).toHaveBeenCalledTimes(1);
      expect(setOpacity.mock.calls[0]).toEqual([0.5]);

      expect(setItemIndex).toHaveBeenCalledTimes(1);
      expect(setItemIndex.mock.calls[0][0].source.id).toEqual(1);
      expect(setItemIndex.mock.calls[0][1]).toEqual(0);
    });
  });

  describe('fitBounds', () => {
    it('calls OSD viewport.fitBounds with provided x, y, w, h', () => {
      const fitBounds = jest.fn();

      wrapper.setState({
        viewer: {
          viewport: {
            fitBounds,
          },
        },
      });

      wrapper.instance().fitBounds(1, 2, 3, 4);
      expect(
        fitBounds,
      ).toHaveBeenCalledWith(expect.any(OpenSeadragon.Rect), true);
    });
  });

  describe('zoomToWorld', () => {
    it('uses fitBounds with the existing CanvasWorld', () => {
      const fitBounds = jest.fn();
      wrapper.instance().fitBounds = fitBounds;
      wrapper.instance().zoomToWorld();
      expect(fitBounds).toHaveBeenCalledWith(0, 0, 5041, 1800, true);
    });
  });

  describe('componentDidMount', () => {
    let panTo;
    let zoomTo;
    let addHandler;
    let innerTracker;

    beforeEach(() => {
      panTo = jest.fn();
      zoomTo = jest.fn();
      addHandler = jest.fn();
      innerTracker = {};

      wrapper = shallow(
        <OpenSeadragonViewer
          classes={{}}
          tileSources={[{ '@id': 'http://foo' }]}
          windowId="base"
          viewerConfig={{ x: 1, y: 0, zoom: 0.5 }}
          config={{}}
          updateViewport={updateViewport}
          canvasWorld={new CanvasWorld([])}
          t={k => k}
        >
          <div className="foo" />
        </OpenSeadragonViewer>,
      );

      wrapper.instance().ref = { current: true };

      OpenSeadragon.mockImplementation(() => ({
        addHandler,
        addTiledImage: jest.fn().mockResolvedValue('event'),
        innerTracker,
        viewport: { panTo, zoomTo },
      }));
    });

    it('calls the OSD viewport panTo and zoomTo with the component state', () => {
      wrapper.instance().componentDidMount();

      expect(panTo).toHaveBeenCalledWith(
        { x: 1, y: 0, zoom: 0.5 }, true,
      );
      expect(zoomTo).toHaveBeenCalledWith(
        0.5, { x: 1, y: 0, zoom: 0.5 }, true,
      );
    });

    it('adds animation-start/finish flag for rerendering performance', () => {
      wrapper.instance().componentDidMount();

      expect(addHandler).toHaveBeenCalledWith('animation-start', expect.anything());
      expect(addHandler).toHaveBeenCalledWith('animation-finish', expect.anything());
      expect(addHandler).toHaveBeenCalledWith('animation-finish', wrapper.instance().onViewportChange);
    });

    it('adds a mouse-move handler', () => {
      wrapper.instance().componentDidMount();

      expect(innerTracker.moveHandler).toEqual(wrapper.instance().onCanvasMouseMove);
    });
  });

  describe('componentDidUpdate', () => {
    it('calls the OSD viewport panTo and zoomTo with the component state and forces a redraw', () => {
      const panTo = jest.fn();
      const zoomTo = jest.fn();
      const setFlip = jest.fn();
      const setRotation = jest.fn();
      const forceRedraw = jest.fn();

      wrapper.setState({
        viewer: {
          forceRedraw,
          viewport: {
            centerSpringX: { target: { value: 10 } },
            centerSpringY: { target: { value: 10 } },
            getFlip: () => false,
            getRotation: () => (0),
            panTo,
            setFlip,
            setRotation,
            zoomSpring: { target: { value: 1 } },
            zoomTo,
          },
        },
      });

      wrapper.setProps({
        viewerConfig: {
          flip: false, rotation: 90, x: 0.5, y: 0.5, zoom: 0.1,
        },
      });

      wrapper.setProps({
        viewerConfig: {
          flip: true, rotation: 0, x: 1, y: 0, zoom: 0.5,
        },
      });

      expect(panTo).toHaveBeenCalledWith(
        expect.objectContaining({ x: 1, y: 0, zoom: 0.5 }), false,
      );
      expect(zoomTo).toHaveBeenCalledWith(
        0.5, expect.objectContaining({ x: 1, y: 0, zoom: 0.5 }), false,
      );
      expect(setRotation).toHaveBeenCalledWith(90);
      expect(setFlip).toHaveBeenCalledWith(true);
      expect(forceRedraw).not.toHaveBeenCalled();
    });
  });

  describe('onViewportChange', () => {
    it('translates the OSD viewport data into an update to the component state', () => {
      wrapper.instance().onViewportChange({
        eventSource: {
          viewport: {
            centerSpringX: { target: { value: 1 } },
            centerSpringY: { target: { value: 0 } },
            getFlip: () => false,
            getRotation: () => 90,
            zoomSpring: { target: { value: 0.5 } },
          },
        },
      });

      expect(updateViewport).toHaveBeenCalledWith(
        'base',
        {
          flip: false, rotation: 90, x: 1, y: 0, zoom: 0.5,
        },
      );
    });
  });

  describe('onCanvasMouseMove', () => {
    it('triggers an OSD event', () => {
      const viewer = { raiseEvent: jest.fn() };
      wrapper.setState({ viewer });

      wrapper.instance().onCanvasMouseMove('event');
      wrapper.instance().onCanvasMouseMove.flush();

      expect(viewer.raiseEvent).toHaveBeenCalledWith('mouse-move', 'event');
    });
  });
});
