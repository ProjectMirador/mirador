import { connect } from 'react-redux';
import { compose } from 'redux';
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

const enhance = compose(
  withWindowContext,
  connect(mapStateToProps, null),
  withPlugins('WindowSideBar'),
);

export default enhance(WindowSideBar);
