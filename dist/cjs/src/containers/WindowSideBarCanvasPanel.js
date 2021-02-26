"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactI18next = require("react-i18next");

var _styles = require("@material-ui/core/styles");

var _withPlugins = require("../extend/withPlugins");

var actions = _interopRequireWildcard(require("../state/actions"));

var _WindowSideBarCanvasPanel = require("../components/WindowSideBarCanvasPanel");

var _selectors = require("../state/selectors");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * mapStateToProps - to hook up connect
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id,
      windowId = _ref.windowId;
  var treeStructure = (0, _selectors.getSequenceTreeStructure)(state, {
    windowId: windowId
  });
  var window = (0, _selectors.getWindow)(state, {
    windowId: windowId
  });
  var config = state.config;
  var companionWindow = (0, _selectors.getCompanionWindow)(state, {
    companionWindowId: id
  });
  var collectionPath = window.collectionPath || [];
  var collectionId = collectionPath && collectionPath[collectionPath.length - 1];
  var sequence = (0, _selectors.getSequence)(state, {
    windowId: windowId
  });
  return {
    collection: collectionId && (0, _selectors.getManifestoInstance)(state, {
      manifestId: collectionId
    }),
    config: config,
    sequenceId: sequence && sequence.id,
    sequences: (0, _selectors.getSequences)(state, {
      windowId: windowId
    }),
    showToc: treeStructure && treeStructure.nodes && treeStructure.nodes.length > 0,
    variant: companionWindow.variant || (0, _selectors.getDefaultSidebarVariant)(state, {
      windowId: windowId
    })
  };
};
/**
 * mapStateToProps - used to hook up connect to state
 * @memberof WindowSideBarCanvasPanel
 * @private
 */


var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var id = _ref2.id,
      windowId = _ref2.windowId;
  return {
    showMultipart: function showMultipart() {
      return dispatch(actions.addOrUpdateCompanionWindow(windowId, {
        content: 'collection',
        position: 'right'
      }));
    },
    updateSequence: function updateSequence(sequenceId) {
      return dispatch(actions.updateWindow(windowId, {
        sequenceId: sequenceId
      }));
    },
    updateVariant: function updateVariant(variant) {
      return dispatch(actions.updateCompanionWindow(windowId, id, {
        variant: variant
      }));
    }
  };
};
/**
 *
 * @param theme
 */


var styles = function styles(theme) {
  return {
    "break": {
      flexBasis: '100%',
      height: 0
    },
    collectionNavigationButton: {
      textTransform: 'none'
    },
    label: {
      paddingLeft: theme.spacing(1)
    },
    select: {
      '&:focus': {
        backgroundColor: theme.palette.background.paper
      }
    },
    selectEmpty: {
      backgroundColor: theme.palette.background.paper
    },
    variantTab: {
      minWidth: 'auto'
    }
  };
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _styles.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('WindowSideBarCanvasPanel'));

var _default = enhance(_WindowSideBarCanvasPanel.WindowSideBarCanvasPanel);

exports["default"] = _default;