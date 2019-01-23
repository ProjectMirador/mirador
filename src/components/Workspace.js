import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConnectedWindow from './Window';
import ns from '../config/css-ns';

/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
export class Workspace extends React.Component {
  /**
   * guess what
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
