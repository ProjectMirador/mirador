"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactI18next = require("react-i18next");

var _styles = require("@material-ui/core/styles");

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

var _withPlugins = require("../extend/withPlugins");

var _WindowAuthenticationBar = require("../components/WindowAuthenticationBar");

/**
 * @param theme
 * @returns {{typographyBody: {flexGrow: number, fontSize: number|string},
 * windowTopBarStyle: {minHeight: number, paddingLeft: number, backgroundColor: string}}}
 */
var styles = function styles(theme) {
  return {
    buttonInvert: {
      '&:hover': {
        backgroundColor: (0, _colorManipulator.fade)(theme.palette.secondary.contrastText, 1 - theme.palette.action.hoverOpacity)
      },
      backgroundColor: theme.palette.secondary.contrastText,
      marginLeft: theme.spacing(5),
      paddingBottom: 0,
      paddingTop: 0
    },
    expanded: {
      paddingLeft: theme.spacing(),
      paddingRight: theme.spacing()
    },
    failure: {
      backgroundColor: theme.palette.error.dark
    },
    fauxButton: {
      marginLeft: theme.spacing(2.5)
    },
    icon: {
      marginRight: theme.spacing(1.5),
      verticalAlign: 'text-bottom'
    },
    label: {
      lineHeight: 2.25
    },
    paper: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      cursor: 'pointer'
    },
    topBar: {
      '&:hover': {
        backgroundColor: theme.palette.secondary.main
      },
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'inherit',
      padding: theme.spacing(1),
      textTransform: 'none'
    }
  };
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _styles.withStyles)(styles), (0, _withPlugins.withPlugins)('WindowAuthenticationBar'));

var _default = enhance(_WindowAuthenticationBar.WindowAuthenticationBar);

exports["default"] = _default;