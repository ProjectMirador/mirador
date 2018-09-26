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
// const Workspace = ({ windows, manifests }) => (
  <div className="mirador-workspace">
    {
      windows.map(window => (
        <div className="window" key={window.id}>{window.id}</div>
        //   <Window
        //     key={window.id}
        //     windowId={window.id}
        //     manifest={manifests[window.manifestId]}
        //   />
      ))
    }
  </div>
);

Workspace.propTypes = {
  windows: PropTypes.instanceOf(Array).isRequired, // manifests: PropTypes.instanceOf(Array),
};

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => (
  {
    windows: state.windows, // manifests: state.manifests
  }
);

// const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps)(Workspace); //  mapDispatchToProps,
