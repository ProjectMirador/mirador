import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import { Utils } from 'manifesto.js';
import fixture from '../../fixtures/version-2/019.json';
import { SidebarIndexThumbnail } from '../../../src/components/SidebarIndexThumbnail';
import IIIFThumbnail from '../../../src/containers/IIIFThumbnail';

/** */
function createWrapper(props) {
  return shallow(
    <SidebarIndexThumbnail
      canvas={Utils.parseManifest(fixture).getSequences()[0].getCanvases()[1]}
      label="yolo"
      classes={{}}
      config={{ canvasNavigation: { height: 200, width: 100 } }}
      {...props}
    />,
  );
}

describe('SidebarIndexThumbnail', () => {
  it('creates Typography with a canvas label', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(Typography).length).toBe(1);
    expect(wrapper.text()).toEqual(expect.stringContaining('yolo'));
  });
  it('contains a IIIFThumbnail', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(IIIFThumbnail).length).toBe(1);
  });
});
