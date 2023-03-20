import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IIIFAuthentication } from '../../../src/components/IIIFAuthentication';

/**
 * Helper function to create IIIFAuthentication
 */
function createWrapper(props) {
  return render(
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
  let user;
  beforeEach(() => {
    user = userEvent.setup();
  });
  describe('without an auth service', () => {
    it('renders nothing', () => {
      createWrapper({ authServiceId: null });
      expect(screen.queryByText('login', { selector: 'span' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });
  describe('with an available auth service', () => {
    it('renders a login bar', async () => {
      const handleAuthInteraction = jest.fn();
      createWrapper({ handleAuthInteraction });
      const confirmBtn = screen.getByText('login', { selector: 'span' });
      expect(confirmBtn).toBeInTheDocument();
      await user.click(confirmBtn);
      expect(handleAuthInteraction).toHaveBeenCalledWith('w', 'http://example.com/auth');
    });
    it('renders nothing for a non-interactive login', () => {
      createWrapper({ isInteractive: false });
      expect(screen.queryByText('login')).not.toBeInTheDocument();
    });
  });
  describe('with a failed authentication', () => {
    it('renders with an error message', async () => {
      const handleAuthInteraction = jest.fn();
      createWrapper({ handleAuthInteraction, status: 'failed' });
      const confirmBtn = await screen.findByText('retry', { selector: 'span' });
      expect(screen.getByText('Login failed')).toBeInTheDocument();
      expect(screen.getByText('cancel')).toBeInTheDocument();
      expect(screen.getByText('... and this is why.')).toBeInTheDocument();
      await user.click(confirmBtn);
      expect(handleAuthInteraction).toHaveBeenCalledWith('w', 'http://example.com/auth');
    });
  });
  describe('in the middle of authenticating', () => {
    it('does the IIIF access cookie behavior', async () => {
      jest.useFakeTimers();
      const mockWindow = { close: jest.fn(), closed: false };
      const mockWindowOpen = jest.fn(() => (mockWindow));
      window.open = mockWindowOpen;
      const resolveCookieMock = jest.fn();
      createWrapper({ resolveAuthenticationRequest: resolveCookieMock, status: 'cookie' });
      expect(screen.getByText('login', { selector: 'span' })).toBeInTheDocument();
      expect(mockWindowOpen).toHaveBeenCalledWith(`http://example.com/auth?origin=${window.origin}`, 'IiifLoginSender', 'centerscreen');
      mockWindow.closed = true;
      jest.runOnlyPendingTimers();
      await waitFor(() => expect(resolveCookieMock).toHaveBeenCalledTimes(1));
      jest.useRealTimers();
    });
    it('does the IIIF access token behavior', async () => {
      const resolveTokenMock = jest.fn();
      createWrapper({ resolveAccessTokenRequest: resolveTokenMock, status: 'token' });
      expect(screen.getByText('login', { selector: 'span' })).toBeInTheDocument();
      window.dispatchEvent(new MessageEvent('message', {
        data: { messageId: 'http://example.com/token' },
      }));
      await waitFor(() => expect(resolveTokenMock).toHaveBeenCalledWith('http://example.com/auth', 'http://example.com/token', { messageId: 'http://example.com/token' }));
    });
  });
  describe('when logged in', () => {
    it('renders a logout button', async () => {
      const mockWindow = { open: jest.fn() };
      const mockWindowOpen = jest.fn(() => (mockWindow));
      window.open = mockWindowOpen;
      const resetAuthenticationState = jest.fn();
      createWrapper({
        logoutConfirm: 'exit',
        openWindow: mockWindowOpen,
        resetAuthenticationState,
        status: 'ok',
      });
      const confirmBtn = await screen.findByText('exit', { selector: 'span' });
      await user.click(confirmBtn);
      await waitFor(() => expect(resetAuthenticationState).toHaveBeenCalledWith({
        authServiceId: 'http://example.com/auth', tokenServiceId: 'http://example.com/token',
      }));
    });
  });
});
