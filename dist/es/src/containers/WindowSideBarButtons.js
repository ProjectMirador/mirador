import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import MiradorCanvas from '../lib/MiradorCanvas';
import { getCanvases, getVisibleCanvases, getCompanionWindowsForPosition, getAnnotationResourcesByMotivation, getManifestSearchService, getSearchQuery, getWindow, getWindowConfig } from '../state/selectors';
import { WindowSideBarButtons } from '../components/WindowSideBarButtons';
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WindowSideButtons
 * @private
 */

var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref) {
  var windowId = _ref.windowId;
  return {
    addCompanionWindow: function addCompanionWindow(content) {
      return dispatch(actions.addOrUpdateCompanionWindow(windowId, {
        content: content,
        position: 'left'
      }));
    }
  };
};
/** */


function hasLayers(canvases) {
  return canvases && canvases.some(function (c) {
    return new MiradorCanvas(c).imageResources.length > 1;
  });
}
/** */


function hasAnnotations(canvases) {
  return canvases && canvases.some(function (c) {
    var canvas = new MiradorCanvas(c);
    return canvas.annotationListUris.length > 0 || canvas.canvasAnnotationPages.length > 0;
  });
}
/**
 * mapStateToProps - used to hook up connect to state
 * @memberof WindowSideButtons
 * @private
 */


var mapStateToProps = function mapStateToProps(state, _ref2) {
  var windowId = _ref2.windowId;
  return {
    hasAnnotations: getAnnotationResourcesByMotivation(state, {
      windowId: windowId
    }).length > 0,
    hasAnyAnnotations: hasAnnotations(getCanvases(state, {
      windowId: windowId
    })),
    hasAnyLayers: hasLayers(getCanvases(state, {
      windowId: windowId
    })),
    hasCurrentLayers: hasLayers(getVisibleCanvases(state, {
      windowId: windowId
    })),
    hasSearchResults: getWindow(state, {
      windowId: windowId
    }).suggestedSearches || getSearchQuery(state, {
      companionWindowId: (getCompanionWindowsForPosition(state, {
        position: 'left',
        windowId: windowId
      })[0] || {}).id,
      windowId: windowId
    }),
    hasSearchService: getManifestSearchService(state, {
      windowId: windowId
    }) !== null,
    panels: getWindowConfig(state, {
      windowId: windowId
    }).panels,
    sideBarPanel: (getCompanionWindowsForPosition(state, {
      position: 'left',
      windowId: windowId
    })[0] || {}).content
  };
};
/** */


var style = function style(theme) {
  return {
    badge: {
      backgroundColor: theme.palette.notification.main
    },
    tab: {
      '&:active': {
        backgroundColor: theme.palette.action.active
      },
      '&:focus': {
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        },
        backgroundColor: theme.palette.action.hover,
        textDecoration: 'none' // Reset on touch devices, it doesn't add specificity

      },
      '&:hover': {
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        },
        backgroundColor: theme.palette.action.hover,
        textDecoration: 'none' // Reset on touch devices, it doesn't add specificity

      },
      borderRight: '2px solid transparent',
      minWidth: 'auto'
    },
    tabSelected: {
      borderRight: "2px solid ".concat(theme.palette.primary.main)
    },
    tabsFlexContainer: {
      flexDirection: 'column'
    },
    tabsIndicator: {
      display: 'none'
    }
  };
};

var enhance = compose(withTranslation(), withStyles(style), connect(mapStateToProps, mapDispatchToProps), withPlugins('WindowSideBarButtons'));
export default enhance(WindowSideBarButtons);