import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompanionWindowRegistry from '../lib/CompanionWindowRegistry';

/**
 * Render a companion window using the appropriate component for the content
 */
export class CompanionWindowFactory extends Component {
  /** */
  render() {
    const { content, windowId, id } = this.props;
    const type = CompanionWindowRegistry[content];

    if (!type) return <></>;

    return React.createElement(type, { id, windowId });
  }
}

CompanionWindowFactory.propTypes = {
  content: PropTypes.string,
  id: PropTypes.string.isRequired,
  windowId: PropTypes.string.isRequired,
};

CompanionWindowFactory.defaultProps = {
  content: null,
};
