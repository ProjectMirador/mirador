import React from 'react';
import { shallow } from 'enzyme';
import createStore from '../../../src/state/createStore';
import * as actions from '../../../src/state/actions';
import { WorkspaceControlPanel } from '../../../src/components/WorkspaceControlPanel';
import fixture from '../../fixtures/version-2/002.json';

describe('WorkspaceControlPanel', () => {
  let wrapper;
  const store = createStore();
  beforeEach(() => {
    store.dispatch(actions.receiveManifest('foo', fixture));
    store.dispatch(actions.receiveManifest('bar', fixture));
    wrapper = shallow(
      <WorkspaceControlPanel
        classes={{}}
        store={store}
      />,
    );
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(AppBar)').length).toBe(1);
    expect(wrapper.find('Connect(miradorWithPlugins(WorkspaceControlPanelButtons))').length).toBe(1);
  });
});
