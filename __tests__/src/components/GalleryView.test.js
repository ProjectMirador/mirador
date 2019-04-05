import React from 'react';
import { shallow } from 'enzyme';
import manifesto from 'manifesto.js';
import manifestJson from '../../fixtures/version-2/019.json';
import { GalleryView } from '../../../src/components/GalleryView';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <GalleryView
      canvases={manifesto.create(manifestJson).getSequences()[0].getCanvases()}
      classes={{ galleryViewItemCurrent: 'galleryViewItemCurrent' }}
      window={{
        canvasIndex: 0,
        id: '1234',
      }}
      setCanvas={() => {}}
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
    expect(wrapper.find('div[role="button"]').length).toBe(3);
  });
  it('sets a mirador-current-canvas-grouping class on current canvas', () => {
    expect(wrapper.find('div[role="button"]').at(0).props().className).toEqual('galleryViewItemCurrent');
  });
  it('renders the canvas labels for each canvas in canvas items', () => {
    expect(wrapper.find('WithStyles(Typography)').length).toBe(3);
  });
  it('gives special class to current canvas item', () => {
    wrapper.find('div[role="button"]').first().simulate('click');
    expect(setCanvas).toHaveBeenCalledWith('1234', 0);
    expect(wrapper.find('WithStyles(Typography)').length).toBe(3);
  });
});
