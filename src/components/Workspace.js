import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Window from './Window';
import ns from '../config/css-ns';

/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
const Workspace = ({ windows }) => (
  <div className={ns('workspace')}>
    {
      windows.map(window => (
        <Window
          id={window.id}
          key={window.id}
          window={window}
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

const enhance = compose(
  connect(mapStateToProps),
  // further HOC go here
);

export default enhance(Workspace);
