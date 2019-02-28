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
export class Window extends Component {
  /**
   * wrappedTopBar - will conditionally wrap a WindowTopBar for needed
   * additional functionality based on workspace type
   */
  wrappedTopBar() {
    const { manifest, window, workspaceType } = this.props;
    const { mosaicWindowActions } = this.context;
    const topBar = (
      <div>
        <WindowTopBar
          windowId={window.id}
          manifest={manifest}
        />
      </div>
    );
    if (workspaceType !== 'mosaic') return topBar;
    return mosaicWindowActions.connectDragSource(
      topBar,
    );
  }

  /**
   * Renders things
   */
  render() {
    const { manifest, window } = this.props;
    if (!window) return <></>;
    return (
      <div id={window.id} className={ns('window')}>
        {this.wrappedTopBar()}
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

Window.contextTypes = {
  mosaicWindowActions: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
};

Window.propTypes = {
  window: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  workspaceType: PropTypes.string,
};

Window.defaultProps = {
  window: null,
  manifest: null,
  workspaceType: null,
};
