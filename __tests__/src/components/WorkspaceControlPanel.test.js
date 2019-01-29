import React from 'react';
import { shallow } from 'enzyme';
import createStore from '../../../src/state/createStore';
import * as actions from '../../../src/state/actions';
import WorkspaceControlPanel from '../../../src/components/WorkspaceControlPanel';
import fixture from '../../fixtures/version-2/002.json';

describe('WorkspaceControlPanel', () => {
  let wrapper;
  const store = createStore();
  beforeEach(() => {
    store.dispatch(actions.receiveManifest('foo', fixture));
    store.dispatch(actions.receiveManifest('bar', fixture));
    wrapper = shallow(<WorkspaceControlPanel store={store} />).dive().dive();
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(Drawer)').length).toBe(1);
  });

  it('renders a list item for each manifest in the state', () => {
    expect(wrapper.find('ul Connect(ManifestListItem)').length).toBe(2);
  });

  describe('handleClose', () => {
    it('resets the anchor state', () => {
      wrapper.instance().handleClose();

      expect(wrapper.dive().find('WithStyles(Menu)').props().open).toBe(false);
    });
  });

  describe('handleClick', () => {
    it('sets the anchor state', () => {
      wrapper.instance().handleClick({ currentTarget: true });

      expect(wrapper.dive().find('WithStyles(Menu)').props().open).toBe(true);
    });
  });
});
