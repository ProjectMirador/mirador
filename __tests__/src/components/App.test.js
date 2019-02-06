import React from 'react';
import { shallow } from 'enzyme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Fullscreen from 'react-fullscreen-crossbrowser';
import WorkspaceControlPanel from '../../../src/components/WorkspaceControlPanel';
import Workspace from '../../../src/containers/Workspace';
import App from '../../../src/components/App';

/** */
function createWrapper(props) {
  return shallow(
    <App
      isFullscreenEnabled={false}
      setWorkspaceFullscreen={() => {}}
      theme="light"
      classes={{}}
      {...props}
    />,
  ).dive(); // to unwrapp HOC created by withStyle()
}

describe('App', () => {
  it('should render outer element correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('div.mirador-app').length).toBe(1);
  });

  it('should render all needed elements ', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(MuiThemeProvider).length).toBe(1);
    expect(wrapper.find(Fullscreen).length).toBe(1);
    expect(wrapper.find(Workspace).length).toBe(1);
    expect(wrapper.find(WorkspaceControlPanel).length).toBe(1);
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
});
