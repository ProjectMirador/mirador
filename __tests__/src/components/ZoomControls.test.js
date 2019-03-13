import React from 'react';
import { shallow } from 'enzyme';
import { ZoomControls } from '../../../src/components/ZoomControls';

describe('ZoomControls', () => {
  let wrapper;
  const viewer = { x: 100, y: 100, zoom: 1 };
  const showZoomControls = false;
  let updateViewport;

  beforeEach(() => {
    updateViewport = jest.fn();
    wrapper = shallow(
      <ZoomControls
        classes={{ zoom_controls: 'zoom_controls' }}
        windowId="xyz"
        viewer={viewer}
        showZoomControls={showZoomControls}
        updateViewport={updateViewport}
      />,
    );
  });

  describe('with showZoomControls=false', () => {
    it('renders nothing unless asked', () => {
      expect(wrapper.find('div.zoom_controls').length).toBe(0);
    });
  });


  describe('with showZoomControls=true', () => {
    beforeEach(() => {
      updateViewport = jest.fn();
      wrapper = shallow(
        <ZoomControls
          classes={{ zoom_controls: 'zoom_controls' }}
          windowId="xyz"
          viewer={viewer}
          showZoomControls
          updateViewport={updateViewport}
        />,
      );
    });

    it('renders a couple buttons', () => {
      expect(wrapper.find('div.zoom_controls').length).toBe(1);
      expect(wrapper.find('MiradorMenuButton').length).toBe(3);
    });

    it('has a zoom-in button', () => {
      const button = wrapper.find({ 'aria-label': 'zoomIn' }).first();
      button.props().onClick(); // Trigger the onClick prop
      expect(updateViewport).toHaveBeenCalledTimes(1);
      expect(updateViewport).toHaveBeenCalledWith('xyz', { x: 100, y: 100, zoom: 2 });
    });

    it('has a zoom-out button', () => {
      const button = wrapper.find({ 'aria-label': 'zoomOut' }).first();
      button.props().onClick(); // Trigger the onClick prop
      expect(updateViewport).toHaveBeenCalledTimes(1);
      expect(updateViewport).toHaveBeenCalledWith('xyz', { x: 100, y: 100, zoom: 0.5 });
    });

    it('has a zoom reseet button', () => {
      const button = wrapper.find({ 'aria-label': 'zoomReset' }).first();
      button.props().onClick(); // Trigger the onClick prop
      expect(updateViewport).toHaveBeenCalledTimes(1);
      expect(updateViewport).toHaveBeenCalledWith('xyz', { x: 100, y: 100, zoom: 1 });
    });
  });

  describe('handleZoomInClick', () => {
    it('increases the zoom value on Zoom-In', () => {
      wrapper.instance().handleZoomInClick();
      expect(updateViewport).toHaveBeenCalled();
    });
  });
});
