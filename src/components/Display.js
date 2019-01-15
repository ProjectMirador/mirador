import React from 'react';
import PropTypes from 'prop-types';
import ManifestMetadata from './ManifestMetadata';
import ns from '../config/css-ns';

/**
 * Determines how to best display the content (or lack thereof) the manifest
 * @private
 */
const displayContent = manifest => {
  if (manifest) {
    if (manifest.isFetching) {
      return '☕';
    }
    if (manifest.error) {
      return manifest.error.message;
    }
    return <ManifestMetadata manifest={manifest} />;
  }
  return 'Nothing Selected Yet';
};

/**
 * Determines which classes should be used for display, based on the state of
 * the manifest
 * @memberof Display
 * @private
 */
const stateClass = manifest => {
  if (manifest) {
    if (manifest.isFetching) {
      return 'fetching';
    }
    if (manifest.error) {
      return 'error';
    }
    return '';
  }
  return 'empty';
};

/**
 * Displays a manifest
 * @param {object} props
 * @param {object} [props.manifest = undefined]
 */
const Display = ({ manifest }) => (
  <div className="Display">
    <div id="exampleManifest" className={ns(stateClass(manifest))}>
      {displayContent(manifest)}
    </div>
  </div>
);

Display.propTypes = {
  manifest: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

Display.defaultProps = {
  manifest: undefined
};

export default Display;
