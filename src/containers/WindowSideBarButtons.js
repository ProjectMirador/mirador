import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend';
import * as actions from '../state/actions';
import {
  getCompanionWindowForPosition,
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
<<<<<<< HEAD
  hasAnnotations: getAnnotationResourcesByMotivation(state, { motivations: ['oa:commenting', 'sc:painting'], windowId }).length > 0,
  sideBarPanel: (getCompanionWindowForPosition(state, { position: 'left', windowId }) || {}).content,
=======
  hasAnnotations: getAnnotationResourcesByMotivation(
    getSelectedTargetAnnotations(state, (getSelectedCanvas(state, windowId) || {}).id),
    ['oa:commenting', 'sc:painting'],
  ).length > 0,
  sideBarPanel: (getCompanionWindowForPosition(state, windowId, 'left') || {}).content,
  windowId,
>>>>>>> #2034 refactoring
});

/** */
const style = theme => ({
  tab: {
    '&:active': {
      backgroundColor: theme.palette.action.active,
    },
    '&:hover': {
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
      backgroundColor: theme.palette.action.hover,
      textDecoration: 'none',
      // Reset on touch devices, it doesn't add specificity
    },

    borderRight: '2px solid transparent',
    minWidth: 'auto',
  },
  tabRipple: {
    backgroundColor: theme.palette.action.active,
  },
  tabSelected: {
    borderRight: `2px solid ${theme.palette.secondary.main}`,
  },
  tabsFlexContainer: {
    flexDirection: 'column',
  },
  tabsIndicator: {
    display: 'none',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(style),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowSideBarButtons'),
);

export default enhance(WindowSideBarButtons);
