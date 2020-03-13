import React from 'react';
import { shallow } from 'enzyme';
import { Utils } from 'manifesto.js/dist-esmodule/Utils';
import Typography from '@material-ui/core/Typography';
import { CaptionedCanvasThumbnail } from '../../../src/components/CaptionedCanvasThumbnail';
import manifestJson from '../../fixtures/version-2/019.json';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <CaptionedCanvasThumbnail
      canvas={Utils.parseManifest(manifestJson).getSequences()[0].getCanvases()[0]}
      classes={{}}
      height={100}
      {...props}
    />,
  );
}

describe('CaptionedCanvasThumbnail', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper();
  });
  it('renders', () => {
    expect(wrapper.find('CanvasThumbnail').length).toEqual(1);
  });
  it('sets a maxWidth style for the CanvasThumbnail', () => {
    expect(wrapper.find('CanvasThumbnail').first().props().style.maxWidth).toEqual('67px');
  });
  it('adds a caption', () => {
    expect(wrapper.find(Typography).props().children).toEqual('Test 19 Canvas: 1');
  });
});
