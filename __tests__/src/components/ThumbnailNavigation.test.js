import React from 'react';
import { shallow } from 'enzyme';
import Grid from 'react-virtualized/dist/commonjs/Grid';
import { ThumbnailNavigation } from '../../../src/components/ThumbnailNavigation';

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
        canvases={[
          {
            index: 0,
            getHeight: () => (1000),
            getWidth: () => (2000),
            getCanonicalImageUri: () => ('http://imageuri'),
          },
          {
            index: 1,
            getHeight: () => (1000),
            getWidth: () => (2000),
            getCanonicalImageUri: () => ('http://imageuri'),
          },
        ]}
        window={{
          id: 'foobar',
          canvasIndex: 1,
          thumbnailNavigationDisplayed: true,
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
    expect(renderedGrid.find('.mirador-thumbnail-nav-canvas').length).toBe(2);
  });
  it('sets a mirador-current-canvas class on current canvas', () => {
    expect(wrapper.find('.mirador-thumbnail-nav-canvas-1.mirador-current-canvas'));
  });
  it('when clicked, updates the current canvas', () => {
    renderedGrid.find('.mirador-thumbnail-nav-canvas-0').simulate('click');
    expect(setCanvas).toHaveBeenCalledWith('foobar', 0);
  });
  it('sets up calculated width based off of height of area and dimensions of canvas', () => {
    expect(renderedGrid.find('.mirador-thumbnail-nav-container').first().prop('style').width).toEqual(308);
    expect(renderedGrid.find('.mirador-thumbnail-nav-canvas').first().prop('style').width).toEqual(300);
  });
  it('Grid is set with expected props for scrolling alignment', () => {
    expect(grid.props().scrollToAlignment).toBe('center');
    expect(grid.props().scrollToColumn).toBe(1);
    expect(grid.props().columnIndex).toBe(1);
  });
});
