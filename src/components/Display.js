import React from 'react';
import PropTypes from 'prop-types';


/**
 * Determines how to best display the content (or lack thereof) the manifest
 * @private
 */
const displayContent = (manifest) => {
  if (manifest) {
    if (manifest.isFetching) {
      return '☕';
    } else if (manifest.error) {
      return manifest.error.message;
    }
    return JSON.stringify(manifest.json, 0, 2);
  }
  return 'Nothing Selected Yet';
};

/**
 * Determines which classes should be used for display, based on the state of
 * the manifest
 * @memberof Display
 * @private
 */
const stateClass = (manifest) => {
  if (manifest) {
    if (manifest.isFetching) {
      return 'fetching';
    } else if (manifest.error) {
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
    <pre id="exampleManifest" className={stateClass(manifest)}>
      {displayContent(manifest)}
    </pre>
  </div>
);

Display.propTypes = {
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Display.defaultProps = {
  manifest: undefined,
};

export default Display;
