import React from 'react';
import { shallow } from 'enzyme';
import WorkspaceFullScreenButton from '../../../src/components/WorkspaceFullScreenButton';

describe('WorkspaceFullScreenButton', () => {
  let wrapper;
  let fullscreenWorkspace;
  beforeEach(() => {
    fullscreenWorkspace = jest.fn();
    wrapper = shallow(
      <WorkspaceFullScreenButton classes={{}} fullscreenWorkspace={fullscreenWorkspace} />,
    ).dive();
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(IconButton)').length).toBe(1);
  });
  it('when clicked, sets the fullscreen state', () => {
    wrapper.find('WithStyles(IconButton)').simulate('click');
    expect(fullscreenWorkspace).toHaveBeenCalledWith(true);
  });
});
