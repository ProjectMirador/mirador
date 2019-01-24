import React from 'react';
import { shallow } from 'enzyme';
import { ThumbnailNavigation } from '../../../src/components/ThumbnailNavigation';

describe('ThumbnailNavigation', () => {
  let wrapper;
  let setCanvas;
  beforeEach(() => {
    setCanvas = jest.fn();
    wrapper = shallow(
      <ThumbnailNavigation
        canvases={[
          {
            index: 0,
          },
          {
            index: 1,
          },
        ]}
        window={{
          id: 'foobar',
          canvasIndex: 1,
        }}
        config={{}}
        setCanvas={setCanvas}
      />,
    );
  });
  it('renders the component', () => {
    expect(wrapper.find('.mirador-thumb-navigation').length).toBe(1);
  });
  it('renders li elements based off of number of canvases', () => {
    expect(wrapper.find('.mirador-thumbnail-nav-canvas').length).toBe(2);
  });
  it('sets a mirador-current-canvas class on current canvas', () => {
    expect(wrapper.find('.mirador-thumbnail-nav-canvas-1.mirador-current-canvas'));
  });
  it('when clicked, updates the current canvas', () => {
    wrapper.find('.mirador-thumbnail-nav-canvas-0').simulate('click');
    expect(setCanvas).toHaveBeenCalledWith('foobar', 0);
  });
});
