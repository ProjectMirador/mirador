import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IComCom from 'icomcom-react';

/**
 * Opens a new window for click
 */
export class AccessTokenSender extends Component {
  /** */
  constructor(props) {
    super(props);

    this.onReceiveAccessTokenMessage = this.onReceiveAccessTokenMessage.bind(this);
  }

  /** @private */
  onReceiveAccessTokenMessage(e) {
    const { handleAccessTokenMessage, url } = this.props;
    if (e.data && e.data.messageId && e.data.messageId === url) handleAccessTokenMessage(e.data);
  }

  /** */
  render() {
    const { url } = this.props;
    if (!url) return <></>;

    let tokenUrl = new URL(url);
    let params = new URLSearchParams(tokenUrl.search);
    params.append('origin', window.origin);
    params.append('messageId', tokenUrl.origin + tokenUrl.pathname);
    let tokenUrlString = tokenUrl.origin + tokenUrl.pathname + '?' + params.toString();
    /**
    login, clickthrough/kiosk open @id, wait for close
    external, no-op
    */
    return (
      <IComCom
        attributes={{
          'aria-hidden': true,
          height: 1,
          src: `${tokenUrlString}`,
          style: { visibility: 'hidden' },
          width: 1,
        }}
        handleReceiveMessage={this.onReceiveAccessTokenMessage}
      />
    );
  }
}

AccessTokenSender.propTypes = {
  handleAccessTokenMessage: PropTypes.func.isRequired,
  url: PropTypes.string,
};

AccessTokenSender.defaultProps = {
  url: undefined,
};
