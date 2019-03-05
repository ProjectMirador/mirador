import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import * as actions from '../state/actions';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import {
  getSelectedCanvas,
  getSelectedCanvasAnnotations,
  getAnnotationResourcesByMotivation,
} from '../state/selectors';
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
  hasAnnotations: getAnnotationResourcesByMotivation(
    getSelectedCanvasAnnotations(state, getSelectedCanvas(state, windowId).id),
    ['oa:commenting', 'sc:painting'],
  ).length > 0,
  sideBarPanel: state.windows[windowId].sideBarPanel,
});


const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  miradorWithPlugins,
);

export default enhance(WindowSideBarButtons);
