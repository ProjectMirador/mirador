import React from 'react';
import { shallow } from 'enzyme';
import { ChangeThemeDialog } from '../../../src/components/ChangeThemeDialog';

/**
 * Helper function to create a shallow wrapper around ErrorDialog
 */
function createWrapper(props) {
  return shallow(
    <ChangeThemeDialog
      classes={{ darkColor: '#000000', lightColor: '#ffffff' }}
      handleClose={() => {}}
      setSelectedTheme={() => {}}
      t={t => (t)}
      theme="light"
      {...props}
    />,
  );
}

describe('ChangeThemeDialog', () => {
  let wrapper;

  it('renders propertly', () => {
    wrapper = createWrapper();

    expect(wrapper.find('WithStyles(Dialog)').length).toBe(1);
  });

  it('shows up theme selection properly', () => {
    wrapper = createWrapper();

    expect(wrapper.find('WithStyles(ListItemText)').length).toBe(2);
    expect(wrapper.find('WithStyles(ListItemText)').first().render().text()).toBe('light');
    expect(wrapper.find('WithStyles(ListItemText)').last().render().text()).toBe('dark');
  });

  it('shows up theme selection properly', () => {
    const setSelectedTheme = jest.fn();

    wrapper = createWrapper({ setSelectedTheme });
    wrapper.find('ListKeyboardNavigation').first().simulate('change', 'light');

    expect(setSelectedTheme).toHaveBeenCalledWith('light');
  });
});
