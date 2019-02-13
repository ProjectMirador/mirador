import { connect } from 'react-redux';
import { compose } from 'redux';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import WindowSideBarPanel from '../components/WindowSideBarPanel';

/** */
const mapStateToProps = (state, { windowId }) => ({
  sideBarPanel: state.windows[windowId].sideBarPanel,
});

export default compose(
  connect(mapStateToProps, null),
  miradorWithPlugins,
  // further HOC
)(WindowSideBarPanel);
