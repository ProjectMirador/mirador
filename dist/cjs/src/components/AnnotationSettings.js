"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnotationSettings = void 0;

var _react = _interopRequireWildcard(require("react"));

var _VisibilitySharp = _interopRequireDefault(require("@material-ui/icons/VisibilitySharp"));

var _VisibilityOffSharp = _interopRequireDefault(require("@material-ui/icons/VisibilityOffSharp"));

var _MiradorMenuButton = _interopRequireDefault(require("../containers/MiradorMenuButton"));

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
 * AnnotationSettings is a component to handle various annotation
 * display settings in the Annotation companion window
*/
var AnnotationSettings = /*#__PURE__*/function (_Component) {
  _inherits(AnnotationSettings, _Component);

  var _super = _createSuper(AnnotationSettings);

  function AnnotationSettings() {
    _classCallCheck(this, AnnotationSettings);

    return _super.apply(this, arguments);
  }

  _createClass(AnnotationSettings, [{
    key: "render",
    value:
    /**
     * Returns the rendered component
    */
    function render() {
      var _this$props = this.props,
          displayAll = _this$props.displayAll,
          displayAllDisabled = _this$props.displayAllDisabled,
          t = _this$props.t,
          toggleAnnotationDisplay = _this$props.toggleAnnotationDisplay;
      return /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-label": t(displayAll ? 'displayNoAnnotations' : 'highlightAllAnnotations'),
        onClick: toggleAnnotationDisplay,
        disabled: displayAllDisabled,
        size: "small"
      }, displayAll ? /*#__PURE__*/_react["default"].createElement(_VisibilitySharp["default"], null) : /*#__PURE__*/_react["default"].createElement(_VisibilityOffSharp["default"], null));
    }
  }]);

  return AnnotationSettings;
}(_react.Component);

exports.AnnotationSettings = AnnotationSettings;