import React from 'react';
import PropTypes from 'prop-types';
import ns from '../config/css-ns';


/**
 * Handling open button click
 */
const handleOpenButtonClick = (event, manifest, addWindow) => {
  addWindow({ manifestId: manifest });
};
/**
 * Represents an item in a list of currently-loaded or loading manifests
 * @param {object} props
 * @param {object} [props.manifest = string]
 */

/**
 * Determines which classes should be used for display, based on the state of
 * the manifest
 * @memberof ManifestListItem
 * @private
 */
const ManifestListItem = ({ manifest, addWindow, handleClose }) => (
  <li className={ns('manifest-list-item')}>
    <button type="button" onClick={(event) => { handleOpenButtonClick(event, manifest, addWindow); handleClose(); }}>
      {manifest}
    </button>
  </li>
);

ManifestListItem.propTypes = {
  manifest: PropTypes.string.isRequired,
  addWindow: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
};

ManifestListItem.defaultProps = {
  handleClose: () => {},
};

export default ManifestListItem;
