import React from 'react';
import { shallow } from 'enzyme';
import WorkspaceFullScreenButton from '../../../src/components/WorkspaceFullScreenButton';

describe('WorkspaceFullScreenButton', () => {
  let wrapper;
  let setWorkspaceFullscreen;
  beforeEach(() => {
    setWorkspaceFullscreen = jest.fn();
    wrapper = shallow(
      <WorkspaceFullScreenButton
        classes={{}}
        setWorkspaceFullscreen={setWorkspaceFullscreen}
      />,
    );
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(IconButton)').length).toBe(1);
  });
  it('when clicked, sets the fullscreen state', () => {
    wrapper.find('WithStyles(IconButton)').simulate('click');
    expect(setWorkspaceFullscreen).toHaveBeenCalledWith(true);
  });
});
