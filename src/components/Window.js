import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as shapes from '../shapes';
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
    return (
      <div className={ns('window')}>
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
  window: PropTypes.shape(shapes.windowShape).isRequired,
  manifest: PropTypes.shape(shapes.manifestShape),
};

Window.defaultProps = {
  manifest: null,
};

export default Window;
