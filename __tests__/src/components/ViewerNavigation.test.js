import React from 'react';
import { shallow } from 'enzyme';
import { ViewerNavigation } from '../../../src/components/ViewerNavigation';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <ViewerNavigation
      canvases={[1, 2]}
      t={k => (k)}
      {...props}
    />,
  );
}

describe('ViewerNavigation', () => {
  let wrapper;
  let setNextCanvas;
  let setPreviousCanvas;
  beforeEach(() => {
    setNextCanvas = jest.fn();
    setPreviousCanvas = jest.fn();
    wrapper = createWrapper({
      hasNextCanvas: true,
      hasPreviousCanvas: false,
      setNextCanvas,
      setPreviousCanvas,
    });
  });
  it('renders the component', () => {
    expect(wrapper.find('.mirador-osd-navigation').length).toBe(1);
  });
  describe('when next canvases are present', () => {
    it('nextCanvas button is not disabled', () => {
      expect(wrapper.find('.mirador-next-canvas-button').prop('aria-label')).toBe('nextCanvas');
      expect(wrapper.find('.mirador-next-canvas-button').prop('disabled')).toBe(false);
    });
    it('setNextCanvas function is called after click', () => {
      wrapper.find('.mirador-next-canvas-button').simulate('click');
      expect(setNextCanvas).toHaveBeenCalled();
    });
  });
  describe('when next canvases are not present', () => {
    it('nextCanvas button is disabled', () => {
      const endWrapper = createWrapper();
      expect(endWrapper.find('.mirador-next-canvas-button').prop('disabled')).toBe(true);
      endWrapper.find('.mirador-next-canvas-button').simulate('click');
      expect(setNextCanvas).not.toHaveBeenCalled();
    });
  });
  describe('when previous canvases are present', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        hasNextCanvas: false,
        hasPreviousCanvas: true,
        setNextCanvas,
        setPreviousCanvas,
      });
    });
    it('previousCanvas button is not disabled', () => {
      expect(wrapper.find('.mirador-previous-canvas-button').prop('aria-label')).toBe('previousCanvas');
      expect(wrapper.find('.mirador-previous-canvas-button').prop('disabled')).toBe(false);
    });
    it('setPreviousCanvas function is called after click', () => {
      wrapper.find('.mirador-previous-canvas-button').simulate('click');
      expect(setPreviousCanvas).toHaveBeenCalled();
    });
  });
  describe('when previous canvases are not present', () => {
    it('disabled on previousCanvas button', () => {
      expect(wrapper.find('.mirador-previous-canvas-button').prop('disabled')).toBe(true);
    });
    it('setCanvas function is not called after click, as its disabled', () => {
      wrapper.find('.mirador-previous-canvas-button').simulate('click');
      expect(setPreviousCanvas).not.toHaveBeenCalled();
    });
  });
});
