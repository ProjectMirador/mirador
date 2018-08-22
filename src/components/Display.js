import React from 'react';
import PropTypes from 'prop-types';

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

const Display = props => (
  <div className="Display">
    <pre id="exampleManifest" className={stateClass(props.manifest)}>
      {displayContent(props.manifest)}
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
