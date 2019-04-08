import React from 'react';
import { shallow } from 'enzyme';
import MiradorMenuButton from '../../../src/containers/MiradorMenuButton';
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
        zoomIn={() => {}}
        zoomOut={() => {}}
        zoomToWorld={() => {}}
      />,
    );
  });

  describe('with showZoomControls=false', () => {
    it('renders nothing unless asked', () => {
      expect(wrapper.find('div.zoom_controls').length).toBe(0);
    });
  });


  describe('with showZoomControls=true', () => {
    const zoomIn = jest.fn();
    const zoomOut = jest.fn();
    const zoomToWorld = jest.fn();
    beforeEach(() => {
      updateViewport = jest.fn();
      wrapper = shallow(
        <ZoomControls
          classes={{ zoom_controls: 'zoom_controls' }}
          windowId="xyz"
          viewer={viewer}
          showZoomControls
          updateViewport={updateViewport}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          zoomToWorld={zoomToWorld}
        />,
      );
    });

    it('renders a couple buttons', () => {
      expect(wrapper.find('div.zoom_controls').length).toBe(1);
      expect(wrapper.find(MiradorMenuButton).length).toBe(3);
    });

    it('has a zoom-in button', () => {
      const button = wrapper.find({ 'aria-label': 'zoomIn' }).first();
      button.props().onClick(); // Trigger the onClick prop
      expect(zoomIn).toHaveBeenCalledTimes(1);
    });

    it('has a zoom-out button', () => {
      const button = wrapper.find({ 'aria-label': 'zoomOut' }).first();
      button.props().onClick(); // Trigger the onClick prop
      expect(zoomOut).toHaveBeenCalledTimes(1);
    });

    it('has a zoom reset button', () => {
      const button = wrapper.find({ 'aria-label': 'zoomReset' }).first();
      button.props().onClick(); // Trigger the onClick prop
      expect(zoomToWorld).toHaveBeenCalledTimes(1);
      expect(zoomToWorld).toHaveBeenCalledWith(false);
    });
  });
});
