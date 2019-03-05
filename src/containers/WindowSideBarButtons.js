import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import * as actions from '../state/actions';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import {
  getCompanionWindowForPosition,
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
const mapDispatchToProps = (dispatch, { windowId }) => ({
  addCompanionWindow: panelType => dispatch(
    actions.popOutCompanionWindow(windowId, panelType, 'left'),
  ),
  closeCompanionWindow: id => dispatch(
    actions.updateCompanionWindow(windowId, id, { content: 'closed' }),
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
  sideBarPanel: (getCompanionWindowForPosition(state, windowId, 'left') || {}).content,
  sideBarPanelId: (getCompanionWindowForPosition(state, windowId, 'left') || {}).id,
});


const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  miradorWithPlugins,
);

export default enhance(WindowSideBarButtons);
