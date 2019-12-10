import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import {
  getCompanionWindowsForPosition,
  getAnnotationResourcesByMotivation,
  getManifestSearchService,
  getSearchQuery,
  getWindow,
} from '../state/selectors';
import { WindowSideBarButtons } from '../components/WindowSideBarButtons';


/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WindowSideButtons
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  addCompanionWindow: content => dispatch(
    actions.addOrUpdateCompanionWindow(windowId, { content, position: 'left' }),
  ),
});


/**
 * mapStateToProps - used to hook up connect to state
 * @memberof WindowSideButtons
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  hasAnnotations: getAnnotationResourcesByMotivation(state, { motivations: ['oa:commenting', 'sc:painting', 'commenting'], windowId }).length > 0,
  hasSearchResults: getWindow(state, { windowId }).suggestedSearches || getSearchQuery(state, {
    companionWindowId: (getCompanionWindowsForPosition(state, { position: 'left', windowId })[0] || {}).id,
    windowId,
  }),
  hasSearchService: getManifestSearchService(state, { windowId }) !== null,
  panels: state.config.window.panels,
  sideBarPanel: ((getCompanionWindowsForPosition(state, { position: 'left', windowId }))[0] || {}).content,
});

/** */
const style = theme => ({
  badge: {
    backgroundColor: theme.palette.notification.main,
  },
  tab: {
    '&:active': {
      backgroundColor: theme.palette.action.active,
    },
    '&:focus': {
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
      backgroundColor: theme.palette.action.hover,
      textDecoration: 'none',
      // Reset on touch devices, it doesn't add specificity
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
  tabSelected: {
    borderRight: `2px solid ${theme.palette.primary.main}`,
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
