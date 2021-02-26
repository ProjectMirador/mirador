"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _core = require("@material-ui/core");

var actions = _interopRequireWildcard(require("../state/actions"));

var _WorkspaceElasticWindow = _interopRequireDefault(require("../components/WorkspaceElasticWindow"));

var _selectors = require("../state/selectors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    companionWindowDimensions: (0, _selectors.selectCompanionWindowDimensions)(state, {
      windowId: windowId
    }),
    focused: (0, _selectors.isFocused)(state, {
      windowId: windowId
    }),
    layout: (0, _selectors.getElasticLayout)(state)[windowId],
    workspace: (0, _selectors.getWorkspace)(state)
  };
};
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */


var mapDispatchToProps = function mapDispatchToProps(dispatch, props) {
  return {
    updateElasticWindowLayout: function updateElasticWindowLayout(windowId, position) {
      dispatch(actions.updateElasticWindowLayout(windowId, position));
    }
  };
};
/**
 * @param theme
 */


var styles = function styles(theme) {
  return {
    focused: {
      zIndex: theme.zIndex.modal - 1
    }
  };
};

var enhance = (0, _redux.compose)((0, _core.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps) // further HOC go here
);

var _default = enhance(_WorkspaceElasticWindow["default"]);

exports["default"] = _default;