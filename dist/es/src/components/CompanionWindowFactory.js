function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import React, { Component } from 'react';
import CompanionWindowRegistry from '../lib/CompanionWindowRegistry';
import CompanionWindow from '../containers/CompanionWindow';
import ErrorContent from '../containers/ErrorContent';
/**
 * Render a companion window using the appropriate component for the content
 */

export var CompanionWindowFactory = /*#__PURE__*/function (_Component) {
  _inherits(CompanionWindowFactory, _Component);

  var _super = _createSuper(CompanionWindowFactory);

  /** */
  function CompanionWindowFactory(props) {
    var _this;

    _classCallCheck(this, CompanionWindowFactory);

    _this = _super.call(this, props);
    _this.state = {};
    return _this;
  }
  /** */


  _createClass(CompanionWindowFactory, [{
    key: "componentDidUpdate",
    value:
    /**
     * Clear the error state if the internal content changes; this is a rare
     * case, only when we reuse an existing companionWindow instance for
     * the left-anchored companion area (anti-pattern?)
     */
    function componentDidUpdate(prevProps) {
      var content = this.props.content; // Typical usage (don't forget to compare props):

      if (content !== prevProps.content) {
        this.setState({
          // eslint-disable-line react/no-did-update-set-state
          error: null,
          hasError: false
        });
      }
    }
    /** */

  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          content = _this$props.content,
          windowId = _this$props.windowId,
          id = _this$props.id,
          t = _this$props.t;
      var _this$state = this.state,
          error = _this$state.error,
          hasError = _this$state.hasError;

      if (hasError) {
        return /*#__PURE__*/React.createElement(CompanionWindow, {
          title: t('error'),
          windowId: windowId,
          id: id
        }, /*#__PURE__*/React.createElement(ErrorContent, {
          error: error,
          windowId: windowId,
          companionWindowId: id
        }));
      }

      var type = CompanionWindowRegistry[content];
      if (!type) return /*#__PURE__*/React.createElement(React.Fragment, null);
      return /*#__PURE__*/React.createElement(type, {
        id: id,
        windowId: windowId
      });
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return {
        error: error,
        hasError: true
      };
    }
  }]);

  return CompanionWindowFactory;
}(Component);
CompanionWindowFactory.defaultProps = {
  content: null,
  t: function t(key) {
    return key;
  }
};