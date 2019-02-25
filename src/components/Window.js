import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ns from '../config/css-ns';
import WindowTopBar from '../containers/WindowTopBar';
import PrimaryWindow from '../containers/PrimaryWindow';
import ThumbnailNavigation from '../containers/ThumbnailNavigation';
import CompanionArea from '../containers/CompanionArea';
/**
 * Represents a Window in the mirador workspace
 * @param {object} window
 */
export class Window extends Component {
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
        <WindowTopBar
          windowId={window.id}
          manifest={manifest}
        />
        <div className={classes.middle}>
          <div className={classes.middleLeft}>
            <PrimaryWindow
              window={window}
              manifest={manifest}
            />
            <div className={classes.companionAreaBottom}>
              <CompanionArea position="bottom" windowId={window.id} />
            </div>
          </div>
          <div className={classes.companionAreaRight}>
            <CompanionArea position="right" windowId={window.id} />
          </div>
        </div>
        <div className={classes.thumbnailArea}>
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
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
Window.defaultProps = {
  window: null,
  manifest: null,
};
