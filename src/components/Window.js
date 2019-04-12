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
    const { fetchManifest, manifest, manifestId } = this.props;
    if (manifestId && (!manifest || !manifest.isFetching)) {
      fetchManifest(manifestId);
    }
  }

  /**
   * wrappedTopBar - will conditionally wrap a WindowTopBar for needed
   * additional functionality based on workspace type
   */
  wrappedTopBar() {
    const {
      manifest, windowId, workspaceType, windowDraggable,
    } = this.props;
    const { mosaicWindowActions } = this.context;
    const topBar = (
      <div>
        <WindowTopBar
          windowId={windowId}
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
      focusWindow, label, manifest, maximized, sideBarOpen, view, windowId, classes, t,
    } = this.props;

    return (
      <Paper
        onFocus={focusWindow}
        component="section"
        elevation={1}
        id={windowId}
        className={
          cn(classes.window, ns('window'),
            maximized ? ns('workspace-maximized-window') : null)}
        aria-label={t('window', { label })}
      >
        {this.wrappedTopBar()}
        <div className={classes.middle}>
          <div className={classes.middleLeft}>
            <div className={classes.primaryWindow}>
              <PrimaryWindow
                view={view}
                windowId={windowId}
                manifest={manifest}
                sideBarOpen={sideBarOpen}
              />
            </div>
            <div className={classes.companionAreaBottom}>
              <CompanionArea windowId={windowId} position="bottom" />
            </div>
          </div>
          <div className={classes.companionAreaRight}>
            <CompanionArea windowId={windowId} position="right" />
            <CompanionArea windowId={windowId} position="far-right" />
          </div>
        </div>
        <CompanionArea windowId={windowId} position="far-bottom" />
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
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  fetchManifest: PropTypes.func.isRequired,
  focusWindow: PropTypes.func,
  label: PropTypes.string,
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  manifestId: PropTypes.string,
  maximized: PropTypes.bool,
  sideBarOpen: PropTypes.bool,
  t: PropTypes.func.isRequired,
  view: PropTypes.string,
  windowDraggable: PropTypes.bool,
  windowId: PropTypes.string.isRequired,
  workspaceType: PropTypes.string,
};

Window.defaultProps = {
  classes: {},
  focusWindow: () => {},
  label: null,
  manifest: null,
  manifestId: undefined,
  maximized: false,
  sideBarOpen: false,
  view: undefined,
  windowDraggable: null,
  workspaceType: null,
};
