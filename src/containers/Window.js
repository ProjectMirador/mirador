import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { Window } from '../components/Window';
import {
  getManifestStatus, getManifestTitle, getThumbnailNavigationPosition, getWindow,
  getWorkspaceType, getWindowDraggability, getWindowViewType, getManifestError,
} from '../state/selectors';


/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  isFetching: getManifestStatus(state, { windowId }).isFetching,
  label: getManifestTitle(state, { windowId }),
  manifestError: getManifestError(state, { windowId }),
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
    flex: '0 1 auto',
    minHeight: 0,
  },
  maximized: {},
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
    backgroundColor: theme.palette.shades.dark,
  },
  thumbnailAreaBottom: {
  },
  thumbnailAreaRight: {
    minWidth: 100,
  },
  window: {
    '&$maximized': {
      left: 0,
      position: 'absolute',
      top: 0,
      zIndex: theme.zIndex.modal - 1,
    },
    backgroundColor: theme.palette.shades.dark,
    borderRadius: 0,
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
