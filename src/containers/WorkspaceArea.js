import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles, lighten, darken } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { WorkspaceArea } from '../components/WorkspaceArea';

/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
const mapStateToProps = state => (
  {
    controlPanelVariant: state.workspace.isWorkspaceAddVisible || Object.keys(state.windows).length > 0 ? undefined : 'wide',
    isWorkspaceAddVisible: state.workspace.isWorkspaceAddVisible,
    isWorkspaceControlPanelVisible: state.config.workspaceControlPanel.enabled,
  }
);

/**
 *
 * @param theme
 * @returns {{background: {background: string}}}
 */
const styles = (theme) => {
  const getBackgroundColor = theme.palette.type === 'light' ? darken : lighten;

  return {
    viewer: {
      background: getBackgroundColor(theme.palette.shades.light, 0.1),
      bottom: 0,
      left: 0,
      overflow: 'hidden',
      position: 'absolute',
      right: 0,
      top: 0,
    },
  };
};

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps),
  withPlugins('WorkspaceArea'),
);

export default enhance(WorkspaceArea);
