import React from 'react';
import { shallow } from 'enzyme';
import manifesto from 'manifesto.js';
import manifestJson from '../../fixtures/version-2/019.json';
import { GalleryViewThumbnail } from '../../../src/components/GalleryViewThumbnail';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <GalleryViewThumbnail
      canvas={manifesto.create(manifestJson).getSequences()[0].getCanvases()[0]}
      classes={{ galleryViewItemCurrent: 'galleryViewItemCurrent' }}
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
    expect(wrapper.find('div[role="button"]').at(0).prop('className')).toEqual('galleryViewItemCurrent');

    wrapper = createWrapper({ selected: false });
    expect(wrapper.find('div[role="button"]').at(0).prop('className')).not.toEqual('galleryViewItemCurrent');
  });
  it('renders the canvas labels for each canvas in canvas items', () => {
    wrapper = createWrapper();
    expect(wrapper.find('WithStyles(Typography)').length).toBe(1);
  });
  it('sets the selected canvas on click', () => {
    const setCanvas = jest.fn();
    wrapper = createWrapper({ setCanvas });
    wrapper.find('div[role="button"]').first().simulate('click');
    expect(setCanvas).toHaveBeenCalledWith(0);
    expect(wrapper.find('WithStyles(Typography)').length).toBe(1);
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
});
