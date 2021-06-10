"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactI18next = require("react-i18next");

var _styles = require("@material-ui/core/styles");

var _LocalePicker = require("../components/LocalePicker");

/**
 *
 * @param theme
 * @returns {label: {paddingLeft: number}}}
 */
var styles = function styles(theme) {
  return {
    select: {
      '&:focus': {
        backgroundColor: theme.palette.background.paper
      }
    },
    selectEmpty: {
      backgroundColor: theme.palette.background.paper
    }
  };
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _styles.withStyles)(styles));

var _default = enhance(_LocalePicker.LocalePicker);

exports["default"] = _default;