"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MinimalWindow = void 0;

var _react = _interopRequireWildcard(require("react"));

var _MenuSharp = _interopRequireDefault(require("@material-ui/icons/MenuSharp"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _CloseSharp = _interopRequireDefault(require("@material-ui/icons/CloseSharp"));

var _MiradorMenuButton = _interopRequireDefault(require("../containers/MiradorMenuButton"));

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

/** */
var MinimalWindow = /*#__PURE__*/function (_Component) {
  _inherits(MinimalWindow, _Component);

  var _super = _createSuper(MinimalWindow);

  function MinimalWindow() {
    _classCallCheck(this, MinimalWindow);

    return _super.apply(this, arguments);
  }

  _createClass(MinimalWindow, [{
    key: "render",
    value:
    /** */
    function render() {
      var _this$props = this.props,
          allowClose = _this$props.allowClose,
          allowWindowSideBar = _this$props.allowWindowSideBar,
          ariaLabel = _this$props.ariaLabel,
          children = _this$props.children,
          classes = _this$props.classes,
          label = _this$props.label,
          removeWindow = _this$props.removeWindow,
          t = _this$props.t,
          windowId = _this$props.windowId;
      return /*#__PURE__*/_react["default"].createElement(_Paper["default"], {
        component: "section",
        elevation: 1,
        id: windowId,
        className: (0, _classnames["default"])(classes.window, (0, _cssNs["default"])('placeholder-window')),
        "aria-label": label && ariaLabel ? t('window', {
          label: label
        }) : null
      }, /*#__PURE__*/_react["default"].createElement(_AppBar["default"], {
        position: "relative",
        color: "default"
      }, /*#__PURE__*/_react["default"].createElement(_Toolbar["default"], {
        disableGutters: true,
        className: (0, _classnames["default"])(classes.windowTopBarStyle, (0, _cssNs["default"])('window-top-bar')),
        variant: "dense"
      }, allowWindowSideBar && /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-label": t('toggleWindowSideBar'),
        disabled: true
      }, /*#__PURE__*/_react["default"].createElement(_MenuSharp["default"], null)), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "h2",
        noWrap: true,
        color: "inherit",
        className: classes.title
      }, label), allowClose && removeWindow && /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-label": t('closeWindow'),
        className: (0, _classnames["default"])(classes.button, (0, _cssNs["default"])('window-close')),
        onClick: removeWindow,
        TooltipProps: {
          tabIndex: ariaLabel ? '0' : '-1'
        }
      }, /*#__PURE__*/_react["default"].createElement(_CloseSharp["default"], null)))), children);
    }
  }]);

  return MinimalWindow;
}(_react.Component);

exports.MinimalWindow = MinimalWindow;
MinimalWindow.defaultProps = {
  allowClose: true,
  allowWindowSideBar: true,
  ariaLabel: true,
  children: null,
  classes: {},
  label: '',
  removeWindow: function removeWindow() {},
  t: function t(key) {
    return key;
  }
};