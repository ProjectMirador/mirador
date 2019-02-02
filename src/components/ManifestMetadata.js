import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ns from '../config/css-ns';

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
    const { manifest } = this.props;
    return (
      <div>
        <h3>
          {manifest.manifestation.getLabel().map(label => label.value)[0]}
        </h3>
        <div className={ns('description')}>
          {manifest.manifestation.getDescription().map(label => label.value)}
        </div>
      </div>
    );
  }
}

ManifestMetadata.propTypes = {
  manifest: PropTypes.object,
};

ManifestMetadata.defaultProps = {
  manifest: null,
};
