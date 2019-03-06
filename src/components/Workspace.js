import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
    const { workspaceType, windows } = this.props;
    switch (workspaceType) {
      case 'elastic':
        return <WorkspaceElastic />;
      case 'mosaic':
        return <WorkspaceMosaic windows={windows} />;
      default:
        return Object.values(windows).map(window => (
          <Window
            key={window.id}
            window={window}
          />
        ));
    }
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
  windows: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  workspaceType: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func.isRequired,
};
