import { cloneElement } from 'react';
import { render, screen, waitFor } from 'test-utils';
import PropTypes from 'prop-types';
import userEvent from '@testing-library/user-event';
import { Utils } from 'manifesto.js';
import { OpenSeadragonViewer } from '../../../src/components/OpenSeadragonViewer';
import CanvasWorld from '../../../src/lib/CanvasWorld';
import fixture from '../../fixtures/version-2/019.json';
import { OSDReferences } from '../../../src/plugins/OSDReferences';

const canvases = Utils.parseManifest(fixture).getSequences()[0].getCanvases();

/**
 * Helper function to create a shallow wrapper around OpenSeadragonViewer
 */
function createWrapper(props) {
  /** Stub child component for testing child props passing */
  const Child = ({ testId, zoomToWorld }) => <button type="button" data-testid={testId} onClick={zoomToWorld}>Child</button>;
  Child.propTypes = {
    testId: PropTypes.string.isRequired,
    zoomToWorld: PropTypes.func.isRequired,
  };

  const component = (
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
        getProperty: () => { },
        id: 'http://foo',
      }]}
      windowId="base"
      config={{}}
      updateViewport={jest.fn()}
      t={k => k}
      canvasWorld={new CanvasWorld(canvases)}
      {...props}
    >
      <Child testId="foo" />
    </OpenSeadragonViewer>
  );

  const rendered = render(component);

  const viewer = OSDReferences.get('base').current;

  return { ...rendered, component, viewer };
}

