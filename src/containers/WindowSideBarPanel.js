import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import * as actions from '../state/actions';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import { WindowSideBarPanel } from '../components/WindowSideBarPanel';

/** */
const mapDispatchToProps = {
  popOutCompanionWindow: actions.popOutCompanionWindow,
};

/** */
const mapStateToProps = (state, { windowId }) => ({
  sideBarPanel: state.windows[windowId].sideBarPanel,
});

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  miradorWithPlugins,
)(WindowSideBarPanel);
