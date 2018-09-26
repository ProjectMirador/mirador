import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from '../store';


/**
 * Handling open button click
 */
const handleOpenButtonClick = (event, manifest, addWindow) => {
  addWindow({});
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
const ManifestListItem = ({ manifest, addWindow }) => (
  <li className="manifest-list-item">
    <button type="button" onClick={event => handleOpenButtonClick(event, manifest, addWindow)}>
      {manifest}
    </button>
  </li>
);

ManifestListItem.propTypes = {
  manifest: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
  addWindow: PropTypes.func.isRequired,
};

/**
 * mapStateToProps - to hook up connect
 * @memberof ManifestListItem
 * @private
 */
const mapStateToProps = () => (
  {}
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = dispatch => ({
  addWindow: options => (
    dispatch(actions.addWindow(options))
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManifestListItem);
