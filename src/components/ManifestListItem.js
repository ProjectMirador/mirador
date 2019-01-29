import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../state/actions';
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
export const ManifestListItem = ({ manifest, addWindow, handleClose }) => (
  <li className={ns('manifest-list-item')}>
    <button type="button" onClick={(event) => { handleOpenButtonClick(event, manifest, addWindow); handleClose(); }}>
      {manifest}
    </button>
  </li>
);

ManifestListItem.propTypes = {
  manifest: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
  addWindow: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
};

ManifestListItem.defaultProps = {
  handleClose: () => {},
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
const mapDispatchToProps = { addWindow: actions.addWindow };

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  // further HOC go here
);

export default enhance(ManifestListItem);
