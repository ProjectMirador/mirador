import React from 'react';
import { shallow } from 'enzyme';
import { WorkspaceMenuButton } from '../../../src/components/WorkspaceMenuButton';

describe('WorkspaceMenuButton', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <WorkspaceMenuButton classes={{ ctrlBtnSelected: 'ctrlBtnSelected' }} />,
    );
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(IconButton)').length).toBe(1);
  });
  it('when clicked, updates the state', () => {
    wrapper.find('WithStyles(IconButton)').simulate('click', {});
    // TODO: this is currently a no-op
  });

  it('the button has a class indicating that it is "selected" once it is clicked', () => {
    expect(wrapper.find('.ctrlBtnSelected').length).toBe(0);
    wrapper.find('WithStyles(IconButton)').simulate('click', { currentTarget: 'anElement' });
    expect(wrapper.find('.ctrlBtnSelected').length).toBe(1);
    wrapper.find('WithStyles(IconButton)').simulate('click', {});
    expect(wrapper.find('.ctrlBtnSelected').length).toBe(0);
  });
});
