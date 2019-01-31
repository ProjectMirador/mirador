import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../state/actions';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import WindowSideBarButtons from '../components/WindowSideBarButtons';


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

const enhance = compose(
  connect(null, mapDispatchToProps),
  miradorWithPlugins,
  // further HOC go here
);

export default enhance(WindowSideBarButtons);
