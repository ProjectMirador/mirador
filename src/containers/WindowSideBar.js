import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { WindowSideBar } from '../components/WindowSideBar';
import { getThemeDirection, getWindow } from '../state/selectors';
import { withWindowContext } from '../contexts/WindowContext';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBar
 * @private
 */
const mapStateToProps = (state, { windowId }) => (
  {
    direction: getThemeDirection(state),
    sideBarOpen: (getWindow(state, { windowId }) || {}).sideBarOpen,
    sideBarPanel: (getWindow(state, { windowId }) || {}).sideBarPanel,
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
    order: -1000,
    zIndex: theme.zIndex.appBar - 1,
  },
  grow: {
    flexGrow: 1,
  },
  paper: {
    borderInlineEnd: `1px solid ${theme.palette.divider}`,
    overflowX: 'hidden',
    width: 48,
  },
  toolbar: theme.mixins.toolbar,
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  withWindowContext,
  connect(mapStateToProps, null),
  withPlugins('WindowSideBar'),
);

export default enhance(WindowSideBar);
