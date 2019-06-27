import React from 'react';
import { shallow } from 'enzyme';
import AppBar from '@material-ui/core/AppBar';
import createStore from '../../../src/state/createStore';
import * as actions from '../../../src/state/actions';
import WorkspaceAddButton from '../../../src/containers/WorkspaceAddButton';
import WorkspaceControlPanelButtons from '../../../src/containers/WorkspaceControlPanelButtons';
import Branding from '../../../src/containers/Branding';
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
        t={k => k}
      />,
    );
  });

  it('renders without an error', () => {
    expect(wrapper.find(AppBar).length).toBe(1);
    expect(wrapper.find(WorkspaceAddButton).length).toBe(1);
    expect(wrapper.find(WorkspaceControlPanelButtons).length).toBe(1);
    expect(wrapper.find(Branding).length).toBe(1);
  });
});
