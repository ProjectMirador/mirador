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

    /**
    login, clickthrough/kiosk open @id, wait for close
    external, no-op
    */
    return (
      <IComCom
        attributes={{
          ariaHidden: true,
          height: 1,
          src: `${url}?origin=${window.origin}&messageId=${url}`,
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
