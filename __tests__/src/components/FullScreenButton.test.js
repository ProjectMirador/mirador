import React from 'react';
import { shallow } from 'enzyme';
import MiradorMenuButton from '../../../src/containers/MiradorMenuButton';
import { FullScreenButton } from '../../../src/components/FullScreenButton';

/** */
function createWrapper(props) {
  return shallow(
    <FullScreenButton
      classes={{}}
      className="xyz"
      setWorkspaceFullscreen={() => {}}
      isFullscreenEnabled={false}
      {...props}
    />,
  );
}

describe('FullScreenButton', () => {
  let wrapper;
  let menuButton;

  it('renders without an error', () => {
    wrapper = createWrapper();

    expect(wrapper.find(MiradorMenuButton).length).toBe(1);
    expect(wrapper.find(MiradorMenuButton).prop('className')).toBe('xyz');
  });

  describe('when not in fullscreen', () => {
    let setWorkspaceFullscreen;
    beforeAll(() => {
      setWorkspaceFullscreen = jest.fn();
      wrapper = createWrapper({ setWorkspaceFullscreen });
      menuButton = wrapper.find(MiradorMenuButton);
    });

    it('has the FullscreenIcon', () => {
      expect(menuButton.children('FullscreenSharpIcon').length).toBe(1);
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
      wrapper = createWrapper({ isFullscreenEnabled: true, setWorkspaceFullscreen });
      menuButton = wrapper.find(MiradorMenuButton);
    });

    it('has the FullscreenExitIcon', () => {
      expect(menuButton.children('FullscreenExitSharpIcon').length).toBe(1);
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
