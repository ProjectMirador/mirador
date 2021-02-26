"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowAuthenticationBar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Collapse = _interopRequireDefault(require("@material-ui/core/Collapse"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _LockSharp = _interopRequireDefault(require("@material-ui/icons/LockSharp"));

var _SanitizedHtml = _interopRequireDefault(require("../containers/SanitizedHtml"));

var _PluginHook = require("./PluginHook");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var WindowAuthenticationBar = /*#__PURE__*/function (_Component) {
  _inherits(WindowAuthenticationBar, _Component);

  var _super = _createSuper(WindowAuthenticationBar);

  /** */
  function WindowAuthenticationBar(props) {
    var _this;

    _classCallCheck(this, WindowAuthenticationBar);

    _this = _super.call(this, props);
    _this.state = {
      open: false
    };
    _this.setOpen = _this.setOpen.bind(_assertThisInitialized(_this));
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }
  /** */


  _createClass(WindowAuthenticationBar, [{
    key: "onSubmit",
    value: function onSubmit() {
      var onConfirm = this.props.onConfirm;
      this.setOpen(false);
      onConfirm();
    }
    /** Toggle the full description */

  }, {
    key: "setOpen",
    value: function setOpen(open) {
      this.setState(function (state) {
        return _objectSpread(_objectSpread({}, state), {}, {
          open: open
        });
      });
    }
    /** */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          classes = _this$props.classes,
          confirmButton = _this$props.confirmButton,
          continueLabel = _this$props.continueLabel,
          header = _this$props.header,
          description = _this$props.description,
          icon = _this$props.icon,
          label = _this$props.label,
          t = _this$props.t,
          ruleSet = _this$props.ruleSet,
          hasLogoutService = _this$props.hasLogoutService,
          status = _this$props.status,
          ConfirmProps = _this$props.ConfirmProps;
      if (status === 'ok' && !hasLogoutService) return null;
      var open = this.state.open;

      var button = /*#__PURE__*/_react["default"].createElement(_Button["default"], Object.assign({
        onClick: this.onSubmit,
        className: classes.buttonInvert,
        color: "secondary"
      }, ConfirmProps), confirmButton || t('login'));

      if (!description && !header) {
        return /*#__PURE__*/_react["default"].createElement(_Paper["default"], {
          square: true,
          elevation: 4,
          color: "secondary",
          classes: {
            root: classes.paper
          }
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: classes.topBar
        }, icon || /*#__PURE__*/_react["default"].createElement(_LockSharp["default"], {
          className: classes.icon
        }), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
          className: classes.label,
          component: "h3",
          variant: "body1",
          color: "inherit"
        }, ruleSet ? /*#__PURE__*/_react["default"].createElement(_SanitizedHtml["default"], {
          htmlString: label,
          ruleSet: ruleSet
        }) : label), /*#__PURE__*/_react["default"].createElement(_PluginHook.PluginHook, this.props), button));
      }

      return /*#__PURE__*/_react["default"].createElement(_Paper["default"], {
        square: true,
        elevation: 4,
        color: "secondary",
        classes: {
          root: classes.paper
        }
      }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        fullWidth: true,
        className: classes.topBar,
        onClick: function onClick() {
          return _this2.setOpen(true);
        },
        component: "div",
        color: "inherit"
      }, icon || /*#__PURE__*/_react["default"].createElement(_LockSharp["default"], {
        className: classes.icon
      }), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        className: classes.label,
        component: "h3",
        variant: "body1",
        color: "inherit"
      }, ruleSet ? /*#__PURE__*/_react["default"].createElement(_SanitizedHtml["default"], {
        htmlString: label,
        ruleSet: ruleSet
      }) : label), /*#__PURE__*/_react["default"].createElement(_PluginHook.PluginHook, this.props), /*#__PURE__*/_react["default"].createElement("span", {
        className: classes.fauxButton
      }, !open && /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "button",
        color: "inherit"
      }, continueLabel || t('continue')))), /*#__PURE__*/_react["default"].createElement(_Collapse["default"], {
        "in": open,
        onClose: function onClose() {
          return _this2.setOpen(false);
        }
      }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "body1",
        color: "inherit",
        className: classes.expanded
      }, ruleSet ? /*#__PURE__*/_react["default"].createElement(_SanitizedHtml["default"], {
        htmlString: header,
        ruleSet: ruleSet
      }) : header, header && description ? ': ' : '', ruleSet ? /*#__PURE__*/_react["default"].createElement(_SanitizedHtml["default"], {
        htmlString: description,
        ruleSet: ruleSet
      }) : description), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        onClick: function onClick() {
          return _this2.setOpen(false);
        },
        color: "inherit"
      }, t('cancel')), button)));
    }
  }]);

  return WindowAuthenticationBar;
}(_react.Component);

exports.WindowAuthenticationBar = WindowAuthenticationBar;
WindowAuthenticationBar.defaultProps = {
  confirmButton: undefined,
  ConfirmProps: {},
  continueLabel: undefined,
  description: undefined,
  hasLogoutService: true,
  header: undefined,
  icon: undefined,
  ruleSet: 'iiif',
  status: undefined,
  t: function t(k) {
    return k;
  }
};