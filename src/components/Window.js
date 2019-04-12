import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Paper from '@material-ui/core/Paper';
import ns from '../config/css-ns';
import WindowTopBar from '../containers/WindowTopBar';
import PrimaryWindow from '../containers/PrimaryWindow';
import CompanionArea from '../containers/CompanionArea';


/**
 * Represents a Window in the mirador workspace
 * @param {object} window
 */
export class Window extends Component {
  /** */
  componentDidMount(prevProps) {
    const { fetchManifest, manifest, window } = this.props;
    if (window && window.manifestId && (!manifest || !manifest.isFetching)) {
      fetchManifest(window.manifestId);
    }
  }

  /**
   * wrappedTopBar - will conditionally wrap a WindowTopBar for needed
   * additional functionality based on workspace type
   */
  wrappedTopBar() {
    const {
      manifest, window, workspaceType, windowDraggable,
    } = this.props;
    const { mosaicWindowActions } = this.context;
    const topBar = (
      <div>
        <WindowTopBar
          windowId={window.id}
          manifest={manifest}
          windowDraggable={windowDraggable}
        />
      </div>
    );
    if (workspaceType === 'mosaic' && windowDraggable) {
      return mosaicWindowActions.connectDragSource(
        topBar,
      );
    }
    return topBar;
  }

  /**
   * Renders things
   */
  render() {
    const {
      focusWindow, label, manifest, window, classes, t,
    } = this.props;

    if (!window) {
      return <></>;
    }

    return (
      <Paper
        onFocus={focusWindow}
        component="section"
        elevation={1}
        id={window.id}
        className={
          cn(classes.window, ns('window'),
            window.maximized ? ns('workspace-maximized-window') : null)}
        aria-label={t('window', { label })}
      >
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
            <CompanionArea windowId={window.id} position="far-right" />
          </div>
        </div>
        <CompanionArea windowId={window.id} position="far-bottom" />
      </Paper>
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
  classes: PropTypes.objectOf(PropTypes.string),
  fetchManifest: PropTypes.func.isRequired,
  focusWindow: PropTypes.func,
  label: PropTypes.string,
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func.isRequired,
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  windowDraggable: PropTypes.bool,
  workspaceType: PropTypes.string,
};

Window.defaultProps = {
  classes: {},
  focusWindow: () => {},
  label: null,
  manifest: null,
  windowDraggable: null,
  workspaceType: null,
};
