import React from 'react';
import { shallow } from 'enzyme';
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

  it('renders without an error', () => {
    wrapper = createWrapper();

    expect(wrapper.find('WithStyles(IconButton)').length).toBe(1);
  });

  describe('when not in fullscreen', () => {
    let setWorkspaceFullscreen;
    beforeAll(() => {
      setWorkspaceFullscreen = jest.fn();
      wrapper = createWrapper({ setWorkspaceFullscreen });
    });

    it('has the FullscreenIcon', () => {
      expect(wrapper.find('pure(FullscreenSharpIcon)').length).toBe(1);
    });

    it('has the proper aria-label i18n key', () => {
      expect(wrapper.find('WithStyles(IconButton)[aria-label="workspaceFullScreen"]').length).toBe(1);
    });

    it('triggers the setWorkspaceFullscreen prop with the appropriate boolean', () => {
      wrapper.find('WithStyles(IconButton)').simulate('click');
      expect(setWorkspaceFullscreen).toHaveBeenCalledWith(true);
    });
  });

  describe('when in fullscreen', () => {
    let setWorkspaceFullscreen;
    beforeAll(() => {
      setWorkspaceFullscreen = jest.fn();
      wrapper = createWrapper({ setWorkspaceFullscreen, isFullscreenEnabled: true });
    });

    it('has the FullscreenExitIcon', () => {
      expect(wrapper.find('pure(FullscreenExitSharpIcon)').length).toBe(1);
    });

    it('has the proper aria-label', () => {
      expect(wrapper.find('WithStyles(IconButton)[aria-label="exitFullScreen"]').length).toBe(1);
    });

    it('triggers the setWorkspaceFullscreen prop with the appropriate boolean', () => {
      wrapper.find('WithStyles(IconButton)').simulate('click');
      expect(setWorkspaceFullscreen).toHaveBeenCalledWith(false);
    });
  });
});
