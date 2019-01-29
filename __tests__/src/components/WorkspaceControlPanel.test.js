import React from 'react';
import { shallow } from 'enzyme';
import { actions, store } from '../../../src/store';
import WorkspaceControlPanel from '../../../src/components/WorkspaceControlPanel';
import fixture from '../../fixtures/version-2/002.json';

describe('WorkspaceControlPanel', () => {
  let wrapper;
  beforeEach(() => {
    store.dispatch(actions.receiveManifest('foo', fixture));
    store.dispatch(actions.receiveManifest('bar', fixture));
    wrapper = shallow(<WorkspaceControlPanel store={store} />).dive().dive();
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(Drawer)').length).toBe(1);
    expect(wrapper.find('Connect(miradorWithPlugins(WorkspaceControlPanelButtons))').length).toBe(1);
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
