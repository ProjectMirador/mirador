import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Represents a Window in the mirador workspace
 * @param {object} window
 */
class Window extends Component {
  /**
   * Renders things
   * @param {object} props (from react/redux)
   */
  render() {
    return (
      <div
        className="mirador-window"
      >
        {this.props.window.id}
      </div>
    );
  }
}

Window.propTypes = {
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
const mapStateToProps = ({ windows }, props) => (
  {
    window: windows.find(window => props.id === window.id),
  }
);

export default connect(mapStateToProps)(Window);
