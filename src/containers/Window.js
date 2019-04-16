import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { Window } from '../components/Window';
import {
  getManifest, getManifestTitle, getThumbnailNavigationPosition, getWindow,
  getWorkspaceType, getWindowDraggability, getWindowViewType,
} from '../state/selectors';


/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  label: getManifestTitle(state, { windowId }),
  manifest: getManifest(state, { windowId }),
  manifestId: (getWindow(state, { windowId }) || {}).manifestId,
  maximized: (getWindow(state, { windowId }) || {}).maximized,
  sideBarOpen: (getWindow(state, { windowId }) || {}).sideBarOpen,
  thumbnailNavigationPosition: getThumbnailNavigationPosition(state, { windowId }),
  view: getWindowViewType(state, { windowId }),
  window: getWindow(state, { windowId }),
  windowDraggable: getWindowDraggability(state, { windowId }),
  workspaceType: getWorkspaceType(state),
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  fetchManifest: (...args) => dispatch(actions.fetchManifest(...args)),
  focusWindow: () => dispatch(actions.focusWindow(windowId)),
});

/**
 * @param theme
 */
const styles = theme => ({
  companionAreaBottom: {
    display: 'flex',
    flex: '0',
    flexBasis: 'auto',
    minHeight: 0,
  },
  companionAreaRight: {
    display: 'flex',
    flex: '0',
    minHeight: 0,
  },
  middle: {
    display: 'flex',
    flex: '1',
    flexDirection: 'row',
    minHeight: 0,
  },
  middleLeft: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    minHeight: 0,
  },
  primaryWindow: {
    display: 'flex',
    flex: '1',
    height: '300px',
    minHeight: 0,
    position: 'relative',
  },
  thumbnailArea: {
    backgroundColor: theme.palette.shades[theme.palette.type][0],
  },
  thumbnailAreaBottom: {
  },
  thumbnailAreaRight: {
    minWidth: 100,
  },
  window: {
    backgroundColor: theme.palette.shades[theme.palette.type][0],
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 0,
    overflow: 'hidden',
    width: '100%',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('Window'),
);

export default enhance(Window);
