import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from '../store';

const handleOpenButtonClick = (event, manifest, addWindow) => {
  addWindow({});
}
/**
 * Represents an item in a list of currently-loaded or loading manifests
 * @param {object} props
 * @param {object} [props.manifest = string]
 */
const ManifestListItem = ({ manifest, addWindow}) => (
  <li className="manifest-list-item">
    <a href="#" onClick={(event) => handleOpenButtonClick(event, manifest, addWindow)}>
      {manifest}
    </a>
  </li>
);

ManifestListItem.propTypes = {
  manifest: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = () => (
  {}
);

const mapDispatchToProps = dispatch => ({
  addWindow: options => (
    dispatch(actions.addWindow(options))
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManifestListItem);
