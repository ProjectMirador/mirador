"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorContent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Accordion = _interopRequireDefault(require("@material-ui/core/Accordion"));

var _AccordionSummary = _interopRequireDefault(require("@material-ui/core/AccordionSummary"));

var _AccordionDetails = _interopRequireDefault(require("@material-ui/core/AccordionDetails"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Alert = _interopRequireDefault(require("@material-ui/lab/Alert"));

var _ExpandMore = _interopRequireDefault(require("@material-ui/icons/ExpandMore"));

var _PluginHook = require("./PluginHook");

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
var ErrorContent = /*#__PURE__*/function (_Component) {
  _inherits(ErrorContent, _Component);

  var _super = _createSuper(ErrorContent);

  function ErrorContent() {
    _classCallCheck(this, ErrorContent);

    return _super.apply(this, arguments);
  }

  _createClass(ErrorContent, [{
    key: "render",
    value:
    /** */
    function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          error = _this$props.error,
          metadata = _this$props.metadata,
          showJsError = _this$props.showJsError,
          t = _this$props.t;
      if (!showJsError) return null;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Alert["default"], {
        elevation: 6,
        variant: "filled",
        severity: "error"
      }, t('errorDialogTitle')), showJsError && /*#__PURE__*/_react["default"].createElement(_Accordion["default"], {
        square: true,
        className: classes.alert
      }, /*#__PURE__*/_react["default"].createElement(_AccordionSummary["default"], {
        expandIcon: /*#__PURE__*/_react["default"].createElement(_ExpandMore["default"], null)
      }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], null, t('jsError', {
        message: error.message,
        name: error.name
      }))), /*#__PURE__*/_react["default"].createElement(_AccordionDetails["default"], {
        className: classes.details
      }, /*#__PURE__*/_react["default"].createElement("pre", null, t('jsStack', {
        stack: error.stack
      })), metadata && /*#__PURE__*/_react["default"].createElement("pre", null, JSON.stringify(metadata, null, 2)))), /*#__PURE__*/_react["default"].createElement(_PluginHook.PluginHook, this.props));
    }
  }]);

  return ErrorContent;
}(_react.Component);

exports.ErrorContent = ErrorContent;
ErrorContent.defaultProps = {
  metadata: null,
  showJsError: true,
  t: function t(key) {
    return key;
  }
};