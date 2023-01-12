import React from 'react';
import { shallow } from 'enzyme';
import { Utils } from 'manifesto.js';
import Chip from '@material-ui/core/Chip';
import { InView } from 'react-intersection-observer';
import manifestJson from '../../fixtures/version-2/019.json';
import { GalleryViewThumbnail } from '../../../src/components/GalleryViewThumbnail';
import IIIFThumbnail from '../../../src/containers/IIIFThumbnail';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <GalleryViewThumbnail
      canvas={Utils.parseManifest(manifestJson).getSequences()[0].getCanvases()[0]}
      classes={{ selected: 'selected' }}
      focusOnCanvas={() => {}}
      setCanvas={() => {}}
      {...props}
    />,
  );
}

describe('GalleryView', () => {
  let wrapper;
  it('sets a mirador-current-canvas-grouping class if the canvas is selected', () => {
    wrapper = createWrapper({ selected: true });
    expect(wrapper.find('div[role="button"]').at(0).prop('className')).toEqual('selected');

    wrapper = createWrapper({ selected: false });
    expect(wrapper.find('div[role="button"]').at(0).prop('className')).not.toEqual('selected');
  });
  it('renders the thumbnail', () => {
    wrapper = createWrapper({ config: { height: 55 } });
    expect(wrapper.find(IIIFThumbnail).length).toBe(1);
    expect(wrapper.find(IIIFThumbnail).prop('maxHeight')).toBe(55);
  });
  it('sets the selected canvas on click', () => {
    const setCanvas = jest.fn();
    wrapper = createWrapper({ setCanvas });
    wrapper.find('div[role="button"]').first().simulate('click');
    expect(setCanvas).toHaveBeenCalledWith('http://iiif.io/api/presentation/2.0/example/fixtures/canvas/24/c1.json');
  });

  it('sets the window mode if the selected canvas is clicked', () => {
    const focusOnCanvas = jest.fn();
    wrapper = createWrapper({ focusOnCanvas, selected: true });
    wrapper.find('div[role="button"]').first().simulate('click');
    expect(focusOnCanvas).toHaveBeenCalled();
  });

  it('sets the window mode if the user hits enter while on a canvas', () => {
    const focusOnCanvas = jest.fn();
    wrapper = createWrapper({ focusOnCanvas, selected: true });
    wrapper.find('div[role="button"]').first().simulate('keyUp', { key: 'Enter' });
    expect(focusOnCanvas).toHaveBeenCalled();
  });

  it('sets the window mode if the user hits space while on a canvas', () => {
    const focusOnCanvas = jest.fn();
    wrapper = createWrapper({ focusOnCanvas, selected: true });
    wrapper.find('div[role="button"]').first().simulate('keyUp', { key: ' ' });
    expect(focusOnCanvas).toHaveBeenCalled();
  });

  it('sets the canvas if the user hits a key (non-space or non-enter) while on a canvas', () => {
    const setCanvas = jest.fn();
    wrapper = createWrapper({ selected: true, setCanvas });
    wrapper.find('div[role="button"]').first().simulate('keyUp', { key: 'd' });
    expect(setCanvas).toHaveBeenCalledWith('http://iiif.io/api/presentation/2.0/example/fixtures/canvas/24/c1.json');
  });

  describe('on-demand annotation fetching', () => {
    it('fetches annotations', () => {
      const requestCanvasAnnotations = jest.fn();
      const canvas = {
        getHeight: () => 50,
        getWidth: () => 50,
      };
      wrapper = createWrapper({ annotationsCount: 0, canvas, requestCanvasAnnotations });

      wrapper.find(InView).simulate('change', { isIntersecting: true });
      expect(requestCanvasAnnotations).toHaveBeenCalled();
    });
    it('does nothing if there is no intersection', () => {
      const requestCanvasAnnotations = jest.fn();
      const canvas = {
        getHeight: () => 50,
        getWidth: () => 50,
      };
      wrapper = createWrapper({ canvas, requestCanvasAnnotations });

      wrapper.find(InView).simulate('change', { isIntersecting: false });
      expect(requestCanvasAnnotations).not.toHaveBeenCalled();
    });
    it('does nothing if there are already some annotations', () => {
      const requestCanvasAnnotations = jest.fn();
      const canvas = {
        getHeight: () => 50,
        getWidth: () => 50,
      };
      wrapper = createWrapper({ annotationsCount: 5, canvas, requestCanvasAnnotations });

      wrapper.find(InView).simulate('change', { isIntersecting: true });
      expect(requestCanvasAnnotations).not.toHaveBeenCalled();
    });
  });

  describe('annotation count chip', () => {
    it('hides the chip if there are no annotations', () => {
      wrapper = createWrapper({ annotationsCount: 0 });
      expect(wrapper.find(Chip).length).toEqual(0);
    });

    it('shows the number of search annotations on a canvas', () => {
      wrapper = createWrapper({ annotationsCount: 50 });
      expect(wrapper.find(Chip).length).toEqual(1);
      expect(wrapper.find(Chip).prop('label')).toEqual(50);
    });
  });

  describe('search annotation count chip', () => {
    it('hides the chip if there are no annotations', () => {
      wrapper = createWrapper({ searchAnnotationsCount: 0 });
      expect(wrapper.find(Chip).length).toEqual(0);
    });

    it('shows the number of search annotations on a canvas', () => {
      wrapper = createWrapper({ searchAnnotationsCount: 50 });
      expect(wrapper.find(Chip).length).toEqual(1);
      expect(wrapper.find(Chip).prop('label')).toEqual(50);
    });
  });
});
