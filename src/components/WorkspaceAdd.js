import React from 'react';
import PropTypes from 'prop-types';
import ns from '../config/css-ns';
import ManifestForm from '../containers/ManifestForm';
import ManifestListItem from '../containers/ManifestListItem';

/**
 * An area for managing manifests and adding them to workspace
 * @memberof Workspace
 * @private
 */
class WorkspaceAdd extends React.Component {
  /**
   * render
   */
  render() {
    const { manifests, setWorkspaceAddVisibility } = this.props;

    const manifestList = Object.keys(manifests).map(manifest => (
      <ManifestListItem
        key={manifest}
        manifest={manifest}
        handleClose={() => setWorkspaceAddVisibility(false)}
      />
    ));

    return (
      <div className={ns('workspace-add')}>
        <ManifestForm
          id="add-form"
        />
        <ul>{manifestList}</ul>
      </div>
    );
  }
}

WorkspaceAdd.propTypes = {
  manifests: PropTypes.instanceOf(Object).isRequired,
  setWorkspaceAddVisibility: PropTypes.func.isRequired,
};

export default WorkspaceAdd;
