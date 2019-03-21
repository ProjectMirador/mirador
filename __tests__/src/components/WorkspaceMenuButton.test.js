import React from 'react';
import { shallow } from 'enzyme';
import MiradorMenuButton from '../../../src/containers/MiradorMenuButton';
import { WorkspaceMenuButton } from '../../../src/components/WorkspaceMenuButton';

describe('WorkspaceMenuButton', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <WorkspaceMenuButton classes={{ ctrlBtnSelected: 'ctrlBtnSelected' }} />,
    );
  });

  it('renders without an error', () => {
    expect(wrapper.find(MiradorMenuButton).length).toBe(1);
  });

  it('the button has a class indicating that it is "selected" once it is clicked', () => {
    const menuButton = wrapper.find(MiradorMenuButton).first();

    expect(wrapper.find(MiradorMenuButton).first().props().className).toEqual('');
    menuButton.props().onClick({ currentTarget: 'anElement' });
    expect(wrapper.find(MiradorMenuButton).first().props().className).toEqual('ctrlBtnSelected');
    menuButton.props().onClick({});
    expect(wrapper.find(MiradorMenuButton).first().props().className).toEqual('');
  });
});
