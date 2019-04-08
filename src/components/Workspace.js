import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Window from '../containers/Window';
import WorkspaceMosaic from '../containers/WorkspaceMosaic';
import WorkspaceElastic from '../containers/WorkspaceElastic';
import ns from '../config/css-ns';

/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
export class Workspace extends React.Component {
  /**
   * Determine which workspace to render by configured type
   */
  workspaceByType() {
    const { workspaceId, workspaceType, windows } = this.props;
    if (this.maximizedWindows()) {
      return this.maximizedWindows();
    }

    if (Object.keys(windows).length === 0) return this.zeroWindows();

    switch (workspaceType) {
      case 'elastic':
        return <WorkspaceElastic />;
      case 'mosaic':
        return <WorkspaceMosaic windows={windows} />;
      default:
        return Object.values(windows).map(window => (
          <Window
            key={`${window.id}-${workspaceId}`}
            window={window}
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
    const { windows, workspaceId } = this.props;
    const windowKeys = Object.keys(windows).sort();
    const maximizedWindows = windowKeys
      .map(id => windows[id])
      .filter(window => window.maximized === true);
    if (maximizedWindows.length) {
      return Object.values(maximizedWindows).map(window => (
        <Window
          key={`${window.id}-${workspaceId}`}
          window={window}
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
      <div
        className={
          classNames(
            ns('workspace-viewport'),
            (isWorkspaceControlPanelVisible && ns('workspace-with-control-panel')),
          )
        }
      >
        <Typography variant="srOnly" component="h1">{t('miradorViewer')}</Typography>
        {this.workspaceByType()}
      </div>
    );
  }
}

Workspace.propTypes = {
  isWorkspaceControlPanelVisible: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  windows: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  workspaceId: PropTypes.string.isRequired,
  workspaceType: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
};
