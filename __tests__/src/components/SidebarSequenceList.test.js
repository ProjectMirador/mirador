import React from 'react';
import { shallow } from 'enzyme';
import { Utils } from 'manifesto.js/dist-esmodule/Utils';
import manifestJson from '../../fixtures/version-2/multipleSequences.json';
import SidebarSequenceList from '../../../src/containers/SidebarSequenceList';

/**
 * Helper function to create a shallow wrapper around WindowSideBarCanvasPanel
 */
function createWrapper(props) {
  const sequences = Utils.parseManifest(manifestJson).getSequences();

  return shallow(
    <SidebarSequenceList
      id="asdf"
      classes={{ listItem: 'x' }}
      windowId="xyz"
      sequences={sequences}
      containerRef={{}}
      {...props}
    />,
  );
}

describe('SidebarSequenceList', () => {
  it('renders correct number of sequences on the sidebar', () => {
    const wrapper = createWrapper();
    expect(wrapper.shallow().dive().find('div').length).toEqual(2);
  });

  it('renders the first sequence as open by default', () => {
    const wrapper = createWrapper();
    expect(wrapper.shallow().dive().find('div').first()
      .find('ExpandLessIcon')
      .exists()).toBe(true);
  });
});
