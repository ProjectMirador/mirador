"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactI18next = require("react-i18next");

var _selectors = require("../state/selectors");

var _WorkspaceOptionsMenu = require("../components/WorkspaceOptionsMenu");

/** Used for connect */
var mapStateToProps = function mapStateToProps(state) {
  return {
    containerId: (0, _selectors.getContainerId)(state)
  };
}; // containerId: getContainerId(state),/


var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(mapStateToProps, null));

var _default = enhance(_WorkspaceOptionsMenu.WorkspaceOptionsMenu);

exports["default"] = _default;