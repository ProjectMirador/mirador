"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactI18next = require("react-i18next");

var _styles = require("@material-ui/core/styles");

var _CollapsibleSection = require("../components/CollapsibleSection");

var styles = {
  button: {
    padding: 0
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  heading: {
    cursor: 'pointer'
  }
};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _styles.withStyles)(styles));

var _default = enhance(_CollapsibleSection.CollapsibleSection);

exports["default"] = _default;