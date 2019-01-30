import React from 'react';
import { shallow } from 'enzyme';
import createStore from '../../../src/state/createStore';
import { WorkspaceControlPanelButtons } from '../../../src/components/WorkspaceControlPanelButtons';

describe('WorkspaceControlPanelButtons', () => {
  let wrapper;
  const store = createStore();
  beforeEach(() => {
    wrapper = shallow(<WorkspaceControlPanelButtons store={store} />);
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(List)').length).toBe(1);
    expect(wrapper.find('Connect(WithStyles(WorkspaceFullScreenButton))').length).toBe(1);
  });
});
