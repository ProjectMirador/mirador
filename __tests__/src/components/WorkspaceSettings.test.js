import React from 'react';
import { shallow } from 'enzyme';
import WorkspaceSettings from '../../../src/components/WorkspaceSettings';
import settings from '../../../src/config/settings';

describe('WorkspaceSettings', () => {
  let wrapper;
  let handleClose;
  let updateConfig;

  beforeEach(() => {
    handleClose = jest.fn();
    updateConfig = jest.fn();

    wrapper = shallow(
      <WorkspaceSettings
        open
        handleClose={handleClose}
        updateConfig={updateConfig}
        theme={settings.theme}
      />,
    );
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(Dialog)').length).toBe(1);
    expect(wrapper.find('WithStyles(FormControl)').length).toBe(1);
  });
  it('calls updateConfig when selected', () => {
    wrapper.instance().handleThemeChange({ target: { value: 'foo' } });
    expect(updateConfig).toHaveBeenCalled();
  });
});
