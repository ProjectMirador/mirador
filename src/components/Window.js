import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ns from '../config/css-ns';
import WindowBackground from './WindowBackground';
import ConnectedWindowTopBar from './WindowTopBar';
import WindowViewer from './WindowViewer';

/**
 * Represents a Window in the mirador workspace
 * @param {object} window
 */
class Window extends Component {
  /**
   * Return style attributes
   */
  styleAttributes() {
    const { window } = this.props;
    return { width: `${window.xywh[2]}px`, height: `${window.xywh[3]}px` };
  }

  /**
   * renderViewer
   *
   * @return {String, null}
   */
  renderViewer() {
    const { manifest, window } = this.props;
    if (manifest && manifest.isFetching === false) {
      return (
        <WindowViewer
          window={window}
          manifest={manifest}
        />
      );
    }
    return null;
  }

  /**
   * Renders things
   */
  render() {
    const { manifest, window } = this.props;
    return (
      <div className={ns('window')} style={this.styleAttributes()}>
        <ConnectedWindowTopBar
          windowId={window.id}
          manifest={manifest}
        />
        <WindowBackground
          manifest={manifest}
        />
        {this.renderViewer()}
      </div>
    );
  }
}

Window.propTypes = {
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Window.defaultProps = {
  manifest: null,
};

/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
const mapStateToProps = ({ manifests }, props) => ({
  manifest: manifests[props.window.manifestId],
});

const enhance = compose(
  connect(mapStateToProps),
  // further HOC go here
);

export default enhance(Window);
