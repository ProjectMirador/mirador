import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompanionWindowRegistry from '../lib/CompanionWindowRegistry';
import CompanionWindow from '../containers/CompanionWindow';
import ErrorContent from '../containers/ErrorContent';

/**
 * Render a companion window using the appropriate component for the content
 */
export class CompanionWindowFactory extends Component {
  /** */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /** */
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error, hasError: true };
  }

  /**
   * Clear the error state if the internal content changes; this is a rare
   * case, only when we reuse an existing companionWindow instance for
   * the left-anchored companion area (anti-pattern?)
   */
  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line camelcase
    const { content } = this.props;

    // Typical usage (don't forget to compare props):
    if (content !== nextProps.content) {
      this.setState({ error: null, hasError: false });
    }
  }

  /** */
  render() {
    const {
      content,
      windowId,
      id,
      t,
    } = this.props;
    const { error, hasError } = this.state;

    if (hasError) {
      return (
        <CompanionWindow
          title={t('error')}
          windowId={windowId}
          id={id}
        >
          <ErrorContent error={error} windowId={windowId} companionWindowId={id} />
        </CompanionWindow>
      );
    }

    const type = CompanionWindowRegistry[content];

    if (!type) return <></>;

    return React.createElement(type, { id, windowId });
  }
}

CompanionWindowFactory.propTypes = {
  content: PropTypes.string,
  id: PropTypes.string.isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

CompanionWindowFactory.defaultProps = {
  content: null,
  t: key => key,
};
