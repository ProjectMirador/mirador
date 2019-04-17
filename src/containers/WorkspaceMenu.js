import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getContainerId, getShowZoomControlsConfig, getThemeIds } from '../state/selectors';
import { WorkspaceMenu } from '../components/WorkspaceMenu';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WorkspaceMenu
 * @private
 */
const mapDispatchToProps = {
  toggleZoomControls: actions.toggleZoomControls,
};

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = state => ({
  containerId: getContainerId(state),
  isWorkspaceAddVisible: state.workspace.isWorkspaceAddVisible,
  showThemePicker: getThemeIds(state).length > 0,
  showZoomControls: getShowZoomControlsConfig(state),
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WorkspaceMenu'),
);

export default enhance(WorkspaceMenu);
