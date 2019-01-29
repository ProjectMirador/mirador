import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Window from '../containers/Window';
import WorkspaceMosaic from '../containers/WorkspaceMosaic';
import WorkspaceFreeform from '../containers/WorkspaceFreeform';
import ns from '../config/css-ns';

/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
class Workspace extends React.Component {
  /**
   * Determine which workspace to render by configured type
   */
  workspaceByType() {
    const { workspaceType, windows } = this.props;
    switch (workspaceType) {
      case 'freeform':
        return <WorkspaceFreeform />;
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
    const { isWorkspaceControlPanelVisible } = this.props;

    return (
      <div
        className={
          classNames(
            ns('workspace-viewport'),
            (isWorkspaceControlPanelVisible && ns('workspace-with-control-panel')),
          )
        }
      >
        {this.workspaceByType()}
      </div>
    );
  }
}

Workspace.propTypes = {
  isWorkspaceControlPanelVisible: PropTypes.bool.isRequired,
  windows: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  workspaceType: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Workspace;
