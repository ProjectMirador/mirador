import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend';
import { Workspace } from '../components/Workspace';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => (
  {
    isWorkspaceControlPanelVisible: state.config.workspaceControlPanel.enabled,
    windows: state.windows,
    workspaceType: state.config.workspace.type,
  }
);

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps),
  withPlugins('Workspace'),
  // further HOC go here
);

export default enhance(Workspace);
