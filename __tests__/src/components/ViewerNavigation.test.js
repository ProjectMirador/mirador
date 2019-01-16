import React from 'react';
import { mount } from 'enzyme';
import { store } from '../../../src/store';
import ViewerNavigation from '../../../src/components/ViewerNavigation';

describe('ViewerNavigation', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <ViewerNavigation
        canvases={[1, 2]}
        window={{ canvasIndex: 0 }}
      />,
      { context: { store } },
    );
  });
  it('renders the component', () => {
    expect(wrapper.find('.mirador-osd-navigation').length).toBe(1);
  });
  it('if canvases are present then disabled on nextCanvas button should be false', () => {
    expect(wrapper.find('.mirador-next-canvas-button').prop('disabled')).toBe(false);
  });
});
