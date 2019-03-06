import React from 'react';
import { shallow } from 'enzyme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Fullscreen from 'react-full-screen';
import WorkspaceControlPanel from '../../../src/containers/WorkspaceControlPanel';
import Workspace from '../../../src/containers/Workspace';
import WorkspaceAdd from '../../../src/containers/WorkspaceAdd';
import { App } from '../../../src/components/App';
import settings from '../../../src/config/settings';
import i18n from '../../../src/i18n';

jest.unmock('react-i18next');

/** */
function createWrapper(props) {
  return shallow(
    <App
      language="en"
      isFullscreenEnabled={false}
      isWorkspaceControlPanelVisible
      setWorkspaceFullscreen={() => {}}
      theme={settings.theme}
      translations={{}}
      classes={{}}
      t={k => k}
      {...props}
    />,
  );
}

describe('App', () => {
  it('should render outer element correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('main.mirador-viewer').length).toBe(1);
  });

  it('should render all needed elements ', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(MuiThemeProvider).length).toBe(1);
    expect(wrapper.find(Fullscreen).length).toBe(1);
    expect(wrapper.find(Workspace).length).toBe(1);
    expect(wrapper.find(WorkspaceControlPanel).length).toBe(1);
  });

  it('sets up a theme based on the config passed in merged w/ MaterialUI', () => {
    const wrapper = createWrapper();
    const { theme } = wrapper.find(MuiThemeProvider).props();
    expect(theme.palette.type).toEqual('light');
    expect(theme.typography.useNextVariants).toBe(true);
    expect(Object.keys(theme).length).toBeGreaterThan(10);
  });

  it('sets up translations based on the config passed in', () => {
    createWrapper({ translations: { en: { off: 'on' } } });
    expect(i18n.t('off')).toEqual('on');
  });

  it('should pass setWorkspaceFullscreen to Fullscreen.onChange', () => {
    const mockFn = jest.fn();
    const wrapper = createWrapper({ setWorkspaceFullscreen: mockFn });
    expect(wrapper.find(Fullscreen).first().prop('onChange'))
      .toBe(mockFn);
  });

  it('should pass isFullscreenEnabled to Fullscreen.enabled', () => {
    let wrapper = createWrapper({ isFullscreenEnabled: false });
    expect(wrapper.find(Fullscreen).first().prop('enabled'))
      .toEqual(false);

    wrapper = createWrapper({ isFullscreenEnabled: true });
    expect(wrapper.find(Fullscreen).first().prop('enabled'))
      .toEqual(true);
  });

  it('should not render WorkspaceControlPanel when isWorkspaceControlPanelVisible is false', () => {
    const wrapper = createWrapper({ isWorkspaceControlPanelVisible: false });

    expect(wrapper.find(WorkspaceControlPanel).length).toBe(0);
  });

  describe('with isWorkspaceAddVisible', () => {
    const wrapper = createWrapper({ isWorkspaceAddVisible: true });

    expect(wrapper.find(Workspace).length).toBe(0);
    expect(wrapper.find(WorkspaceAdd).length).toBe(1);
  });

  describe('componentDidUpdate()', () => {
    it('changes the i18n language if the language prop has been updated', () => {
      const wrapper = createWrapper();

      expect(i18n.language).toEqual('en');
      wrapper.setProps({ language: 'de' });
      expect(i18n.language).toEqual('de');
    });
  });
});
