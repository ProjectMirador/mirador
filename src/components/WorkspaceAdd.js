import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
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
        manifestId={manifest}
        handleClose={() => setWorkspaceAddVisibility(false)}
      />
    ));

    return (
      <div className={ns('workspace-add')}>
        {manifestList}

        <Drawer
          variant="permanent"
          open
          anchor="bottom"
          PaperProps={{ style: { position: 'absolute', left: 100 } }}
          ModalProps={{
            disablePortal: true,
            hideBackdrop: true,
            style: { position: 'absolute' },
          }}
        >
          <ManifestForm
            id="add-form"
          />
        </Drawer>
      </div>
    );
  }
}

WorkspaceAdd.propTypes = {
  manifests: PropTypes.instanceOf(Object).isRequired,
  setWorkspaceAddVisibility: PropTypes.func.isRequired,
};

export default WorkspaceAdd;
