import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ns from '../config/css-ns';
import WindowTopBar from '../containers/WindowTopBar';
import ConnectedWindowMiddleContent from './WindowMiddleContent';
import ConnectedThumbnailNavigation from './ThumbnailNavigation';

/**
 * Represents a Window in the mirador workspace
 * @param {object} window
 */
class Window extends Component {
  /**
   * Renders things
   */
  render() {
    const { manifest, window } = this.props;
    return (
      <div className={ns('window')}>
        <WindowTopBar
          windowId={window.id}
          manifest={manifest}
        />
        <ConnectedWindowMiddleContent
          window={window}
          manifest={manifest}
        />
        <div className={ns('companion-bottom')}>
          <ConnectedThumbnailNavigation
            window={window}
            manifest={manifest}
          />
        </div>
      </div>
    );
  }
}

Window.propTypes = {
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Window.defaultProps = {
  manifest: null,
};

export default Window;
