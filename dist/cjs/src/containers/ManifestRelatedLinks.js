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

var _selectors = require("../state/selectors");

var _ManifestRelatedLinks = require("../components/ManifestRelatedLinks");

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id,
      windowId = _ref.windowId;
  return {
    homepage: (0, _selectors.getManifestHomepage)(state, {
      windowId: windowId
    }),
    manifestUrl: (0, _selectors.getManifestUrl)(state, {
      windowId: windowId
    }),
    renderings: (0, _selectors.getManifestRenderings)(state, {
      windowId: windowId
    }),
    seeAlso: (0, _selectors.getManifestRelatedContent)(state, {
      windowId: windowId
    })
  };
};

var styles = {
  labelValueMetadata: {
    '& dd': {
      marginBottom: '.5em',
      marginLeft: '0'
    }
  }
};
var enhance = (0, _redux.compose)((0, _styles.withStyles)(styles), (0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(mapStateToProps), (0, _withPlugins.withPlugins)('ManifestRelatedLinks'));

var _default = enhance(_ManifestRelatedLinks.ManifestRelatedLinks);

exports["default"] = _default;