describe('OpenSeadragonViewer', () => {
  let user;
  beforeEach(() => {
    user = userEvent.setup();
  });
  it('renders the component', () => {
    createWrapper({});
    expect(screen.getByLabelText('item')).toHaveClass('mirador-osd-container');
  });
  it('renders child components enhanced with additional props', async () => {
    const { viewer } = createWrapper({});
    const fitBounds = jest.fn();
    jest.replaceProperty(viewer, 'viewport', { fitBounds });

    await user.click(screen.getByTestId('foo'));
    expect(fitBounds).toHaveBeenCalled();
  });

  describe('infoResponsesMatch', () => {
    it('when they do not match', () => {
      const { component, rerender, viewer } = createWrapper({});
      const mockClose = jest.spyOn(viewer, 'close');

      rerender(cloneElement(component, { infoResponses: [] }));

      expect(mockClose).toHaveBeenCalled();
    });
    it('with an empty array', () => {
      const { component, rerender, viewer } = createWrapper({ infoResponses: [] });
      const mockClose = jest.spyOn(viewer, 'close');

      rerender(cloneElement(component, { infoResponses: [] }));

      expect(mockClose).not.toHaveBeenCalled();
    });
    it('when the @ids do match', () => {
      const { component, rerender, viewer } = createWrapper({});
      const mockClose = jest.spyOn(viewer, 'close');

      const newInfos = [
        { id: 'a', json: { '@id': 'http://foo' } },
        { id: 'b', json: { '@id': 'http://bar' } },
      ];

      rerender(cloneElement(component, { infoResponses: newInfos }));

      expect(mockClose).not.toHaveBeenCalled();
    });
    it('when the @ids do not match', () => {
      const { component, rerender, viewer } = createWrapper({});
      const mockClose = jest.spyOn(viewer, 'close');

      rerender(cloneElement(component, { infoResponses: [{ id: 'a', json: { '@id': 'http://foo-degraded' } }] }));

      expect(mockClose).toHaveBeenCalled();
    });
    it('when the id props match', () => {
      const { component, rerender, viewer } = createWrapper({
        infoResponses: [{
          id: 'a',
          json: {
            height: 200,
            id: 'http://foo',
            width: 100,
          },
        }],
      });
      const mockClose = jest.spyOn(viewer, 'close');
      rerender(cloneElement(component, { infoResponses: [{ id: 'a', json: { id: 'http://foo' } }] }));
      expect(mockClose).not.toHaveBeenCalled();
    });
  });

  describe('nonTiledImagedMatch', () => {
    it('when they do not match', () => {
      const { component, rerender, viewer } = createWrapper({});
      const mockClose = jest.spyOn(viewer, 'close');

      rerender(cloneElement(component, { nonTiledImages: [] }));
      expect(mockClose).toHaveBeenCalled();
    });
    it('with an empty array', () => {
      const { component, rerender, viewer } = createWrapper({ nonTiledImages: [] });
      const mockClose = jest.spyOn(viewer, 'close');

      rerender(cloneElement(component, { nonTiledImages: [] }));
      expect(mockClose).not.toHaveBeenCalled();
    });
    it('when the ids do match', () => {
      const { component, rerender, viewer } = createWrapper({});
      const mockClose = jest.spyOn(viewer, 'close');

      rerender(cloneElement(component, { nonTiledImages: [{ id: 'http://foo' }] }));
      expect(mockClose).not.toHaveBeenCalled();
    });
  });

  describe('addAllImageSources', () => {
    it('calls addTileSource for every tileSources and then zoomsToWorld', async () => {
      const { component, rerender, viewer } = createWrapper({ infoResponses: [] });

      const mockAddTiledImage = jest.spyOn(viewer, 'addTiledImage');
      const mockFitBounds = jest.spyOn(viewer.viewport, 'fitBounds');

      rerender(cloneElement(component, { infoResponses: [{ id: 'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44' }, { id: 'https://stacks.stanford.edu/image/iiif/fr426cg9537%2FSC1094_s3_b14_f17_Cats_1976_0005' }] }));

      expect(mockAddTiledImage).toHaveBeenCalledTimes(2);
      await waitFor(() => expect(mockFitBounds).toHaveBeenCalled());
    });

    it('calls addNonTileSource for every nonTiledImage and then zoomsToWorld', async () => {
      const { component, rerender, viewer } = createWrapper({ infoResponses: [], nonTiledImages: [] });

      const mockAddNonTiledImage = jest.spyOn(viewer, 'addSimpleImage').mockImplementation(() => true);
      const mockFitBounds = jest.spyOn(viewer.viewport, 'fitBounds');

      rerender(cloneElement(component, {
        nonTiledImages: [
          { getProperty: () => 'Image' },
          { getProperty: () => 'Image' },
          { getProperty: () => 'Image' },
          { getProperty: () => 'Image' },
        ],
      }));

      expect(mockAddNonTiledImage).toHaveBeenCalledTimes(4);

      await waitFor(() => expect(mockFitBounds).toHaveBeenCalled());
    });
  });

  describe('addNonTiledImage', () => {
    it('calls addSimpleImage asynchronously on the OSD viewer', () => {
      const { component, rerender, viewer } = createWrapper({ nonTiledImages: [] });
      const mockAdd = jest.spyOn(viewer, 'addSimpleImage');
      rerender(cloneElement(component, { nonTiledImages: [{ getProperty: () => 'Image', id: 'a' }] }));

      expect(mockAdd).toHaveBeenCalledWith(expect.objectContaining({ url: 'a' }));
    });

    it('only calls addSimpleImage for images', () => {
      const { component, rerender, viewer } = createWrapper({ nonTiledImages: [] });
      const mockAdd = jest.spyOn(viewer, 'addSimpleImage');
      rerender(cloneElement(component, { nonTiledImages: [{ getProperty: () => 'Video', id: 'a' }] }));

      expect(mockAdd).not.toHaveBeenCalled();
    });
  });

  describe('refreshTileProperties', () => {
    it('updates the index and opacity of the OSD tiles from the canvas world', () => {
      const setOpacity = jest.fn();
      const setItemIndex = jest.fn();
      const canvasWorld = {
        contentResource: i => i,
        layerIndexOfImageResource: i => 1 - i,
        layerOpacityOfImageResource: () => 0.5,
        layers: [{ id: 'a' }, { id: 'b' }],
        worldBounds: () => ([0, 0, 100, 100]),
      };
      const { component, rerender, viewer } = createWrapper({ canvasWorld });

      const newCanvasWorld = {
        ...canvasWorld,
        layers: [{ id: 'a' }, { id: 'c' }],
      };

      jest.spyOn(viewer.world, 'getItemAt').mockImplementation(i => ({ setOpacity, source: { id: i } }));
      jest.spyOn(viewer.world, 'setItemIndex').mockImplementation(setItemIndex);
      jest.spyOn(viewer.world, 'getItemCount').mockImplementation(() => 2);

      rerender(cloneElement(component, { canvasWorld: newCanvasWorld }));

      expect(setOpacity).toHaveBeenCalledTimes(1);
      expect(setOpacity.mock.calls[0]).toEqual([0.5]);

      expect(setItemIndex).toHaveBeenCalledTimes(1);
      expect(setItemIndex.mock.calls[0][0].source.id).toEqual(1);
      expect(setItemIndex.mock.calls[0][1]).toEqual(0);
    });
  });

  describe('zoomToWorld', () => {
    it('uses fitBounds with the existing CanvasWorld', async () => {
      const { viewer } = createWrapper({});
      const fitBounds = jest.fn();
      jest.replaceProperty(viewer, 'viewport', { fitBounds });

      await user.click(screen.getByTestId('foo'));
      expect(fitBounds).toHaveBeenCalledWith({
        degrees: 0, height: 1800, width: 5041, x: 0, y: 0,
      }, expect.anything());
    });
  });

  describe('componentDidMount', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = createWrapper({
        canvasWorld: new CanvasWorld([]),
        tileSources: [{ '@id': 'http://foo' }],
        viewerConfig: { x: 1, y: 0, zoom: 0.5 },
      });
    });

    it('controls the OSD viewport pan and zoom', () => {
      expect(wrapper.viewer.viewport.getZoom()).toBe(0.5);
      expect(wrapper.viewer.viewport.getCenter()).toEqual({ x: 1, y: 0 });
    });
  });

  describe('componentDidUpdate', () => {
    it('calls the OSD viewport panTo and zoomTo with the component state and forces a redraw', () => {
      const { component, rerender, viewer } = createWrapper({});

      rerender(cloneElement(component, {
        viewerConfig: {
          flip: false, rotation: 90, x: 0.5, y: 0.5, zoom: 0.1,
        },
      }));
      expect(viewer.viewport.getFlip()).toBe(false);
      expect(viewer.viewport.getRotation()).toBe(90);
      expect(viewer.viewport.getZoom()).toBe(0.1);
      expect(viewer.viewport.getCenter()).toEqual({ x: 0.5, y: 0.5 });

      rerender(cloneElement(component, {
        viewerConfig: {
          flip: true, rotation: 0, x: 1, y: 0, zoom: 0.5,
        },
      }));
      expect(viewer.viewport.getFlip()).toBe(true);
      expect(viewer.viewport.getRotation()).toBe(0);
      expect(viewer.viewport.getZoom()).toBe(0.5);
      expect(viewer.viewport.getCenter()).toEqual({ x: 1, y: 0 });
    });
  });

  describe('onViewportChange', () => {
    it('translates the OSD viewport data into an update to the component state', () => {
      const updateViewport = jest.fn();
      const { viewer } = createWrapper({ updateViewport });

      jest.replaceProperty(viewer, 'viewport', {
        centerSpringX: { target: { value: 1 } },
        centerSpringY: { target: { value: 0 } },
        getFlip: () => false,
        getRotation: () => 90,
        zoomSpring: { target: { value: 0.5 } },
      });

      viewer.raiseEvent('animation-finish');

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
      jest.useFakeTimers();
      const { viewer } = createWrapper({});
      const mockHandler = jest.fn();
      viewer.addHandler('mouse-move', mockHandler);

      const e = new MouseEvent('mousemove', { clientX: 0, clientY: 0 });
      viewer.innerTracker.moveHandler(e);

      jest.advanceTimersByTime(100);

      expect(mockHandler).toHaveBeenCalledWith(e);

      jest.useRealTimers();
    });
  });
});
