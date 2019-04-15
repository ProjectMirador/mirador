import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getManifestTitle, getWindow } from '../state/selectors';
import { WindowTopBar } from '../components/WindowTopBar';

/** mapStateToProps */
const mapStateToProps = (state, { windowId }) => ({
  allowClose: state.config.window.allowClose,
  allowMaximize: state.config.window.allowMaximize,
  focused: state.workspace.focusedWindowId === windowId,
  manifestTitle: getManifestTitle(state, { windowId }),
  maximized: (getWindow(state, { windowId }) || {}).maximized,
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  focusWindow: () => dispatch(actions.focusWindow(windowId)),
  maximizeWindow: () => dispatch(actions.maximizeWindow(windowId)),
  minimizeWindow: () => dispatch(actions.minimizeWindow(windowId)),
  removeWindow: () => dispatch(actions.removeWindow(windowId)),
  toggleWindowSideBar: () => dispatch(actions.toggleWindowSideBar(windowId)),
});

/**
 * @param theme
 * @returns {{typographyBody: {flexGrow: number, fontSize: number|string},
 * windowTopBarStyle: {minHeight: number, paddingLeft: number, backgroundColor: string}}}
 */
const styles = theme => ({
  focused: {},
  title: {
    ...theme.typography.h6,
    flexGrow: 1,
    paddingLeft: theme.spacing.unit / 2,
  },
  windowTopBarStyle: {
    '&$focused': {
      borderTop: `2px solid ${theme.palette.primary.main}`,
    },
    backgroundColor: theme.palette.lightened[theme.palette.type],
    borderTop: '2px solid transparent',
    minHeight: 32,
    paddingLeft: theme.spacing.unit / 2,
    paddingRight: theme.spacing.unit / 2,
  },
  windowTopBarStyleDraggable: {
    cursor: 'move',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowTopBar'),
);

export default enhance(WindowTopBar);
