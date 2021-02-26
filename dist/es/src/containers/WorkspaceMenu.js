import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getContainerId, getShowZoomControlsConfig, getThemeIds, getWorkspace } from '../state/selectors';
import { WorkspaceMenu } from '../components/WorkspaceMenu';
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WorkspaceMenu
 * @private
 */

var mapDispatchToProps = {
  toggleZoomControls: actions.toggleZoomControls
};
/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */

var mapStateToProps = function mapStateToProps(state) {
  return {
    containerId: getContainerId(state),
    isWorkspaceAddVisible: getWorkspace(state).isWorkspaceAddVisible,
    showThemePicker: getThemeIds(state).length > 0,
    showZoomControls: getShowZoomControlsConfig(state)
  };
};

var enhance = compose(withTranslation(), connect(mapStateToProps, mapDispatchToProps), withPlugins('WorkspaceMenu'));
export default enhance(WorkspaceMenu);