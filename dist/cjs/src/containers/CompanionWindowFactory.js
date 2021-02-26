"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactI18next = require("react-i18next");

var _withPlugins = require("../extend/withPlugins");

var _selectors = require("../state/selectors");

var _CompanionWindowFactory = require("../components/CompanionWindowFactory");

/**
 * mapStateToProps - to hook up connect
 * @memberof CompanionWindow
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id;
  var companionWindow = (0, _selectors.getCompanionWindow)(state, {
    companionWindowId: id
  });
  return {
    content: companionWindow.content,
    id: id
  };
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(mapStateToProps), (0, _withPlugins.withPlugins)('CompanionWindowFactory'));

var _default = enhance(_CompanionWindowFactory.CompanionWindowFactory);

exports["default"] = _default;