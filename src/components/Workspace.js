import { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import classNames from 'classnames';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import Window from '../containers/Window';
import WorkspaceMosaic from '../containers/WorkspaceMosaic';
import WorkspaceElastic from '../containers/WorkspaceElastic';
import ns from '../config/css-ns';
import { IIIFDropTarget } from './IIIFDropTarget';

const StyledWorkspaceViewport = styled('div')(() => ({
  bottom: 0,
  left: 0,
  margin: 0,
  overflow: 'hidden',
  position: 'absolute',
  right: 0,
  top: 0,
}));

/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
export class Workspace extends Component {
  /** */
  constructor(props) {
    super(props);

    this.handleDrop = this.handleDrop.bind(this);
  }

  /** */
  handleDrop({ canvasId, manifestId, manifestJson }, props, monitor) {
    const { addWindow, allowNewWindows } = this.props;

    if (!allowNewWindows) return;

    addWindow({ canvasId, manifest: manifestJson, manifestId });
  }

  /**
   * Determine which workspace to render by configured type
   */
  workspaceByType() {
    const { workspaceId, workspaceType, windowIds } = this.props;
    if (this.maximizedWindows()) {
      return this.maximizedWindows();
    }

    if (windowIds.length === 0) return this.zeroWindows();

    switch (workspaceType) {
      case 'elastic':
        return <WorkspaceElastic />;
      case 'mosaic':
        return <WorkspaceMosaic />;
      default:
        return windowIds.map(windowId => (
          <Window
            key={`${windowId}-${workspaceId}`}
            windowId={windowId}
          />
        ));
    }
  }

  /** */
  zeroWindows() {
    const { t } = this.props;

    return (
      <Grid
        alignItems="center"
        container
        style={{
          height: '100%',
        }}
      >
        <Grid
          xs={12}
          item
        >
          <Typography
            variant="h1"
            component="div"
            align="center"
          >
            {t('welcome')}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  /**
   * Determine whether or not there are maximized windows
   */
  maximizedWindows() {
    const { maximizedWindowIds, workspaceId } = this.props;

    if (maximizedWindowIds.length > 0) {
      return maximizedWindowIds.map(windowId => (
        <Window
          key={`${windowId}-${workspaceId}`}
          windowId={windowId}
          className={classNames(ns('workspace-maximized-window'))}
        />
      ));
    }
    return false;
  }

  /**
   * render
   */
  render() {
    const { isWorkspaceControlPanelVisible, t } = this.props;

    return (
      <IIIFDropTarget onDrop={this.handleDrop}>
        <StyledWorkspaceViewport
          sx={{
            '@media (min-width: 600px)': {
              paddingLeft: isWorkspaceControlPanelVisible && 8.5,
              paddingTop: isWorkspaceControlPanelVisible && 0,
            },
            paddingTop: isWorkspaceControlPanelVisible && 9.25,
          }}
          className={
            classNames(
              ns('workspace-viewport'),
              (isWorkspaceControlPanelVisible && ns('workspace-with-control-panel')),
            )
          }
        >
          <Typography style={visuallyHidden} component="h1">{t('miradorViewer')}</Typography>
          {this.workspaceByType()}
        </StyledWorkspaceViewport>
      </IIIFDropTarget>
    );
  }
}

Workspace.propTypes = {
  addWindow: PropTypes.func,
  allowNewWindows: PropTypes.bool,
  isWorkspaceControlPanelVisible: PropTypes.bool.isRequired,
  maximizedWindowIds: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired,
  windowIds: PropTypes.arrayOf(PropTypes.string),
  workspaceId: PropTypes.string.isRequired,
  workspaceType: PropTypes.string.isRequired,
};

Workspace.defaultProps = {
  addWindow: () => {},
  allowNewWindows: true,
  maximizedWindowIds: [],
  windowIds: [],
};
