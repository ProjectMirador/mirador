import React from 'react';
import { shallow } from 'enzyme';
import Grid from 'react-virtualized/dist/commonjs/Grid';
import manifesto from 'manifesto.js';
import { ThumbnailNavigation } from '../../../src/components/ThumbnailNavigation';
import CanvasGroupings from '../../../src/lib/CanvasGroupings';
import manifestJson from '../../fixtures/version-2/019.json';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <ThumbnailNavigation
      canvasGroupings={
        new CanvasGroupings(manifesto.create(manifestJson).getSequences()[0].getCanvases())
      }
      classes={{}}
      window={{
        id: 'foobar',
        canvasIndex: 1,
      }}
      config={{ thumbnailNavigation: { height: 150, width: 100 } }}
      position="far-bottom"
      t={k => k}
      {...props}
    />,
  );
}

describe('ThumbnailNavigation', () => {
  let wrapper;
  let rightWrapper;
  let setCanvas;
  let renderedGrid;
  let grid;
  beforeEach(() => {
    setCanvas = jest.fn();
    // Mock Grid's call to _scrollingContainer, which is handled by refs not
    // available in `shallow`
    Grid.prototype._scrollingContainer = jest.fn( // eslint-disable-line no-underscore-dangle
      () => ({ scrollLeft: 0 }),
    );
    wrapper = createWrapper({ setCanvas });
    grid = wrapper.find('AutoSizer')
      .dive()
      .find('Grid');
    renderedGrid = grid.dive();
  });
  it('renders the component', () => {
    expect(wrapper.find('.mirador-thumb-navigation').length).toBe(1);
  });
  it('renders containers based off of number of canvases', () => {
    expect(renderedGrid.find('.mirador-thumbnail-nav-canvas').length).toBe(3);
  });
  it('sets a mirador-current-canvas class on current canvas', () => {
    expect(wrapper.find('.mirador-thumbnail-nav-canvas-1.mirador-current-canvas'));
  });
  it('renders the canvas labels for each canvas in a GridListTileBar', () => {
    expect(renderedGrid.find('WithStyles(GridListTileBar)').length).toBe(3);
    const firstTitle = renderedGrid.find('WithStyles(GridListTileBar)').first().props().title;
    expect(firstTitle.props.children).toEqual('Test 19 Canvas: 1');
  });
  it('when clicked, updates the current canvas', () => {
    renderedGrid.find('.mirador-thumbnail-nav-canvas-0 WithStyles(GridListTile)').simulate('click');
    expect(setCanvas).toHaveBeenCalledWith('foobar', 0);
  });
  it('sets up calculated width based off of height of area and dimensions of canvas', () => {
    expect(renderedGrid.find('.mirador-thumbnail-nav-container').first().prop('style').width).toEqual(95);
  });
  it('renders canvas thumbnails', () => {
    expect(renderedGrid.find('CanvasThumbnail').length).toBe(3);
  });
  it('Grid is set with expected props for scrolling alignment', () => {
    expect(grid.props().scrollToAlignment).toBe('center');
    expect(grid.props().scrollToColumn).toBe(1);
  });
  it('has a ref set used to reset on view change', () => {
    expect(wrapper.instance().gridRef).not.toBe(null);
  });
  it('renders containers based off of canvas groupings ', () => {
    wrapper = createWrapper({
      setCanvas,
      canvasGroupings: new CanvasGroupings(manifesto.create(manifestJson).getSequences()[0].getCanvases(), 'book'),
    });
    grid = wrapper.find('AutoSizer')
      .dive()
      .find('Grid');
    renderedGrid = grid.dive();
    expect(renderedGrid.find('.mirador-thumbnail-nav-canvas').length).toBe(2);
    expect(renderedGrid.find('CanvasThumbnail').length).toBe(3);
    expect(wrapper.instance().scrollToColumn()).toBe(1);
  });
  it('triggers a recomputeGridSize on view change', () => {
    const mockRecompute = jest.fn();
    wrapper.instance().gridRef = { current: { recomputeGridSize: mockRecompute } };
    wrapper.setProps({
      window: {
        id: 'foobar',
        canvasIndex: 1,
        thumbnailNavigationPosition: 'bottom',
        view: 'book',
      },
    });
    expect(mockRecompute).toHaveBeenCalled();
  });
  describe('calculating instance methods', () => {
    beforeEach(() => {
      rightWrapper = createWrapper({ setCanvas, position: 'far-right' });
    });
    it('style', () => {
      expect(wrapper.instance().style()).toMatchObject({ height: '150px', width: '100%' });
      expect(rightWrapper.instance().style()).toMatchObject({ height: '100%', width: '131px' });
    });
    it('rightWidth', () => {
      expect(wrapper.instance().rightWidth()).toEqual(100);
      const mockRecompute = jest.fn();
      wrapper.instance().gridRef = { current: { recomputeGridSize: mockRecompute } };
      wrapper.setProps({
        window: {
          id: 'foobar',
          canvasIndex: 1,
          thumbnailNavigationPosition: 'bottom',
          view: 'book',
        },
      });
      expect(wrapper.instance().rightWidth()).toEqual(200);
    });
    it('calculateScaledWidth', () => {
      expect(wrapper.instance().calculateScaledWidth({ index: 0 })).toEqual(95);
      expect(rightWrapper.instance().calculateScaledWidth({ index: 0 })).toEqual(116);
    });
    it('calculateScaledHeight', () => {
      expect(wrapper.instance().calculateScaledHeight({ index: 0 })).toEqual(135);
      expect(rightWrapper.instance().calculateScaledHeight({ index: 0 })).toEqual(166);
    });

    it('columnCount', () => {
      expect(wrapper.instance().columnCount()).toEqual(3);
      expect(rightWrapper.instance().columnCount()).toEqual(1);
    });
    it('rowCount', () => {
      expect(wrapper.instance().rowCount()).toEqual(1);
      expect(rightWrapper.instance().rowCount()).toEqual(3);
    });
    it('areaHeight', () => {
      expect(wrapper.instance().areaHeight()).toEqual(150);
      expect(rightWrapper.instance().areaHeight(99)).toEqual(99);
    });
  });
});
