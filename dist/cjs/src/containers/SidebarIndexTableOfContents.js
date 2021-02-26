"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactI18next = require("react-i18next");

var _styles = require("@material-ui/core/styles");

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

var _withPlugins = require("../extend/withPlugins");

var _SidebarIndexTableOfContents = require("../components/SidebarIndexTableOfContents");

var _selectors = require("../state/selectors");

var actions = _interopRequireWildcard(require("../state/actions"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * mapStateToProps - to hook up connect
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id,
      windowId = _ref.windowId;
  return {
    expandedNodeIds: (0, _selectors.getExpandedNodeIds)(state, {
      companionWindowId: id,
      windowId: windowId
    }),
    nodeIdToScrollTo: (0, _selectors.getNodeIdToScrollTo)(state, {
      companionWindowId: id,
      windowId: windowId
    }),
    treeStructure: (0, _selectors.getSequenceTreeStructure)(state, {
      windowId: windowId
    }),
    visibleNodeIds: (0, _selectors.getVisibleNodeIds)(state, {
      companionWindowId: id,
      windowId: windowId
    })
  };
};
/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SidebarIndexTableOfContents
 * @private
 */


var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var id = _ref2.id,
      windowId = _ref2.windowId;
  return {
    setCanvas: function setCanvas() {
      return dispatch(actions.setCanvas.apply(actions, arguments));
    },
    toggleNode: function toggleNode(nodeId) {
      return dispatch(actions.toggleNode(windowId, id, nodeId));
    }
  };
};
/**
 * Styles for withStyles HOC
 */


var styles = function styles(theme) {
  return {
    content: {
      alignItems: 'flex-start',
      borderLeft: '1px solid transparent',
      padding: '8px 16px 8px 0',
      width: 'auto'
    },
    group: {
      borderLeft: "1px solid ".concat(theme.palette.grey[300])
    },
    label: {
      paddingLeft: 0
    },
    // needed for pseudo $label class
    root: {
      flexGrow: 1
    },
    selected: {},
    // needed for pseudo $selected class
    treeItemRoot: {
      '&:focus > $content': {
        backgroundColor: theme.palette.action.selected
      },
      '&:hover > $content': {
        backgroundColor: theme.palette.action.hover
      },
      '&:hover >$content $label, &:focus > $content $label, &$selected > $content $label, &$selected > $content $label:hover, &$selected:focus > $content $label': {
        backgroundColor: 'transparent'
      }
    },
    visibleNode: {
      backgroundColor: (0, _colorManipulator.fade)(theme.palette.highlights.primary, 0.35),
      display: 'inline'
    }
  };
};

var enhance = (0, _redux.compose)((0, _styles.withStyles)(styles), (0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('SidebarIndexTableOfContents'));

var _default = enhance(_SidebarIndexTableOfContents.SidebarIndexTableOfContents);

exports["default"] = _default;