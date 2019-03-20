import React from 'react';
import { shallow } from 'enzyme';
import MiradorMenuButton from '../../../src/containers/MiradorMenuButton';
import { WorkspaceFullScreenButton } from '../../../src/components/WorkspaceFullScreenButton';

/** */
function createWrapper(props) {
  return shallow(
    <WorkspaceFullScreenButton
      classes={{}}
      setWorkspaceFullscreen={() => {}}
      isFullscreenEnabled={false}
      {...props}
    />,
  );
}

describe('WorkspaceFullScreenButton', () => {
  let wrapper;
  let menuButton;

  it('renders without an error', () => {
    wrapper = createWrapper();

    expect(wrapper.find(MiradorMenuButton).length).toBe(1);
  });

  describe('when not in fullscreen', () => {
    let setWorkspaceFullscreen;
    beforeAll(() => {
      setWorkspaceFullscreen = jest.fn();
      wrapper = createWrapper({ setWorkspaceFullscreen });
      menuButton = wrapper.find(MiradorMenuButton);
    });

    it('has the FullscreenIcon', () => {
      expect(menuButton.children('pure(FullscreenSharpIcon)').length).toBe(1);
    });

    it('has the proper aria-label i18n key', () => {
      expect(menuButton.props()['aria-label']).toEqual('workspaceFullScreen');
    });

    it('triggers the setWorkspaceFullscreen prop with the appropriate boolean', () => {
      menuButton.props().onClick(); // Trigger the onClick prop
      expect(setWorkspaceFullscreen).toHaveBeenCalledWith(true);
    });
  });

  describe('when in fullscreen', () => {
    let setWorkspaceFullscreen;
    beforeAll(() => {
      setWorkspaceFullscreen = jest.fn();
      wrapper = createWrapper({ setWorkspaceFullscreen, isFullscreenEnabled: true });
      menuButton = wrapper.find(MiradorMenuButton);
    });

    it('has the FullscreenExitIcon', () => {
      expect(menuButton.children('pure(FullscreenExitSharpIcon)').length).toBe(1);
    });

    it('has the proper aria-label', () => {
      expect(menuButton.props()['aria-label']).toEqual('exitFullScreen');
    });

    it('triggers the setWorkspaceFullscreen prop with the appropriate boolean', () => {
      menuButton.props().onClick(); // Trigger the onClick prop
      expect(setWorkspaceFullscreen).toHaveBeenCalledWith(false);
    });
  });
});
