"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactI18next = require("react-i18next");

var _core = require("@material-ui/core");

var _withPlugins = require("../extend/withPlugins");

var _WorkspaceSelectionDialog = require("../components/WorkspaceSelectionDialog");

var actions = _interopRequireWildcard(require("../state/actions"));

var _selectors = require("../state/selectors");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
var mapDispatchToProps = {
  updateWorkspace: actions.updateWorkspace
};
/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */

var mapStateToProps = function mapStateToProps(state) {
  return {
    workspaceType: (0, _selectors.getWorkspaceType)(state)
  };
};
/** */


var styles = function styles(theme) {
  return {
    card: {
      backgroundColor: 'transparent',
      borderRadius: '0',
      boxShadow: '0 0 transparent',
      display: 'flex'
    },
    content: {
      flex: '1 0 auto'
    },
    details: {
      display: 'flex',
      flexDirection: 'column'
    },
    headline: {
      paddingBottom: '6px'
    },
    list: {
      '&active': {
        outline: 'none'
      },
      '&focus': {
        outline: 'none'
      },
      outline: 'none'
    },
    media: {
      flex: '0 0 120px',
      height: '90px'
    },
    menuItem: {
      height: 'auto',
      overflow: 'auto',
      whiteSpace: 'inherit'
    },
    root: {
      '&:last-child': {
        paddingBottom: '12px'
      },
      paddingBottom: 0,
      paddingTop: 0,
      textAlign: 'left'
    },
    svgIcon: {
      flexShrink: 0,
      height: '90px',
      width: '120px'
    }
  };
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _core.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('WorkspaceSelectionDialog'));

var _default = enhance(_WorkspaceSelectionDialog.WorkspaceSelectionDialog);

exports["default"] = _default;