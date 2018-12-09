import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from '../store';
import ns from '../config/css-ns';


/**
 * WindowTopBar
 */
class WindowTopBar extends Component {
  /**
   * render - description
   * @return {type}  description
   */
  render() {
    return (
      <div className={ns('window-top-bar')}>
        <h3>{this.props.manifest.manifestation.getLabel().map(label => label.value)[0]}</h3>
        <button className={ns('window-close')} aria-label="Close Window" onClick={() => this.props.removeWindow(this.props.windowId)}>&times;</button>
      </div>
    );
  }
}

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = dispatch => ({
  removeWindow: windowId => (
    dispatch(actions.removeWindow(windowId))
  ),
});

WindowTopBar.propTypes = {
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  removeWindow: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

WindowTopBar.defaultProps = {
  manifest: null,
};


export default connect(null, mapDispatchToProps)(WindowTopBar);
