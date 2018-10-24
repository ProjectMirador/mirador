import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Represents a Window in the mirador workspace
 * @param {object} window
 */
class Window extends Component {
  /**
   * Fetches IIIF thumbnail URL
   */
  thumbnail() {
    const thumb = this.props.manifest.manifestation.getThumbnail() || { id: 'http://placekitten.com/200/300' };
    return thumb.id;
  }

  /**
   * Renders things
   * @param {object} props (from react/redux)
   */
  render() {
    return (
      <div className="mirador-window">
        <h3>{this.props.manifest.manifestation.getLabel().map(label => label.value)[0]}</h3>
        <img src={this.thumbnail()} alt="" />
        <p>{this.props.window.id}</p>
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
const mapStateToProps = ({ windows, manifests }, props) => {
  const window = windows.find(win => props.id === win.id);
  return {
    window,
    manifest: manifests[window.manifestId],
  };
};

export default connect(mapStateToProps)(Window);
