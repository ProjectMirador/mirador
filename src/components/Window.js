import { Component, useContext } from 'react';
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

const rowMixin = {
  display: 'flex',
  flex: '1',
  flexDirection: 'row',
  minHeight: 0,
};

const columnMixin = {
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  minHeight: 0,
};

const Root = styled(Paper)(({ ownerState, theme }) => ({
  ...columnMixin,
  backgroundColor: theme.palette.shades?.dark,
  borderRadius: 0,
  height: '100%',
  overflow: 'hidden',
  width: '100%',
  ...(ownerState?.maximized && {
    left: 0,
    position: 'absolute',
    top: 0,
    zIndex: theme.zIndex.modal - 1,
  }),
}));

const ContentRow = styled('div')(() => ({
  ...rowMixin,
}));

const ContentColumn = styled('div')(() => ({
  ...columnMixin,
}));

const StyledPrimaryWindow = styled(PrimaryWindow)(() => ({
  ...rowMixin,
  height: '300px',
  position: 'relative',
}));

const StyledCompanionAreaBottom = styled(CompanionArea)(() => ({
  ...rowMixin,
  flex: '0',
  flexBasis: 'auto',
}));

const StyledCompanionAreaRight = styled('div')(() => ({
  ...rowMixin,
  flex: '0 1 auto',
}));

/** Window title bar wrapper for drag controls in the mosaic view */
const DraggableNavBar = ({ children, ...props }) => {
  const { mosaicWindowActions } = useContext(MosaicWindowContext);
  return mosaicWindowActions.connectDragSource(
    <nav {...props}>{children}</nav>,
  );
};

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
   * Renders things
   */
  render() {
    const {
      focusWindow, label, isFetching, sideBarOpen,
      view, windowDraggable, windowId, workspaceType, t,
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
        <WindowTopBar
          component={workspaceType === 'mosaic' && windowDraggable ? DraggableNavBar : undefined}
          windowId={windowId}
          windowDraggable={windowDraggable}
        />
        <IIIFAuthentication windowId={windowId} />
        { manifestError && <ErrorContent error={{ stack: manifestError }} windowId={windowId} /> }
        <ContentRow>
          <ContentColumn>
            <StyledPrimaryWindow
              view={view}
              windowId={windowId}
              isFetching={isFetching}
              sideBarOpen={sideBarOpen}
            />
            <StyledCompanionAreaBottom windowId={windowId} position="bottom" />
          </ContentColumn>
          <StyledCompanionAreaRight>
            <CompanionArea windowId={windowId} position="right" />
            <CompanionArea windowId={windowId} position="far-right" />
          </StyledCompanionAreaRight>
        </ContentRow>
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
