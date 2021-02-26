"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactI18next = require("react-i18next");

var _styles = require("@material-ui/core/styles");

var actions = _interopRequireWildcard(require("../state/actions"));

var _withPlugins = require("../extend/withPlugins");

var _selectors = require("../state/selectors");

var _SelectCollection = require("../components/SelectCollection");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;

  var _ref2 = (0, _selectors.getWindow)(state, {
    windowId: windowId
  }) || {},
      collectionPath = _ref2.collectionPath,
      manifestId = _ref2.manifestId;

  return {
    collectionPath: collectionPath,
    manifestId: manifestId
  };
};

var mapDispatchToProps = {
  showCollectionDialog: actions.showCollectionDialog
};
/** */

var styles = function styles(theme) {
  return {};
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _styles.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('SelectCollection'));

var _default = enhance(_SelectCollection.SelectCollection);

exports["default"] = _default;