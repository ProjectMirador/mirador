import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withTranslation } from 'react-i18next';
import * as actions from '../state/actions';
import {
  getCompanionWindowForPosition,
  getSelectedCanvas,
  getSelectedTargetAnnotations,
  getAnnotationResourcesByMotivation,
} from '../state/selectors';
import { WindowSideBarButtons } from '../components/WindowSideBarButtons';


/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WindowSideButtons
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  addCompanionWindow: content => dispatch(
    actions.addCompanionWindow(windowId, { content, position: 'left' }),
  ),
});


/**
 * mapStateToProps - used to hook up connect to state
 * @memberof WindowSideButtons
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  hasAnnotations: getAnnotationResourcesByMotivation(
    getSelectedTargetAnnotations(state, (getSelectedCanvas(state, windowId) || {}).id),
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
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: fade(theme.palette.text.primary, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  tabSelected: {
    backgroundColor: theme.palette.secondary.light,
    borderRight: `4px solid ${theme.palette.secondary.main}`,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(style),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(WindowSideBarButtons);
