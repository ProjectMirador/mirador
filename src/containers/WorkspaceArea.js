import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend';
import { WorkspaceArea } from '../components/WorkspaceArea';

/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
const mapStateToProps = state => (
  {
    isWorkspaceAddVisible: state.workspace.isWorkspaceAddVisible,
    isWorkspaceControlPanelVisible: state.config.workspaceControlPanel.enabled,
  }
);

/**
 *
 * @param theme
 * @returns {{background: {background: string}}}
 */
const styles = theme => ({
  background: {
    background: theme.palette.background.default,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps),
  withPlugins('WorkspaceArea'),
);

export default enhance(WorkspaceArea);
