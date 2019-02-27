import { compose } from 'redux';
import { connect } from 'react-redux';
import pickBy from 'lodash/pickBy';
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
    windows: pickBy(state.windows, window => window.displayable === true),
    // Object.keys(state.windows)
    //   .map(id => state.windows[id])
    //   .filter(window => window.displayable === true),
  }
);

const enhance = compose(
  connect(mapStateToProps),
  // further HOC go here
);

export default enhance(Workspace);
