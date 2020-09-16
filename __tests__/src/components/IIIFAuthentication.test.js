import React from 'react';
import { shallow } from 'enzyme';
import WindowAuthenticationBar from '../../../src/containers/WindowAuthenticationBar';
import { NewWindow } from '../../../src/components/NewWindow';
import { AccessTokenSender } from '../../../src/components/AccessTokenSender';
import { IIIFAuthentication } from '../../../src/components/IIIFAuthentication';

/**
 * Helper function to create a shallow wrapper around IIIFAuthentication
 */
function createWrapper(props) {
  return shallow(
    <IIIFAuthentication
      accessTokenServiceId="http://example.com/token"
      authServiceId="http://example.com/auth"
      failureDescription="... and this is why."
      failureHeader="Login failed"
      handleAuthInteraction={() => {}}
      isInteractive
      logoutServiceId="http://example.com/logout"
      resetAuthenticationState={() => {}}
      resolveAccessTokenRequest={() => {}}
      resolveAuthenticationRequest={() => {}}
      t={key => key}
      windowId="w"
      {...props}
    />,
  );
}

describe('IIIFAuthentication', () => {
  describe('without an auth service', () => {
    it('renders nothing', () => {
      const wrapper = createWrapper({ authServiceId: null });
      expect(wrapper.isEmptyRender()).toBe(true);
    });
  });
  describe('with an available auth service', () => {
    it('renders a login bar', () => {
      const handleAuthInteraction = jest.fn();
      const wrapper = createWrapper({ handleAuthInteraction });
      expect(wrapper.find(WindowAuthenticationBar).length).toBe(1);
      expect(wrapper.find(WindowAuthenticationBar).simulate('confirm'));
      expect(handleAuthInteraction).toHaveBeenCalledWith('w', 'http://example.com/auth');
    });
    it('renders nothing for a non-interactive login', () => {
      const wrapper = createWrapper({ isInteractive: false });
      expect(wrapper.isEmptyRender()).toBe(true);
    });
  });
  describe('with a failed authentication', () => {
    it('renders with an error message', () => {
      const handleAuthInteraction = jest.fn();
      const wrapper = createWrapper({ handleAuthInteraction, status: 'failed' });
      expect(wrapper.find(WindowAuthenticationBar).length).toBe(1);
      expect(wrapper.find(WindowAuthenticationBar).prop('confirmButton')).toEqual('retry');
      expect(wrapper.find(WindowAuthenticationBar).prop('status')).toEqual('failed');
      expect(wrapper.find(WindowAuthenticationBar).prop('header')).toEqual('Login failed');
      expect(wrapper.find(WindowAuthenticationBar).prop('description')).toEqual('... and this is why.');
      expect(wrapper.find(WindowAuthenticationBar).simulate('confirm'));
      expect(handleAuthInteraction).toHaveBeenCalledWith('w', 'http://example.com/auth');
    });
  });
  describe('in the middle of authenicating', () => {
    it('does the IIIF access cookie behavior', () => {
      const wrapper = createWrapper({ status: 'cookie' });
      expect(wrapper.find(WindowAuthenticationBar).length).toBe(1);
      expect(wrapper.find(NewWindow).length).toBe(1);
      expect(wrapper.find(NewWindow).prop('url')).toContain('http://example.com/auth?origin=');
    });
    it('does the IIIF access token behavior', () => {
      const wrapper = createWrapper({ status: 'token' });
      expect(wrapper.find(WindowAuthenticationBar).length).toBe(1);
      expect(wrapper.find(AccessTokenSender).length).toBe(1);
      expect(wrapper.find(AccessTokenSender).prop('url')).toEqual('http://example.com/token');
    });
  });
  describe('when logged in', () => {
    it('renders a logout button', () => {
      const openWindow = jest.fn();
      const resetAuthenticationState = jest.fn();
      const wrapper = createWrapper({ openWindow, resetAuthenticationState, status: 'ok' });
      expect(wrapper.find(WindowAuthenticationBar).length).toBe(1);
      expect(wrapper.find(WindowAuthenticationBar).prop('confirmButton')).toEqual('logout');
      expect(wrapper.find(WindowAuthenticationBar).prop('hasLogoutService')).toEqual(true);

      wrapper.find(WindowAuthenticationBar).simulate('confirm');

      expect(openWindow).toHaveBeenCalledWith('http://example.com/logout', 'centerscreen');
      expect(resetAuthenticationState).toHaveBeenCalledWith({
        authServiceId: 'http://example.com/auth', tokenServiceId: 'http://example.com/token',
      });
    });
  });
});
