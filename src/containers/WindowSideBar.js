import { connect } from 'react-redux';
import { compose } from 'redux';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import WindowSideBar from '../components/WindowSideBar';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBar
 * @private
 */
const mapStateToProps = (state, props) => (
  {
    sideBarOpen: state.windows[props.windowId].sideBarOpen,
    sideBarPanel: state.windows[props.windowId].sideBarPanel,
  }
);

const enhance = compose(
  connect(mapStateToProps, null),
  miradorWithPlugins,
  // further HOC
);

export default enhance(WindowSideBar);
