import React from 'react';
import { shallow } from 'enzyme';
import ViewerNavigation from '../../../src/components/ViewerNavigation';

describe('ViewerNavigation', () => {
  let wrapper;
  let nextCanvas;
  let previousCanvas;
  beforeEach(() => {
    nextCanvas = jest.fn();
    previousCanvas = jest.fn();
    wrapper = shallow(
      <ViewerNavigation
        canvases={[1, 2]}
        nextCanvas={nextCanvas}
        previousCanvas={previousCanvas}
        window={{ canvasIndex: 0 }}
      />,
    );
  });
  it('renders the component', () => {
    expect(wrapper.find('.mirador-osd-navigation').length).toBe(1);
  });
  describe('when next canvases are present', () => {
    it('disabled on nextCanvas button', () => {
      expect(wrapper.find('.mirador-next-canvas-button').prop('disabled')).toBe(false);
    });
    it('nextCanvas function is called after click', () => {
      wrapper.find('.mirador-next-canvas-button').simulate('click');
      expect(nextCanvas).toHaveBeenCalled();
    });
  });
  describe('when previous canvases are not present', () => {
    it('disabled on previousCanvas button', () => {
      expect(wrapper.find('.mirador-previous-canvas-button').prop('disabled')).toBe(true);
    });
    it('previousCanvas function is not called after click, as its disabled', () => {
      wrapper.find('.mirador-previous-canvas-button').simulate('click');
      expect(nextCanvas).not.toHaveBeenCalled();
    });
  });
});
