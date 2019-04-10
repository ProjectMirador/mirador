import React from 'react';
import { shallow } from 'enzyme';
import manifesto from 'manifesto.js';
import manifestJson from '../../fixtures/version-2/019.json';
import { GalleryView } from '../../../src/components/GalleryView';
import GalleryViewThumbnail from '../../../src/containers/GalleryViewThumbnail';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <GalleryView
      canvases={manifesto.create(manifestJson).getSequences()[0].getCanvases()}
      windowId="1234"
      selectedCanvasIndex={0}
      {...props}
    />,
  );
}

describe('GalleryView', () => {
  let setCanvas;
  let wrapper;
  beforeEach(() => {
    setCanvas = jest.fn();
    wrapper = createWrapper({ setCanvas });
  });
  it('renders the component', () => {
    expect(wrapper.find('section').length).toBe(1);
  });
  it('renders gallery items for all canvases', () => {
    expect(wrapper.find(GalleryViewThumbnail).length).toBe(3);
    expect(wrapper.find(GalleryViewThumbnail).at(0).prop('selected')).toBe(true);
  });
});
