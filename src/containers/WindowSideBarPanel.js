import { connect } from 'react-redux';
import { compose } from 'redux';
import { withNamespaces } from 'react-i18next';
import * as actions from '../state/actions';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import WindowSideBarPanel from '../components/WindowSideBarPanel';

/** */
const mapDispatchToProps = {
  popOutCompanionWindow: actions.popOutCompanionWindow,
};

/** */
const mapStateToProps = (state, { windowId }) => ({
  sideBarPanel: state.windows[windowId].sideBarPanel,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  miradorWithPlugins,
  withNamespaces(),
  // further HOC
)(WindowSideBarPanel);
