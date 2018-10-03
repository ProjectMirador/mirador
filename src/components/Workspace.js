import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Window from './Window';

/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
const Workspace = ({ windows }) => (
  <div className="mirador-workspace">
    {
      windows.map(window => (
        <Window
          key={window.id}
          id={window.id}
        />
      ))
    }
  </div>
);

Workspace.propTypes = {
  windows: PropTypes.instanceOf(Array).isRequired,
};

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => (
  {
    windows: state.windows,
  }
);

export default connect(mapStateToProps)(Workspace);
