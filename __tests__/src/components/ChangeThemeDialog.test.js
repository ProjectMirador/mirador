import React from 'react';
import { shallow } from 'enzyme';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
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
      selectedTheme="light"
      themeIds={['light', 'dark']}
      {...props}
    />,
  );
}

describe('ChangeThemeDialog', () => {
  let wrapper;

  it('renders propertly', () => {
    wrapper = createWrapper();

    expect(wrapper.find(Dialog).length).toBe(1);
  });

  it('shows up theme selection properly', () => {
    wrapper = createWrapper();

    expect(wrapper.find(ListItemText).length).toBe(2);
    expect(wrapper.find(ListItemText).first().render().text()).toBe('light');
    expect(wrapper.find(ListItemText).last().render().text()).toBe('dark');
  });

  it('shows up theme selection properly', () => {
    const setSelectedTheme = jest.fn();

    wrapper = createWrapper({ setSelectedTheme });
    wrapper.find(MenuItem).first().simulate('click');

    expect(setSelectedTheme).toHaveBeenCalledWith('light');
  });

  describe('inital focus', () => {
    const mockMenuItemFocus = jest.fn();
    const mockMenu = {
      querySelectorAll: (selector) => {
        expect(selector).toEqual('li[value="light"]');
        return [{ focus: mockMenuItemFocus }];
      },
    };

    it('sets an onEntered prop on the Dialog that focuses the selected item', () => {
      wrapper = createWrapper();

      wrapper.find(Dialog).props().onEntered(mockMenu);
      expect(mockMenuItemFocus).toHaveBeenCalled();
    });
  });
});
