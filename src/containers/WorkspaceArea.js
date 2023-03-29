import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { lighten, darken } from '@mui/material/styles';
import withStyles from '@mui/styles/withStyles';
import { withPlugins } from '../extend/withPlugins';
import { WorkspaceArea } from '../components/WorkspaceArea';
import { getConfig, getWindowIds, getWorkspace } from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
const mapStateToProps = state => (
  {
    controlPanelVariant: getWorkspace(state).isWorkspaceAddVisible || getWindowIds(state).length > 0 ? undefined : 'wide',
    isWorkspaceAddVisible: getWorkspace(state).isWorkspaceAddVisible,
    isWorkspaceControlPanelVisible: getConfig(state).workspaceControlPanel.enabled,
    lang: getConfig(state).language,
  }
);

/**
 *
 * @param theme
 * @returns {{background: {background: string}}}
 */
const styles = (theme) => {
  const getBackgroundColor = theme.palette.mode === 'light' ? darken : lighten;

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
