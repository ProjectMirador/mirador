import React from 'react';
import PropTypes from 'prop-types';
import ConnectedWindow from './Window';
import ns from '../config/css-ns';

/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
class Workspace extends React.Component {
  /**
   * render
   */
  render() {
    const { windows } = this.props;
    return (
      <div className={ns('workspace')}>
        {
          Object.values(windows).map(window => (
            <ConnectedWindow
              key={window.id}
              window={window}
            />
          ))
        }
      </div>
    );
  }
}

Workspace.propTypes = {
  windows: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Workspace;
