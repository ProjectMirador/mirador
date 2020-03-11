import React from 'react';
import { shallow } from 'enzyme';
import { Utils } from 'manifesto.js/dist-esmodule/Utils';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import manifestJson from '../../fixtures/version-2/019.json';
import { GalleryViewThumbnail } from '../../../src/components/GalleryViewThumbnail';
import { CanvasThumbnail } from '../../../src/components/CanvasThumbnail';

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
    expect(wrapper.find(CanvasThumbnail).length).toBe(1);
    expect(wrapper.find(CanvasThumbnail).prop('maxHeight')).toBe(55);
  });
  it('renders the canvas labels for each canvas in canvas items', () => {
    wrapper = createWrapper();
    expect(wrapper.find(Typography).length).toBe(1);
  });
  it('sets the selected canvas on click', () => {
    const setCanvas = jest.fn();
    wrapper = createWrapper({ setCanvas });
    wrapper.find('div[role="button"]').first().simulate('click');
    expect(setCanvas).toHaveBeenCalledWith('http://iiif.io/api/presentation/2.0/example/fixtures/canvas/24/c1.json');
    expect(wrapper.find(Typography).length).toBe(1);
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

  describe('annotation count chip', () => {
    it('hides the chip if there are no annotations', () => {
      wrapper = createWrapper({ annotationsCount: 0 });
      expect(wrapper.find(Chip).length).toEqual(0);
    });

    it('shows the number of search annotations on a canvas', () => {
      wrapper = createWrapper({ annotationsCount: 50 });
      expect(wrapper.find(Chip).length).toEqual(1);
      expect(wrapper.find(Chip).prop('label')).toEqual(50);
      expect(wrapper.find(Chip).prop('className')).toEqual('');
    });

    it('shows the number of search annotations on a canvas', () => {
      wrapper = createWrapper({ annotationsCount: 50, annotationSelected: true });
      expect(wrapper.find(Chip).length).toEqual(1);
      expect(wrapper.find(Chip).prop('label')).toEqual(50);
      expect(wrapper.find(Chip).prop('className')).toEqual('selected');
    });
  });
});
