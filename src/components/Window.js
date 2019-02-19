import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ns from '../config/css-ns';
import WindowTopBar from '../containers/WindowTopBar';
import WindowMiddleContent from '../containers/WindowMiddleContent';
import ThumbnailNavigation from '../containers/ThumbnailNavigation';

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
    if (!window) return <></>;

    return (
      <div id={window.id} className={ns('window')}>
        <WindowTopBar
          windowId={window.id}
          manifest={manifest}
        />
        <WindowMiddleContent
          window={window}
          manifest={manifest}
          sideBarOpen={window.sideBarOpen}
        />
        <div className={ns('companion-bottom')}>
          <ThumbnailNavigation
            window={window}
            manifest={manifest}
          />
        </div>
      </div>
    );
  }
}

Window.propTypes = {
  window: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Window.defaultProps = {
  window: null,
  manifest: null,
};

export default Window;
