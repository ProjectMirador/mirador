import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { Workspace } from '../components/Workspace';
import { getMaximizedWindowsIds, getWindowIds, getWorkspaceType } from '../state/selectors';
import * as actions from '../state/actions';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => (
  {
    allowNewWindows: state.config.workspace.allowNewWindows,
    isWorkspaceControlPanelVisible: state.config.workspaceControlPanel.enabled,
    maximizedWindowIds: getMaximizedWindowsIds(state),
    windowIds: getWindowIds(state),
    workspaceId: state.workspace.id,
    workspaceType: getWorkspaceType(state),
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
const mapDispatchToProps = {
  addWindow: actions.addWindow,
};

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
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('Workspace'),
  // further HOC go here
);

export default enhance(Workspace);
