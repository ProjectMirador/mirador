import React from 'react';
import { shallow } from 'enzyme';
import Fab from '@material-ui/core/Fab';
import { AuthenticationLogout } from '../../../src/components/AuthenticationLogout';

/**
 * Helper function to create a shallow wrapper around AuthenticationLogout
 */
function createWrapper(props) {
  return shallow(
    <AuthenticationLogout
      authServiceId="http://example.com/auth"
      label="Log out now!"
      logoutServiceId="http://example.com/logout"
      status="ok"
      t={key => key}
      windowId="w"
      {...props}
    />,
  );
}

describe('AuthenticationLogout', () => {
  it('when status is not ok, render fragment', () => {
    const wrapper = createWrapper({ status: 'fail' });
    expect(wrapper.matchesElement(<></>)).toBe(true);
  });
  it('renders Fab with logout label', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(Fab).length).toBe(1);
    expect(wrapper.find(Fab).text()).toBe('Log out now!');
  });
  it('click opens a new window to logout and resets state', () => {
    const mockWindow = {};
    const open = jest.fn(() => mockWindow);
    const reset = jest.fn(() => {});
    const wrapper = createWrapper({ depWindow: { open }, resetAuthenticationState: reset });
    expect(wrapper.find(Fab).props().onClick());
    expect(open).toHaveBeenCalledWith('http://example.com/logout');
    expect(reset).toHaveBeenCalledWith({ authServiceId: 'http://example.com/auth' });
  });
});
