import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend';
import { WindowSideBar } from '../components/WindowSideBar';
import { getWindow } from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBar
 * @private
 */
const mapStateToProps = (state, { windowId }) => (
  {
    sideBarOpen: getWindow(state, { windowId }).sideBarOpen,
    sideBarPanel: getWindow(state, { windowId }).sideBarPanel,
  }
);

/**
 *
 * @param theme
 * @returns {{toolbar: CSSProperties | toolbar | {minHeight}, grow: {flexGrow: number},
 * drawer: {overflowX: string, left: number, flexShrink: number, width: number, height: string}}}
 */
const styles = theme => ({
  drawer: {
    flexShrink: 0,
    height: '100%',
    left: 0,
    order: -1000,
    zIndex: theme.zIndex.appBar - 1,
  },
  grow: {
    flexGrow: 1,
  },
  paper: {
    overflowX: 'hidden',
    width: 48,
  },
  toolbar: theme.mixins.toolbar,
});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, null),
  withPlugins('WindowSideBar'),
);

export default enhance(WindowSideBar);
