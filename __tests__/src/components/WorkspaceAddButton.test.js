import React from 'react';
import { shallow } from 'enzyme';
import { WorkspaceAddButton } from '../../../src/components/WorkspaceAddButton';
import fixture from '../../fixtures/version-2/002.json';

describe('WorkspaceAddButton', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <WorkspaceAddButton manifests={{ foo: fixture, bar: fixture }} classes={{}} />,
    );
  });

  it('renders without an error', () => {
  });

  it('renders a list item for each manifest in the state', () => {
    expect(wrapper.find('ul Connect(ManifestListItem)').length).toBe(2);
  });

  describe('handleAddManifestClick', () => {
    it('sets the anchor state', () => {
      wrapper.instance().handleAddManifestClick({ currentTarget: true });

      expect(wrapper.dive().find('WithStyles(Menu)').props().open).toBe(true);
    });
  });

  describe('handleAddManifestClose', () => {
    it('resets the anchor state', () => {
      wrapper.instance().handleAddManifestClose();

      expect(wrapper.dive().find('WithStyles(Menu)').props().open).toBe(false);
    });
  });
});
