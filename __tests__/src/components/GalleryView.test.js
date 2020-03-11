import React from 'react';
import { shallow } from 'enzyme';
import { Utils } from 'manifesto.js/dist-esmodule/Utils';
import Paper from '@material-ui/core/Paper';
import manifestJson from '../../fixtures/version-2/019.json';
import { GalleryView } from '../../../src/components/GalleryView';
import GalleryViewThumbnail from '../../../src/containers/GalleryViewThumbnail';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <GalleryView
      canvases={Utils.parseManifest(manifestJson).getSequences()[0].getCanvases()}
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
    expect(wrapper.find(Paper).length).toBe(1);
    expect(wrapper.find(Paper).prop('component')).toEqual('section');
  });
  it('renders gallery items for all canvases', () => {
    expect(wrapper.find(GalleryViewThumbnail).length).toBe(3);
  });

  describe('when viewingDirection="right-to-left"', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        viewingDirection: 'right-to-left',
      });
    });

    it('sets up Paper to be rtl', () => {
      expect(wrapper.find('WithStyles(ForwardRef(Paper))').props().dir).toEqual('rtl');
    });
  });
});
