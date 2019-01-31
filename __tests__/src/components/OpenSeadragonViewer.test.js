import React from 'react';
import { shallow } from 'enzyme';
import OpenSeadragonViewer from '../../../src/components/OpenSeadragonViewer';

describe('OpenSeadragonViewer', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <OpenSeadragonViewer
        tileSources={[{ '@id': 'http://foo' }]}
        window={{ id: 'base' }}
        config={{}}
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
      wrapper.instance().viewer = {
        addTiledImage: jest.fn().mockResolvedValue('event'),
      };
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
          imageToViewportRectangle: jest.fn(),
        },
      };
      wrapper.instance().fitBounds(1, 2, 3, 4);
      expect(
        wrapper.instance().viewer.viewport.imageToViewportRectangle,
      ).toHaveBeenCalledWith(1, 2, 3, 4);
      expect(
        wrapper.instance().viewer.viewport.fitBounds,
      ).toHaveBeenCalled();
    });
  });
});
