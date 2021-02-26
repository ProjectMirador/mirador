"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _core = require("@material-ui/core");

var _reactI18next = require("react-i18next");

var _withPlugins = require("../extend/withPlugins");

var actions = _interopRequireWildcard(require("../state/actions"));

var _MiradorCanvas = _interopRequireDefault(require("../lib/MiradorCanvas"));

var _selectors = require("../state/selectors");

var _WindowSideBarButtons = require("../components/WindowSideBarButtons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    return new _MiradorCanvas["default"](c).imageResources.length > 1;
  });
}
/** */


function hasAnnotations(canvases) {
  return canvases && canvases.some(function (c) {
    var canvas = new _MiradorCanvas["default"](c);
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
    hasAnnotations: (0, _selectors.getAnnotationResourcesByMotivation)(state, {
      windowId: windowId
    }).length > 0,
    hasAnyAnnotations: hasAnnotations((0, _selectors.getCanvases)(state, {
      windowId: windowId
    })),
    hasAnyLayers: hasLayers((0, _selectors.getCanvases)(state, {
      windowId: windowId
    })),
    hasCurrentLayers: hasLayers((0, _selectors.getVisibleCanvases)(state, {
      windowId: windowId
    })),
    hasSearchResults: (0, _selectors.getWindow)(state, {
      windowId: windowId
    }).suggestedSearches || (0, _selectors.getSearchQuery)(state, {
      companionWindowId: ((0, _selectors.getCompanionWindowsForPosition)(state, {
        position: 'left',
        windowId: windowId
      })[0] || {}).id,
      windowId: windowId
    }),
    hasSearchService: (0, _selectors.getManifestSearchService)(state, {
      windowId: windowId
    }) !== null,
    panels: (0, _selectors.getWindowConfig)(state, {
      windowId: windowId
    }).panels,
    sideBarPanel: ((0, _selectors.getCompanionWindowsForPosition)(state, {
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

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _core.withStyles)(style), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('WindowSideBarButtons'));

var _default = enhance(_WindowSideBarButtons.WindowSideBarButtons);

exports["default"] = _default;