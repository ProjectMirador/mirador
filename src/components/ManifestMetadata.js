import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * ManifestMetadata
 * @param {object} window
 */
export default class ManifestMetadata extends Component {
  /**
   * Renders things
   * @param {object} props
   */
  render() {
    return (
      <div>
        <h3>
          {this.props.manifest.json.getLabel().map(label => label.value)[0]}
        </h3>
        <div className="description">
          {this.props.manifest.json.getDescription().map(label => label.value)}
        </div>
      </div>
    );
  }
}

ManifestMetadata.propTypes = {
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

ManifestMetadata.defaultProps = {
  manifest: null,
};
