import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
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
});


/**
 * mapStateToProps - used to hook up connect to state
 * @memberof WindowSideButtons
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  hasAnnotations: getAnnotationResourcesByMotivation(
    getSelectedCanvasAnnotations(state, (getSelectedCanvas(state, windowId) || {}).id),
    ['oa:commenting', 'sc:painting'],
  ).length > 0,
  sideBarPanel: (getCompanionWindowForPosition(state, windowId, 'left') || {}).content,
});

/** */
const style = theme => ({
  tabsFlexContainer: {
    flexDirection: 'column',
  },
  tabsIndicator: {
    display: 'none',
  },
  tab: {
    minWidth: 'auto',
    borderRight: '4px solid transparent',
  },
  tabSelected: {
    backgroundColor: theme.palette.secondary.light,
    borderRight: `4px solid ${theme.palette.secondary.main}`,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(style),
  connect(mapStateToProps, mapDispatchToProps),
  miradorWithPlugins,
);

export default enhance(WindowSideBarButtons);
