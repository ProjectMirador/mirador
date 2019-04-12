import React from 'react';
import { shallow } from 'enzyme';
import { ViewerNavigation } from '../../../src/components/ViewerNavigation';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <ViewerNavigation
      canvases={[1, 2]}
      setCanvas={() => {}}
      window={{}}
      t={k => (k)}
      {...props}
    />,
  );
}

describe('ViewerNavigation', () => {
  let wrapper;
  let setCanvas;
  beforeEach(() => {
    setCanvas = jest.fn();
    wrapper = createWrapper({
      canvasIndex: 0,
      setCanvas,
      window: {
        id: 'foo',
      },
    });
  });
  it('renders the component', () => {
    expect(wrapper.find('.mirador-osd-navigation').length).toBe(1);
  });
  describe('when next canvases are present', () => {
    it('disabled on nextCanvas button', () => {
      expect(wrapper.find('.mirador-next-canvas-button').prop('aria-label')).toBe('nextCanvas');
      expect(wrapper.find('.mirador-next-canvas-button').prop('disabled')).toBe(false);
    });
    it('setCanvas function is called after click', () => {
      wrapper.find('.mirador-next-canvas-button').simulate('click');
      expect(setCanvas).toHaveBeenCalledWith('foo', 1);
    });
  });
  describe('when next canvases are not present', () => {
    it('nextCanvas button is disabled', () => {
      const endWrapper = createWrapper({
        canvasIndex: 1,
        window: {
          id: 'foo',
        },
      });
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
      wrapper = createWrapper({
        canvases: [1, 2, 3],
        canvasIndex: 0,
        setCanvas,
        window: {
          id: 'foo',
          view: 'book',
        },
      });
      wrapper.find('.mirador-next-canvas-button').simulate('click');
      expect(setCanvas).toHaveBeenCalledWith('foo', 2);
    });
    it('setCanvas function is called after click for previous', () => {
      wrapper = createWrapper({
        canvasIndex: 5,
        setCanvas,
        window: {
          id: 'foo',
          view: 'book',
        },
      });
      wrapper.find('.mirador-previous-canvas-button').simulate('click');
      expect(wrapper.find('.mirador-previous-canvas-button').prop('aria-label')).toBe('previousCanvas');
      expect(setCanvas).toHaveBeenCalledWith('foo', 3);
    });
  });
});
