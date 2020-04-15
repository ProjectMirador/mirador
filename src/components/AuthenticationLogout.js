import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';

/**
 *
 */
export class AuthenticationLogout extends Component {
  /** */
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  /** */
  handleLogout() {
    const {
      authServiceId, depWindow, logoutServiceId, resetAuthenticationState,
    } = this.props;
    (depWindow || window).open(logoutServiceId);

    resetAuthenticationState({ authServiceId });
  }

  /** */
  render() {
    const {
      label, status, t,
    } = this.props;
    if (status !== 'ok') return <></>;
    return (
      <Fab color="primary" variant="extended" onClick={this.handleLogout}>
        {label || t('logout')}
      </Fab>
    );
  }
}

AuthenticationLogout.propTypes = {
  authServiceId: PropTypes.string,
  depWindow: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  label: PropTypes.string,
  logoutServiceId: PropTypes.string,
  resetAuthenticationState: PropTypes.func.isRequired,
  status: PropTypes.string,
  t: PropTypes.func,
};

AuthenticationLogout.defaultProps = {
  authServiceId: undefined,
  depWindow: undefined,
  label: undefined,
  logoutServiceId: undefined,
  status: undefined,
  t: () => {},
};
