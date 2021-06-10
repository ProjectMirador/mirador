import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { WindowSideBar } from '../components/WindowSideBar';
import { getThemeDirection, getWindow } from '../state/selectors';
/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBar
 * @private
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    direction: getThemeDirection(state),
    sideBarOpen: (getWindow(state, {
      windowId: windowId
    }) || {}).sideBarOpen,
    sideBarPanel: (getWindow(state, {
      windowId: windowId
    }) || {}).sideBarPanel
  };
};
/**
 *
 * @param theme
 * @returns {{toolbar: CSSProperties | toolbar | {minHeight}, grow: {flexGrow: number},
 * drawer: {overflowX: string, left: number, flexShrink: number, width: number, height: string}}}
 */


var styles = function styles(theme) {
  return {
    drawer: {
      flexShrink: 0,
      height: '100%',
      order: -1000,
      zIndex: theme.zIndex.appBar - 1
    },
    grow: {
      flexGrow: 1
    },
    paper: {
      borderInlineEnd: "1px solid ".concat(theme.palette.divider),
      overflowX: 'hidden',
      width: 48
    },
    toolbar: theme.mixins.toolbar
  };
};

var enhance = compose(withStyles(styles), withTranslation(), connect(mapStateToProps, null), withPlugins('WindowSideBar'));
export default enhance(WindowSideBar);