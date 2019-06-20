import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Paper from '@material-ui/core/Paper';
import { MosaicWindowContext } from 'react-mosaic-component/lib/contextTypes';
import ns from '../config/css-ns';
import WindowTopBar from '../containers/WindowTopBar';
import PrimaryWindow from '../containers/PrimaryWindow';
import CompanionArea from '../containers/CompanionArea';
import WindowAuthenticationControl from '../containers/WindowAuthenticationControl';
import { PluginHook } from './PluginHook';


/**
 * Represents a Window in the mirador workspace
 * @param {object} window
 */
export class Window extends Component {
  /** */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /** */
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

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

    const topBar = (
      <div>
        <WindowTopBar
          windowId={windowId}
          manifest={manifest}
          windowDraggable={windowDraggable}
        />
        <WindowAuthenticationControl key="auth" windowId={windowId} />
      </div>
    );
    if (workspaceType === 'mosaic' && windowDraggable) {
      const { mosaicWindowActions } = this.context;
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

    const { hasError } = this.state;

    if (hasError) {
      return <></>;
    }

    return (
      <Paper
        onFocus={focusWindow}
        component="section"
        elevation={1}
        id={windowId}
        className={
          cn(classes.window, ns('window'),
            maximized ? classes.maximized : null)}
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
        <PluginHook {...this.props} />
      </Paper>
    );
  }
}

Window.contextType = MosaicWindowContext;

Window.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
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
