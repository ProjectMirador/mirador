import { compose } from 'redux';
import { connect } from 'react-redux';
import { Workspace } from '../components/Workspace';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => (
  {
    isWorkspaceControlPanelVisible: state.config.workspaceControlPanel.enabled,
    workspaceType: state.config.workspace.type,
    windows: state.windows,
    savedLayout: state.workspace.savedLayout,
  }
);

const enhance = compose(
  connect(mapStateToProps),
  // further HOC go here
);

export default enhance(Workspace);
