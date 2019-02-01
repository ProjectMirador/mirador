import React from 'react';
import PropTypes from 'prop-types';
import Window from '../containers/Window';
import WorkspaceMosaic from '../containers/WorkspaceMosaic';
import ns from '../config/css-ns';

/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
class Workspace extends React.Component {
  /**
   */
  constructor(props) {
    super(props);

    this.workspaceByType = this.workspaceByType.bind(this);
  }

  /**
   * Determine which workspace to render by configured type
   */
  workspaceByType() {
    const { config, windows } = this.props;
    switch (config.workspace.type) {
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
  windows: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  config: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Workspace;
