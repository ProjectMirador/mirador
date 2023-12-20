import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import MiradorCanvas from '../lib/MiradorCanvas';
import {
  getCanvases,
  getVisibleCanvases,
  getCompanionWindowsForPosition,
  getAnnotationResourcesByMotivation,
  getManifestSearchService,
  getSearchQuery,
  getWindow,
  getWindowConfig,
} from '../state/selectors';
import { WindowSideBarButtons } from '../components/WindowSideBarButtons';
import { withWindowContext } from '../contexts/WindowContext';

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

/** */
function hasLayers(canvases) {
  return canvases && canvases.some(c => new MiradorCanvas(c).imageResources.length > 1);
}

/** */
function hasAnnotations(canvases) {
  return canvases && canvases.some(c => {
    const canvas = new MiradorCanvas(c);

    return canvas.annotationListUris.length > 0
      || canvas.canvasAnnotationPages.length > 0;
  });
}

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof WindowSideButtons
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  hasAnnotations: getAnnotationResourcesByMotivation(
    state,
    { windowId },
  ).length > 0,
  hasAnyAnnotations: hasAnnotations(getCanvases(state, { windowId })),
  hasAnyLayers: hasLayers(getCanvases(state, { windowId })),
  hasCurrentLayers: hasLayers(getVisibleCanvases(state, { windowId })),
  hasSearchResults: getWindow(state, { windowId }).suggestedSearches || getSearchQuery(state, {
    companionWindowId: (getCompanionWindowsForPosition(state, { position: 'left', windowId })[0] || {}).id,
    windowId,
  }),
  hasSearchService: getManifestSearchService(state, { windowId }) !== null,
  panels: getWindowConfig(state, { windowId }).panels,
  sideBarPanel: ((getCompanionWindowsForPosition(state, { position: 'left', windowId }))[0] || {}).content,
});

/** */
const style = theme => ({
  badge: {
    backgroundColor: theme.palette.notification?.main,
  },
  tab: {
    '&:active': {
      backgroundColor: theme.palette.action?.active,
    },
    '&:focus': {
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
      backgroundColor: theme.palette.action?.hover,
      textDecoration: 'none',
      // Reset on touch devices, it doesn't add specificity
    },
    '&:hover': {
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
      backgroundColor: theme.palette.action?.hover,
      textDecoration: 'none',
      // Reset on touch devices, it doesn't add specificity
    },

    borderRight: '2px solid transparent',
    minWidth: 'auto',
  },
  tabSelected: {
    borderRight: `2px solid ${theme.palette.primary?.main}`,
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
  withWindowContext,
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowSideBarButtons'),
);

export default enhance(WindowSideBarButtons);
