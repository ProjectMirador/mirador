import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import * as actions from '../state/actions';
import { getWindowManifest, getManifestTitle } from '../state/selectors';
import { WindowTopBar } from '../components/WindowTopBar';

/** mapStateToProps */
const mapStateToProps = (state, { windowId }) => ({
  manifestTitle: getManifestTitle(getWindowManifest(state, windowId)),
  maximized: state.windows[windowId].maximized,
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  removeWindow: () => dispatch(actions.removeWindow(windowId)),
  maximizeWindow: () => dispatch(actions.maximizeWindow(windowId)),
  minimizeWindow: () => dispatch(actions.minimizeWindow(windowId)),
  toggleWindowSideBar: () => dispatch(actions.toggleWindowSideBar(windowId)),
});

/**
 * @param theme
 * @returns {{typographyBody: {flexGrow: number, fontSize: number|string},
 * windowTopBarStyle: {minHeight: number, paddingLeft: number, backgroundColor: string}}}
 */
const styles = theme => ({
  title: {
    ...theme.typography.h6,
    flexGrow: 1,
  },
  windowTopBarStyle: {
    minHeight: 32,
    paddingLeft: 4,
    backgroundColor: theme.palette.primary.light,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(WindowTopBar);
