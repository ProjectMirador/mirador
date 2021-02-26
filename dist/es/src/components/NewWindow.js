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

import { Component } from 'react';

/**
 * Opens a new window for click
 */
export var NewWindow = /*#__PURE__*/function (_Component) {
  _inherits(NewWindow, _Component);

  var _super = _createSuper(NewWindow);

  /** */
  function NewWindow(props) {
    var _this;

    _classCallCheck(this, NewWindow);

    _this = _super.call(this, props);
    _this.released = undefined;
    _this.window = null;
    _this.checkIfWindowClosed = null;
    return _this;
  }
  /** */


  _createClass(NewWindow, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.openWindow();
    }
    /**
     * Close the opened window we unmount
     */

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.window) {
        this.window.close();
      }
    }
    /** @private */

  }, {
    key: "onClose",
    value: function onClose() {
      var _this$props = this.props,
          onClose = _this$props.onClose,
          url = _this$props.url;
      if (this.released) return;
      this.released = true;
      clearInterval(this.checkIfWindowClosed);
      onClose(url);
    }
    /** */

  }, {
    key: "openWindow",
    value: function openWindow() {
      var _this2 = this;

      var _this$props2 = this.props,
          depWindow = _this$props2.depWindow,
          features = _this$props2.features,
          name = _this$props2.name,
          url = _this$props2.url;
      this.window = (depWindow || window).open(url, name, features);
      this.released = false;
      this.checkIfWindowClosed = setInterval(function () {
        if (!_this2.window || _this2.window.closed) {
          _this2.onClose();
        }
      }, 250);
    }
    /** */

  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return NewWindow;
}(Component);
NewWindow.defaultProps = {
  depWindow: undefined,
  features: undefined,
  name: undefined
};