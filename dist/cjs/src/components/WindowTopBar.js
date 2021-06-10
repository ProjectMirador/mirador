"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowTopBar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _MenuSharp = _interopRequireDefault(require("@material-ui/icons/MenuSharp"));

var _CloseSharp = _interopRequireDefault(require("@material-ui/icons/CloseSharp"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _classnames = _interopRequireDefault(require("classnames"));

var _WindowTopMenuButton = _interopRequireDefault(require("../containers/WindowTopMenuButton"));

var _WindowTopBarPluginArea = _interopRequireDefault(require("../containers/WindowTopBarPluginArea"));

var _WindowTopBarPluginMenu = _interopRequireDefault(require("../containers/WindowTopBarPluginMenu"));

var _WindowTopBarTitle = _interopRequireDefault(require("../containers/WindowTopBarTitle"));

var _MiradorMenuButton = _interopRequireDefault(require("../containers/MiradorMenuButton"));

var _FullScreenButton = _interopRequireDefault(require("../containers/FullScreenButton"));

var _WindowMaxIcon = _interopRequireDefault(require("./icons/WindowMaxIcon"));

var _WindowMinIcon = _interopRequireDefault(require("./icons/WindowMinIcon"));

var _cssNs = _interopRequireDefault(require("../config/css-ns"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

/**
 * WindowTopBar
 */
var WindowTopBar = /*#__PURE__*/function (_Component) {
  _inherits(WindowTopBar, _Component);

  var _super = _createSuper(WindowTopBar);

  function WindowTopBar() {
    _classCallCheck(this, WindowTopBar);

    return _super.apply(this, arguments);
  }

  _createClass(WindowTopBar, [{
    key: "render",
    value:
    /**
     * render
     * @return
     */
    function render() {
      var _this$props = this.props,
          removeWindow = _this$props.removeWindow,
          windowId = _this$props.windowId,
          classes = _this$props.classes,
          toggleWindowSideBar = _this$props.toggleWindowSideBar,
          t = _this$props.t,
          windowDraggable = _this$props.windowDraggable,
          maximizeWindow = _this$props.maximizeWindow,
          maximized = _this$props.maximized,
          minimizeWindow = _this$props.minimizeWindow,
          focused = _this$props.focused,
          allowClose = _this$props.allowClose,
          allowMaximize = _this$props.allowMaximize,
          focusWindow = _this$props.focusWindow,
          allowFullscreen = _this$props.allowFullscreen,
          allowTopMenuButton = _this$props.allowTopMenuButton,
          allowWindowSideBar = _this$props.allowWindowSideBar;
      return /*#__PURE__*/_react["default"].createElement(_AppBar["default"], {
        position: "relative",
        color: "default"
      }, /*#__PURE__*/_react["default"].createElement("nav", {
        "aria-label": t('windowNavigation')
      }, /*#__PURE__*/_react["default"].createElement(_Toolbar["default"], {
        disableGutters: true,
        onMouseDown: focusWindow,
        className: (0, _classnames["default"])(classes.windowTopBarStyle, windowDraggable ? classes.windowTopBarStyleDraggable : null, focused ? classes.focused : null, (0, _cssNs["default"])('window-top-bar')),
        variant: "dense"
      }, allowWindowSideBar && /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-label": t('toggleWindowSideBar'),
        onClick: toggleWindowSideBar
      }, /*#__PURE__*/_react["default"].createElement(_MenuSharp["default"], null)), /*#__PURE__*/_react["default"].createElement(_WindowTopBarTitle["default"], {
        windowId: windowId
      }), allowTopMenuButton && /*#__PURE__*/_react["default"].createElement(_WindowTopMenuButton["default"], {
        className: (0, _cssNs["default"])('window-menu-btn'),
        windowId: windowId
      }), /*#__PURE__*/_react["default"].createElement(_WindowTopBarPluginArea["default"], {
        windowId: windowId
      }), /*#__PURE__*/_react["default"].createElement(_WindowTopBarPluginMenu["default"], {
        windowId: windowId
      }), allowMaximize && /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-label": maximized ? t('minimizeWindow') : t('maximizeWindow'),
        className: (0, _cssNs["default"])('window-maximize'),
        onClick: maximized ? minimizeWindow : maximizeWindow
      }, maximized ? /*#__PURE__*/_react["default"].createElement(_WindowMinIcon["default"], null) : /*#__PURE__*/_react["default"].createElement(_WindowMaxIcon["default"], null)), allowFullscreen && /*#__PURE__*/_react["default"].createElement(_FullScreenButton["default"], null), allowClose && /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-label": t('closeWindow'),
        className: (0, _cssNs["default"])('window-close'),
        onClick: removeWindow
      }, /*#__PURE__*/_react["default"].createElement(_CloseSharp["default"], null)))));
    }
  }]);

  return WindowTopBar;
}(_react.Component);

exports.WindowTopBar = WindowTopBar;
WindowTopBar.defaultProps = {
  allowClose: true,
  allowFullscreen: false,
  allowMaximize: true,
  allowTopMenuButton: true,
  allowWindowSideBar: true,
  focused: false,
  focusWindow: function focusWindow() {},
  maximized: false,
  maximizeWindow: function maximizeWindow() {},
  minimizeWindow: function minimizeWindow() {},
  t: function t(key) {
    return key;
  },
  windowDraggable: true
};