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

var _ManifestInfo = require("../components/ManifestInfo");

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id,
      manifestId = _ref.manifestId,
      windowId = _ref.windowId;
  return {
    manifestDescription: (0, _selectors.getManifestDescription)(state, {
      companionWindowId: id,
      manifestId: manifestId,
      windowId: windowId
    }),
    manifestLabel: (0, _selectors.getManifestTitle)(state, {
      companionWindowId: id,
      manifestId: manifestId,
      windowId: windowId
    }),
    manifestMetadata: (0, _selectors.getManifestMetadata)(state, {
      companionWindowId: id,
      manifestId: manifestId,
      windowId: windowId
    })
  };
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(mapStateToProps), (0, _withPlugins.withPlugins)('ManifestInfo'));

var _default = enhance(_ManifestInfo.ManifestInfo);

exports["default"] = _default;