"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactI18next = require("react-i18next");

var _styles = require("@material-ui/core/styles");

var _withPlugins = require("../extend/withPlugins");

var _IIIFThumbnail = require("../components/IIIFThumbnail");

/**
 * Styles for withStyles HOC
 */
var styles = function styles(theme) {
  return {
    caption: {
      lineHeight: '1.5em',
      wordBreak: 'break-word'
    },
    image: {},
    insideCaption: {
      color: '#ffffff',
      lineClamp: '1',
      whiteSpace: 'nowrap'
    },
    insideLabel: {
      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
      bottom: '5px',
      boxSizing: 'border-box',
      left: '0px',
      padding: '4px',
      position: 'absolute',
      width: '100%'
    },
    insideRoot: {
      display: 'inline-block',
      height: 'inherit',
      position: 'relative'
    },
    label: {
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    outsideCaption: {
      boxOrient: 'vertical',
      display: '-webkit-box',
      lineClamp: '2',
      maxHeight: '3em'
    },
    outsideLabel: {},
    outsideRoot: {},
    root: {}
  };
};

var enhance = (0, _redux.compose)((0, _styles.withStyles)(styles), (0, _reactI18next.withTranslation)(), (0, _withPlugins.withPlugins)('IIIFThumbnail'));

var _default = enhance(_IIIFThumbnail.IIIFThumbnail);

exports["default"] = _default;