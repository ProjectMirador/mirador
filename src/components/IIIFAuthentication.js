import { Component } from 'react';
import PropTypes from 'prop-types';
import { AccessTokenSender } from './AccessTokenSender';
import { NewWindow } from './NewWindow';
import WindowAuthenticationBar from '../containers/WindowAuthenticationBar';

/**
 * Opens a new window for click
 */
export class IIIFAuthentication extends Component {
  /** */
  constructor(props) {
    super(props);

    this.performLogout = this.performLogout.bind(this);
    this.onReceiveAccessTokenMessage = this.onReceiveAccessTokenMessage.bind(this);
  }

  /** */
  onReceiveAccessTokenMessage(payload) {
    const {
      authServiceId, accessTokenServiceId, resolveAccessTokenRequest,
    } = this.props;

    resolveAccessTokenRequest(authServiceId, accessTokenServiceId, payload);
  }

  /** */
  defaultAuthBarProps() {
    const {
      authServiceId, status, logoutServiceId,
    } = this.props;

    return {
      authServiceId,
      hasLogoutService: !!logoutServiceId,
      status,
    };
  }

  /** handle the IIIF logout workflow */
  performLogout() {
    const {
      accessTokenServiceId, authServiceId, features,
      logoutServiceId, resetAuthenticationState, openWindow,
    } = this.props;
    openWindow(logoutServiceId, undefined, features);

    resetAuthenticationState({ authServiceId, tokenServiceId: accessTokenServiceId });
  }

  /** Render the auth bar for logged in users */
  renderLoggedIn() {
    const {
      isInteractive, logoutConfirm, t,
    } = this.props;

    if (!isInteractive) return null;

    return (
      <WindowAuthenticationBar
        confirmButton={logoutConfirm || t('logout')}
        onConfirm={this.performLogout}
        {...this.defaultAuthBarProps()}
      />
    );
  }

  /** Render whatever shows up after the interactive login attempt fails */
  renderFailure() {
    const {
      handleAuthInteraction, failureHeader: header, failureDescription: description, t,
      authServiceId, windowId,
    } = this.props;

    return (
      <WindowAuthenticationBar
        header={header}
        description={description}
        confirmButton={t('retry')}
        onConfirm={() => handleAuthInteraction(windowId, authServiceId)}
        {...this.defaultAuthBarProps()}
      />
    );
  }

  /** Render the login bar after we're logging in */
  renderLoggingInCookie() {
    const {
      accessTokenServiceId, authServiceId, resolveAuthenticationRequest, features,
    } = this.props;

    return (
      <>
        {this.renderLogin()}
        <NewWindow name="IiifLoginSender" url={`${authServiceId}?origin=${window.origin}`} features={features} onClose={() => resolveAuthenticationRequest(authServiceId, accessTokenServiceId)} />
      </>
    );
  }

  /** Render the login bar after we're logging in */
  renderLoggingInToken() {
    const {
      accessTokenServiceId,
    } = this.props;

    return (
      <>
        {this.renderLogin()}
        <AccessTokenSender
          handleAccessTokenMessage={this.onReceiveAccessTokenMessage}
          url={accessTokenServiceId}
        />
      </>
    );
  }

  /** Render a login bar */
  renderLogin() {
    const {
      confirm, description, handleAuthInteraction, header, isInteractive, label,
      authServiceId, windowId,
    } = this.props;
    if (!isInteractive) return null;

    return (
      <WindowAuthenticationBar
        header={header}
        description={description}
        label={label}
        confirmButton={confirm}
        onConfirm={() => handleAuthInteraction(windowId, authServiceId)}
        {...this.defaultAuthBarProps()}
      />
    );
  }

  /** */
  render() {
    const { authServiceId, status } = this.props;

    if (!authServiceId) return null;

    if (status === null) return this.renderLogin();
    if (status === 'cookie') return this.renderLoggingInCookie();
    if (status === 'token') return this.renderLoggingInToken();
    if (status === 'failed') return this.renderFailure();
    if (status === 'ok') return this.renderLoggedIn();

    return null;
  }
}

IIIFAuthentication.propTypes = {
  accessTokenServiceId: PropTypes.string.isRequired,
  authServiceId: PropTypes.string.isRequired,
  confirm: PropTypes.string,
  description: PropTypes.string,
  failureDescription: PropTypes.string,
  failureHeader: PropTypes.string,
  features: PropTypes.string,
  handleAuthInteraction: PropTypes.func.isRequired,
  header: PropTypes.string,
  isInteractive: PropTypes.bool,
  label: PropTypes.string,
  logoutConfirm: PropTypes.string,
  logoutServiceId: PropTypes.string,
  openWindow: PropTypes.func,
  resetAuthenticationState: PropTypes.func.isRequired,
  resolveAccessTokenRequest: PropTypes.func.isRequired,
  resolveAuthenticationRequest: PropTypes.func.isRequired,
  status: PropTypes.oneOf(['logout', 'ok', 'token', 'cookie', 'failed', null]),
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

IIIFAuthentication.defaultProps = {
  confirm: undefined,
  description: undefined,
  failureDescription: undefined,
  failureHeader: undefined,
  features: 'centerscreen',
  header: undefined,
  isInteractive: true,
  label: undefined,
  logoutConfirm: undefined,
  logoutServiceId: undefined,
  openWindow: window.open,
  status: null,
  t: k => k,
};
