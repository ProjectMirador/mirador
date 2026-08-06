import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getShowThumbnailLabelsConfig, getShowZoomControlsConfig, getThemeIds, getWorkspace } from '../state/selectors';
import { WorkspaceMenu } from '../components/WorkspaceMenu';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WorkspaceMenu
 * @private
 */
const mapDispatchToProps = {
  toggleThumbnailLabels: actions.toggleThumbnailLabels,
  toggleZoomControls: actions.toggleZoomControls,
};

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = (state) => ({
  isWorkspaceAddVisible: getWorkspace(state).isWorkspaceAddVisible,
  showThemePicker: getThemeIds(state).length > 0,
  showThumbnailLabels: getShowThumbnailLabelsConfig(state),
  showZoomControls: getShowZoomControlsConfig(state),
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), withPlugins('WorkspaceMenu'));

export default enhance(WorkspaceMenu);
