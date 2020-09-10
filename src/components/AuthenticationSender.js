import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NewWindow } from './NewWindow';

/**
 * Opens a new window for click
 */
export class AuthenticationSender extends Component {
  /** */
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
  }

  /** @private */
  onClose() {
    const { handleInteraction, url } = this.props;

    handleInteraction(url);
  }

  /** */
  render() {
    const { features, url } = this.props;

    if (!url) return <></>;

    return <NewWindow name="IiifAuthenticationSender" url={`${url}?origin=${window.origin}`} features={features} onClose={this.onClose} />;
  }
}

AuthenticationSender.propTypes = {
  features: PropTypes.string,
  handleInteraction: PropTypes.func.isRequired,
  url: PropTypes.string,
};

AuthenticationSender.defaultProps = {
  features: 'centerscreen',
  url: undefined,
};
