import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
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
const styles = theme => ({
  '@global': {
    '.mirador-canvas-nav': {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      textAlign: 'center',
    },
    '.mirador-canvas-nav-stacked': {
      flexDirection: 'column',
    },
    '.mirador-companion-window-bottom': {
      '&.mirador-companion-window-title-controls': {
        order: 'unset',
      },
    },
    '.mirador-companion-window-header': {
      flexWrap: 'wrap',
    },
    '.mirador-companion-window-title-controls': {
      flexGrow: 1,
      order: 1000,
    },
    '.mirador-label-value-metadata dd': {
      marginBottom: '.5em',
      marginLeft: 0,
    },
    '.mirador-osd-container': {
      flex: 1,
      position: 'relative',
    },
    '.mirador-osd-info': {
      order: 2,
      overflow: 'hidden',
      paddingBottom: 3,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: '100%',
    },
    '.mirador-osd-navigation': {
      order: 1,
    },
    '.mirador-primary-window': {
      display: 'flex',
      flex: 1,
      position: 'relative',
    },
    '.mirador-viewer': {
      bottom: 0,
      left: 0,
      overflow: 'hidden',
      position: 'absolute',
      right: 0,
      top: 0,
    },
    '.mirador-workspace': {
      boxSizing: 'border-box',
      margin: 0,
      position: 'absolute',
      transitionDuration: '.7s',
      '&.react-draggable-dragging': { // eslint-disable-line sort-keys
        transitionDuration: 'unset',
      },
    },
    '.mirador-workspace-add': {
      height: '100%',
      overflowX: 'hidden',
      overflowY: 'auto',
      paddingTop: 68,
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 68,
        paddingTop: 0,
      },
    },
    '.mirador-workspace-with-control-panel': {
      paddingTop: 74,
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 68,
        paddingTop: 0,
      },
    },
    '.mosaic-tile': {
      boxShadow: [
        [0, 1, 3, 0, 'rgba(0, 0, 0, .2)'],
        [0, 1, 1, 0, 'rgba(0, 0, 0, .2)'],
        [0, 2, 1, -1, 'rgba(0, 0, 0, .2)'],
      ],
    },
    '.mosaic-window, .mosaic-preview': {
      boxShadow: 'none',
    },
    '.mosaic-window-toolbar': {
      display: [['none'], '!important'],
    },
  },
  background: {
    background: theme.palette.shades.light,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps),
  withPlugins('WorkspaceArea'),
);

export default enhance(WorkspaceArea);
