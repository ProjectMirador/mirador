import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { Workspace } from '../components/Workspace';
import { getMaximizedWindowsIds, getWindowIds, getWorkspaceType } from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => (
  {
    isWorkspaceControlPanelVisible: state.config.workspaceControlPanel.enabled,
    maximizedWindowIds: getMaximizedWindowsIds(state),
    windowIds: getWindowIds(state),
    workspaceId: state.workspace.id,
    workspaceType: getWorkspaceType(state),
  }
);

/**
 * @param theme
 */
const styles = theme => ({
  workspaceViewport: {
    bottom: 0,
    left: 0,
    margin: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  workspaceWithControlPanel: {
    paddingTop: 74,
  },
  // injection order matters here
  // eslint-disable-next-line sort-keys
  '@media (min-width: 600px)': {
    workspaceWithControlPanel: {
      paddingLeft: 68,
      paddingTop: 0,
    },
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps),
  withPlugins('Workspace'),
  // further HOC go here
);

export default enhance(Workspace);
