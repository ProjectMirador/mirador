import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Represents a WindowBackground in the mirador workspace
 * @param {object} window
 */
class WindowBackground extends Component {
  /**
   * Fetches IIIF thumbnail URL
   */
  thumbnail() {
    const { manifest } = this.props;
    const thumb = manifest.manifestation.getThumbnail() || { id: 'http://placekitten.com/200/300' };
    return thumb.id;
  }


  /**
   * content - based off of manifest state
   *
   * @return {type}
   */
  content(manifest) {
    if (!manifest) return null;
    switch (manifest.isFetching) {
      case true:
        return 'spinner';
      case false:
        if (manifest.manifestation) {
          return <img src={this.thumbnail()} alt="" />;
        }
        break;
      default:
        return null;
    }
    return null;
  }

  /**
   * Renders things
   */
  render() {
    const { manifest } = this.props;
    return (
      <div>
        {this.content(manifest)}
      </div>
    );
  }
}

WindowBackground.propTypes = {
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

WindowBackground.defaultProps = {
  manifest: null,
};

export default WindowBackground;
