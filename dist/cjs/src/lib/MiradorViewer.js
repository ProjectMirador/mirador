"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRedux = require("react-redux");

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _App = _interopRequireDefault(require("../components/App"));

var _createStore = _interopRequireDefault(require("../state/createStore"));

var _config = require("../state/actions/config");

var _pluginPreprocessing = require("../extend/pluginPreprocessing");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Default Mirador instantiation
 */
var MiradorViewer = /*#__PURE__*/function () {
  /**
   */
  function MiradorViewer(config) {
    var viewerConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MiradorViewer);

    this.config = config;
    this.plugins = (0, _pluginPreprocessing.filterValidPlugins)(viewerConfig.plugins || []);
    this.store = viewerConfig.store || (0, _createStore["default"])((0, _pluginPreprocessing.getReducersFromPlugins)(this.plugins), (0, _pluginPreprocessing.getSagasFromPlugins)(this.plugins));
    this.processConfig();

    _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
      store: this.store
    }, /*#__PURE__*/_react["default"].createElement(_App["default"], {
      plugins: this.plugins
    })), document.getElementById(config.id));
  }
  /**
   * Process config with plugin configs into actions
   */


  _createClass(MiradorViewer, [{
    key: "processConfig",
    value: function processConfig() {
      this.store.dispatch((0, _config.importConfig)((0, _deepmerge["default"])((0, _pluginPreprocessing.getConfigFromPlugins)(this.plugins), this.config)));
    }
    /**
     * Cleanup method to unmount Mirador from the dom
     */

  }, {
    key: "unmount",
    value: function unmount() {
      _reactDom["default"].unmountComponentAtNode(document.getElementById(this.config.id));
    }
  }]);

  return MiradorViewer;
}();

var _default = MiradorViewer;
exports["default"] = _default;