import { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { MosaicWindowContext } from 'react-mosaic-component/lib/contextTypes';
import ns from '../config/css-ns';
import WindowTopBar from '../containers/WindowTopBar';
import PrimaryWindow from '../containers/PrimaryWindow';
import CompanionArea from '../containers/CompanionArea';
import MinimalWindow from '../containers/MinimalWindow';
import ErrorContent from '../containers/ErrorContent';
import IIIFAuthentication from '../containers/IIIFAuthentication';
import { PluginHook } from './PluginHook';

const Root = styled(Paper)(({ ownerState, theme }) => ({
  backgroundColor: theme.palette.shades?.dark,
  borderRadius: 0,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  minHeight: 0,
  overflow: 'hidden',
  width: '100%',
  ...(ownerState?.maximized && {
    left: 0,
    position: 'absolute',
    top: 0,
    zIndex: theme.zIndex.modal - 1,
  }),
}));

const StyledMiddle = styled('div')(() => ({
  display: 'flex',
  flex: '1',
  flexDirection: 'row',
  minHeight: 0,
}));

const StyledMiddleLeft = styled('div')(() => ({
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  minHeight: 0,
}));

const StyledPrimaryWindow = styled('div')(() => ({
  display: 'flex',
  flex: '1',
  height: '300px',
  minHeight: 0,
  position: 'relative',
}));

const StyledCompanionAreaBottom = styled('div')(() => ({
  display: 'flex',
  flex: '0',
  flexBasis: 'auto',
  minHeight: 0,
}));

const StyledCompanionAreaRight = styled('div')(() => ({
  display: 'flex',
  flex: '0 1 auto',
  minHeight: 0,
}));

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
    return { error, hasError: true };
  }

  /**
   * wrappedTopBar - will conditionally wrap a WindowTopBar for needed
   * additional functionality based on workspace type
   */
  wrappedTopBar() {
    const {
      windowId, workspaceType, windowDraggable,
    } = this.props;

    const topBar = (
      <div>
        <WindowTopBar
          windowId={windowId}
          windowDraggable={windowDraggable}
        />
        <IIIFAuthentication windowId={windowId} />
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
      focusWindow, label, isFetching, sideBarOpen,
      view, windowId, t,
      manifestError,
    } = this.props;

    const { error, hasError } = this.state;

    if (hasError) {
      return (
        <MinimalWindow windowId={windowId}>
          <ErrorContent error={error} windowId={windowId} />
        </MinimalWindow>
      );
    }

    return (
      <Root
        onFocus={focusWindow}
        ownerState={this.props}
        component="section"
        elevation={1}
        id={windowId}
        className={ns('window')}
        aria-label={t('window', { label })}
      >
        {this.wrappedTopBar()}
        { manifestError && <ErrorContent error={{ stack: manifestError }} windowId={windowId} /> }
        <StyledMiddle>
          <StyledMiddleLeft>
            <StyledPrimaryWindow>
              <PrimaryWindow
                view={view}
                windowId={windowId}
                isFetching={isFetching}
                sideBarOpen={sideBarOpen}
              />
            </StyledPrimaryWindow>
            <StyledCompanionAreaBottom>
              <CompanionArea windowId={windowId} position="bottom" />
            </StyledCompanionAreaBottom>
          </StyledMiddleLeft>
          <StyledCompanionAreaRight>
            <CompanionArea windowId={windowId} position="right" />
            <CompanionArea windowId={windowId} position="far-right" />
          </StyledCompanionAreaRight>
        </StyledMiddle>
        <CompanionArea windowId={windowId} position="far-bottom" />
        <PluginHook {...this.props} />
      </Root>
    );
  }
}

Window.contextType = MosaicWindowContext;

Window.propTypes = {
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
