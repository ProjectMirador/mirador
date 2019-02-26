import React from 'react';
import { shallow } from 'enzyme';
import { WorkspaceMenuButton } from '../../../src/components/WorkspaceMenuButton';

describe('WorkspaceMenuButton', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <WorkspaceMenuButton classes={{}} />,
    );
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(IconButton)').length).toBe(1);
  });
  it('when clicked, updates the state', () => {
    wrapper.find('WithStyles(IconButton)').simulate('click', {});
    // TODO: this is currently a no-op
  });
});
