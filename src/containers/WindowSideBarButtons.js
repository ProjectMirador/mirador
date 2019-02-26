import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import * as actions from '../state/actions';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import { WindowSideBarButtons } from '../components/WindowSideBarButtons';


/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WindowSideButtons
 * @private
 */
const mapDispatchToProps = (dispatch, props) => ({
  toggleWindowSideBarPanel: panelType => dispatch(
    actions.toggleWindowSideBarPanel(props.windowId, panelType),
  ),
});


/**
 * mapStateToProps - used to hook up connect to state
 * @memberof WindowSideButtons
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  sideBarPanel: state.windows[windowId].sideBarPanel,
});


const enhance = compose(
  withNamespaces(),
  connect(mapStateToProps, mapDispatchToProps),
  miradorWithPlugins,
);

export default enhance(WindowSideBarButtons);
