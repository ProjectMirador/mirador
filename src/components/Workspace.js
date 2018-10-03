import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { actions } from '../store';
// import Window from './Window';


/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
const Workspace = ({ windows }) => (
  <div className="mirador-workspace">
    {
      windows.map(window => (
        <div
          className="window"
          key={window.id}
          id={window.id}
        >{window.manifestId}</div>
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

// const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps)(Workspace); //  mapDispatchToProps,
