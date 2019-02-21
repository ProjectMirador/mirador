import React from 'react';
import { shallow } from 'enzyme';
import Grid from 'react-virtualized/dist/commonjs/Grid';
import manifesto from 'manifesto.js';
import ThumbnailNavigation from '../../../src/components/ThumbnailNavigation';
import manifestJson from '../../fixtures/version-2/019.json';

describe('ThumbnailNavigation', () => {
  let wrapper;
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
    wrapper = shallow(
      <ThumbnailNavigation
        canvases={
          manifesto.create(manifestJson).getSequences()[0].getCanvases()
        }
        window={{
          id: 'foobar',
          canvasIndex: 1,
          thumbnailNavigationPosition: 'bottom',
        }}
        config={{ thumbnailNavigation: { height: 150 } }}
        setCanvas={setCanvas}
      />,
    );
    grid = wrapper.find('AutoSizer')
      .dive()
      .find('Grid');
    renderedGrid = grid.dive();
  });
  it('renders the component', () => {
    expect(wrapper.find('.mirador-thumb-navigation').length).toBe(1);
  });
  it('renders li elements based off of number of canvases', () => {
    expect(renderedGrid.find('.mirador-thumbnail-nav-canvas').length).toBe(3);
  });
  it('sets a mirador-current-canvas class on current canvas', () => {
    expect(wrapper.find('.mirador-thumbnail-nav-canvas-1.mirador-current-canvas'));
  });
  it('when clicked, updates the current canvas', () => {
    renderedGrid.find('.mirador-thumbnail-nav-canvas-0 CanvasThumbnail').simulate('click');
    expect(setCanvas).toHaveBeenCalledWith('foobar', 0);
  });
  it('sets up calculated width based off of height of area and dimensions of canvas', () => {
    expect(renderedGrid.find('.mirador-thumbnail-nav-container').first().prop('style').width).toEqual(108);
    expect(renderedGrid.find('.mirador-thumbnail-nav-canvas').first().prop('style').width).toEqual(100);
  });
  it('renders canvas thumbnails', () => {
    expect(renderedGrid.find('CanvasThumbnail').length).toBe(3);
  });
  it('Grid is set with expected props for scrolling alignment', () => {
    expect(grid.props().scrollToAlignment).toBe('center');
    expect(grid.props().scrollToColumn).toBe(1);
    expect(grid.props().columnIndex).toBe(1);
  });
});
