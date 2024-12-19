import { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { MosaicWindowContext } from 'react-mosaic-component2';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import ns from '../config/css-ns';
import WindowContext from '../contexts/WindowContext';
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

const Root = styled(Paper, { name: 'Window', slot: 'root' })(({ ownerState, theme }) => ({
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

const ContentRow = styled('div', { name: 'Window', slot: 'row' })(() => ({
  ...rowMixin,
}));

const ContentColumn = styled('div', { name: 'Window', slot: 'column' })(() => ({
  ...columnMixin,
}));

const StyledPrimaryWindow = styled(PrimaryWindow, { name: 'Window', slot: 'primary' })(() => ({
  ...rowMixin,
  height: '300px',
  position: 'relative',
}));

const StyledCompanionAreaBottom = styled(CompanionArea, { name: 'Window', slot: 'bottom' })(() => ({
  ...rowMixin,
  flex: '0',
  flexBasis: 'auto',
}));

const StyledCompanionAreaRight = styled('div', { name: 'Window', slot: 'right' })(() => ({
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

/** a minimal window for displaying an error message */
const ErrorWindow = ({ error }) => (
  <MinimalWindow>
    <ErrorContent error={error} />
  </MinimalWindow>
);

ErrorWindow.propTypes = {
  error: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

/**
 * Represents a Window in the mirador workspace
 * @param {object} window
 */
export function Window({
  focusWindow = () => {}, label = null, isFetching = false, sideBarOpen = false,
  view = undefined, windowDraggable = null, windowId, workspaceType = null,
  manifestError = null,
}) {
  const { t } = useTranslation();
  const ownerState = arguments[0]; // eslint-disable-line prefer-rest-params

  return (
    <ErrorBoundary FallbackComponent={ErrorWindow}>
      <Root
        onFocus={focusWindow}
        ownerState={ownerState}
        component="section"
        id={windowId}
        elevation={1}
        className={ns('window')}
        aria-label={t('window', { label })}
      >
        <WindowTopBar
          component={workspaceType === 'mosaic' && windowDraggable ? DraggableNavBar : undefined}
          windowDraggable={windowDraggable}
        />
        <IIIFAuthentication />
        { manifestError && <ErrorContent error={{ stack: manifestError }} /> }
        <ContentRow>
          <ContentColumn>
            <StyledPrimaryWindow
              view={view}
              isFetching={isFetching}
              sideBarOpen={sideBarOpen}
            />
            <StyledCompanionAreaBottom position="bottom" />
          </ContentColumn>
          <StyledCompanionAreaRight>
            <CompanionArea position="right" />
            <CompanionArea position="far-right" />
          </StyledCompanionAreaRight>
        </ContentRow>
        <CompanionArea position="far-bottom" />
        <PluginHook {...ownerState} />
      </Root>
    </ErrorBoundary>
  );
}

Window.propTypes = {
  focusWindow: PropTypes.func,
  isFetching: PropTypes.bool,
  label: PropTypes.string,
  manifestError: PropTypes.string,
  maximized: PropTypes.bool,
  sideBarOpen: PropTypes.bool,
  view: PropTypes.string,
  windowDraggable: PropTypes.bool,
  windowId: PropTypes.string.isRequired,
  workspaceType: PropTypes.string,
};
