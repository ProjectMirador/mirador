import React from 'react';
import { shallow } from 'enzyme';
import { ViewerNavigation } from '../../../src/components/ViewerNavigation';

describe('ViewerNavigation', () => {
  let wrapper;
  let setCanvas;
  beforeEach(() => {
    setCanvas = jest.fn();
    wrapper = shallow(
      <ViewerNavigation
        canvases={[1, 2]}
        setCanvas={setCanvas}
        window={{ id: 'foo', canvasIndex: 0 }}
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
    it('setCanvas function is called after click', () => {
      wrapper.find('.mirador-next-canvas-button').simulate('click');
      expect(setCanvas).toHaveBeenCalledWith('foo', 1);
    });
  });
  describe('when next canvases are not present', () => {
    it('nextCanvas button is disabled', () => {
      const endWrapper = shallow(
        <ViewerNavigation
          canvases={[1, 2]}
          setCanvas={() => {}}
          window={{ id: 'foo', canvasIndex: 1 }}
        />,
      );
      expect(endWrapper.find('.mirador-next-canvas-button').prop('disabled')).toBe(true);
    });
  });
  describe('when previous canvases are not present', () => {
    it('disabled on previousCanvas button', () => {
      expect(wrapper.find('.mirador-previous-canvas-button').prop('disabled')).toBe(true);
    });
    it('setCanvas function is not called after click, as its disabled', () => {
      wrapper.find('.mirador-previous-canvas-button').simulate('click');
      expect(setCanvas).not.toHaveBeenCalled();
    });
  });
  describe('bookView', () => {
    it('setCanvas function is called after click for next', () => {
      wrapper = shallow(
        <ViewerNavigation
          canvases={[1, 2, 3]}
          setCanvas={setCanvas}
          window={{ id: 'foo', canvasIndex: 0, view: 'book' }}
        />,
      );
      wrapper.find('.mirador-next-canvas-button').simulate('click');
      expect(setCanvas).toHaveBeenCalledWith('foo', 2);
    });
    it('setCanvas function is called after click for previous', () => {
      wrapper = shallow(
        <ViewerNavigation
          canvases={[1, 2]}
          setCanvas={setCanvas}
          window={{ id: 'foo', canvasIndex: 5, view: 'book' }}
        />,
      );
      wrapper.find('.mirador-previous-canvas-button').simulate('click');
      expect(setCanvas).toHaveBeenCalledWith('foo', 3);
    });
  });
});
