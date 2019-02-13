import React from 'react';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
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
      <GridListTile key={`tile_${manifest}`}>
        <ManifestListItem
          key={manifest}
          manifestId={manifest}
          handleClose={() => setWorkspaceAddVisibility(false)}
        />
      </GridListTile>
    ));

    return (
      <div className={ns('workspace-add')}>
        <ManifestForm
          id="add-form"
        />
        <GridList cellHeight={350} cols={3}>
          {manifestList}
        </GridList>
      </div>
    );
  }
}

WorkspaceAdd.propTypes = {
  manifests: PropTypes.instanceOf(Object).isRequired,
  setWorkspaceAddVisibility: PropTypes.func.isRequired,
};

export default WorkspaceAdd;
