import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import {
  getShowZoomControlsConfig, getThemeIds,
  getWorkspace,
} from '../state/selectors';
import { withWorkspaceContext } from '../contexts/WorkspaceContext';
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
  isWorkspaceAddVisible: getWorkspace(state).isWorkspaceAddVisible,
  showThemePicker: getThemeIds(state).length > 0,
  showZoomControls: getShowZoomControlsConfig(state),
});

const enhance = compose(
  withTranslation(),
  withWorkspaceContext,
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WorkspaceMenu'),
);

export default enhance(WorkspaceMenu);
