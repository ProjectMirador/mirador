import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ns from '../config/css-ns';
import WindowTopBar from '../containers/WindowTopBar';
import PrimaryWindow from '../containers/PrimaryWindow';
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
    const { manifest, window, classes } = this.props;

    if (!window) {
      return <></>;
    }

    return (
      <div id={window.id} className={cn(classes.window, ns('window'))}>
        {this.wrappedTopBar()}
        <div className={classes.middle}>
          <div className={classes.middleLeft}>
            <div className={classes.primaryWindow}>
              <PrimaryWindow
                window={window}
                manifest={manifest}
                sideBarOpen={window.sideBarOpen}
              />
            </div>
            <div className={classes.companionAreaBottom}>
              <CompanionArea windowId={window.id} position="bottom" />
            </div>
          </div>
          <div className={classes.companionAreaRight}>
            <CompanionArea windowId={window.id} position="right" />
          </div>
        </div>
        <div className={cn(classes.thumbnailArea, ns('companion-bottom'))}>
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
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  window: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  workspaceType: PropTypes.string,
};

Window.defaultProps = {
  window: null,
  manifest: null,
  workspaceType: null,
  classes: {},
};
