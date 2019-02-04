import React from 'react';
import PropTypes from 'prop-types';
import Window from '../containers/Window';
import WorkspaceMosaic from '../containers/WorkspaceMosaic';
import * as shapes from '../shapes';
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
    return (
      <div className={ns('workspace')}>
        {this.workspaceByType()}
      </div>
    );
  }
}

Workspace.propTypes = {
  windows: PropTypes.objectOf(PropTypes.shape(shapes.windowShape)).isRequired,
  workspaceType: PropTypes.string.isRequired,
};

export default Workspace;
