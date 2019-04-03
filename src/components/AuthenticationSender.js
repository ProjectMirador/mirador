import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewWindow from 'react-new-window';

/**
 * Opens a new window for click
 */
export class AuthenticationSender extends Component {
  /** */
  constructor(props) {
    super(props);

    this.onUnload = this.onUnload.bind(this);
  }

  /** @private */
  onUnload() {
    const { handleInteraction, url } = this.props;

    handleInteraction(url);
  }

  /** */
  render() {
    const { url } = this.props;
    if (!url) return <></>;

    /**
    login, clickthrough/kiosk open @id, wait for close
    external, no-op
    */
    return (
      <NewWindow url={`${url}?origin=${window.origin}`} onUnload={this.onUnload} />
    );
  }
}

AuthenticationSender.propTypes = {
  handleInteraction: PropTypes.func.isRequired,
  url: PropTypes.string,
};

AuthenticationSender.defaultProps = {
  url: undefined,
};
