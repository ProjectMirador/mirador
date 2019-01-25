import React from 'react';
import { shallow } from 'enzyme';
import { ThumbnailNavigation } from '../../../src/components/ThumbnailNavigation';

describe('ThumbnailNavigation', () => {
  let wrapper;
  let setCanvas;
  let renderedGrid;
  beforeEach(() => {
    setCanvas = jest.fn();
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
    renderedGrid = wrapper.find('AutoSizer')
      .dive()
      .find('Grid')
      .dive();
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
});
