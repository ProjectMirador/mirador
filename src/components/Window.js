import { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Paper from '@material-ui/core/Paper';
import { MosaicWindowContext } from 'react-mosaic-component/lib/contextTypes';
import ns from '../config/css-ns';
import WindowContext from '../contexts/WindowContext';
import WindowTopBar from '../containers/WindowTopBar';
import PrimaryWindow from '../containers/PrimaryWindow';
import CompanionArea from '../containers/CompanionArea';
import MinimalWindow from '../containers/MinimalWindow';
import ErrorContent from '../containers/ErrorContent';
import IIIFAuthentication from '../containers/IIIFAuthentication';
import { PluginHook } from './PluginHook';

/**
 * Represents a Window in the mirador workspace
 * @param {object} window
 */
export class Window extends Component {
  /** */
  constructor(props) {
    super(props);
    this.state = { windowContext: { id: props.windowId } };
  }

  /** Update the controlled window context state if the window changes */
  componentDidUpdate(prevProps) {
    const { windowId } = this.props;

    if (windowId !== prevProps.windowId) {
      this.setState({ windowContext: { id: windowId } });
    }
  }

  /** */
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error, hasError: true };
  }

  /**
   * wrappedTopBar - will conditionally wrap a WindowTopBar for needed
   * additional functionality based on workspace type
   */
  wrappedTopBar() {
    const {
      workspaceType, windowDraggable,
    } = this.props;

    const topBar = (
      <div>
        <WindowTopBar windowDraggable={windowDraggable} />
        <IIIFAuthentication />
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
      focusWindow, label, isFetching, maximized, sideBarOpen,
      view, windowId, classes, t,
      manifestError,
    } = this.props;

    const { error, hasError, windowContext } = this.state;

    if (hasError) {
      return (
        <WindowContext.Provider value={windowContext}>
          <MinimalWindow>
            <ErrorContent error={error} />
          </MinimalWindow>
        </WindowContext.Provider>
      );
    }

    return (
      <WindowContext.Provider value={windowContext}>
        <Paper
          onFocus={focusWindow}
          component="section"
          elevation={1}
          id={windowId}
          className={
            cn(
              classes.window,
              ns('window'),
              maximized ? classes.maximized : null,
            )
  }
          aria-label={t('window', { label })}
        >
          {this.wrappedTopBar()}
          { manifestError && <ErrorContent error={{ stack: manifestError }} /> }
          <div className={classes.middle}>
            <div className={classes.middleLeft}>
              <div className={classes.primaryWindow}>
                <PrimaryWindow
                  view={view}
                  isFetching={isFetching}
                  sideBarOpen={sideBarOpen}
                />
              </div>
              <div className={classes.companionAreaBottom}>
                <CompanionArea position="bottom" />
              </div>
            </div>
            <div className={classes.companionAreaRight}>
              <CompanionArea position="right" />
              <CompanionArea position="far-right" />
            </div>
          </div>
          <CompanionArea position="far-bottom" />
          <PluginHook {...this.props} />
        </Paper>
      </WindowContext.Provider>
    );
  }
}

Window.contextType = MosaicWindowContext;

Window.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  focusWindow: PropTypes.func,
  isFetching: PropTypes.bool,
  label: PropTypes.string,
  manifestError: PropTypes.string,
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
  isFetching: false,
  label: null,
  manifestError: null,
  maximized: false,
  sideBarOpen: false,
  view: undefined,
  windowDraggable: null,
  workspaceType: null,
};
