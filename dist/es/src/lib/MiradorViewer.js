function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import deepmerge from 'deepmerge';
import HotApp from '../components/App';
import createStore from '../state/createStore';
import { importConfig } from '../state/actions/config';
import { filterValidPlugins, getConfigFromPlugins, getReducersFromPlugins, getSagasFromPlugins } from '../extend/pluginPreprocessing';
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
    this.plugins = filterValidPlugins(viewerConfig.plugins || []);
    this.store = viewerConfig.store || createStore(getReducersFromPlugins(this.plugins), getSagasFromPlugins(this.plugins));
    this.processConfig();
    ReactDOM.render( /*#__PURE__*/React.createElement(Provider, {
      store: this.store
    }, /*#__PURE__*/React.createElement(HotApp, {
      plugins: this.plugins
    })), document.getElementById(config.id));
  }
  /**
   * Process config with plugin configs into actions
   */


  _createClass(MiradorViewer, [{
    key: "processConfig",
    value: function processConfig() {
      this.store.dispatch(importConfig(deepmerge(getConfigFromPlugins(this.plugins), this.config)));
    }
    /**
     * Cleanup method to unmount Mirador from the dom
     */

  }, {
    key: "unmount",
    value: function unmount() {
      ReactDOM.unmountComponentAtNode(document.getElementById(this.config.id));
    }
  }]);

  return MiradorViewer;
}();

export default MiradorViewer;