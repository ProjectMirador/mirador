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

var _SidebarIndexThumbnail = require("../components/SidebarIndexThumbnail");

var _selectors = require("../state/selectors");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * mapStateToProps - used to hook up state to props
 * @memberof SidebarIndexThumbnail
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var data = _ref.data;
  return _objectSpread({}, (0, _selectors.getConfig)(state).canvasNavigation || {});
};
/**
 * Styles for withStyles HOC
 */


var styles = function styles(theme) {
  return {
    label: {
      paddingLeft: theme.spacing(1)
    }
  };
};

var enhance = (0, _redux.compose)((0, _styles.withStyles)(styles), (0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(mapStateToProps, null), (0, _withPlugins.withPlugins)('SidebarIndexThumbnail'));

var _default = enhance(_SidebarIndexThumbnail.SidebarIndexThumbnail);

exports["default"] = _default;