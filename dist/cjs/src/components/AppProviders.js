"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppProviders = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactFullScreen = _interopRequireDefault(require("react-full-screen"));

var _reactI18next = require("react-i18next");

var _reactAriaLive = require("react-aria-live");

var _styles = require("@material-ui/core/styles");

var _reactDnd = require("react-dnd");

var _reactDndMultiBackend = _interopRequireDefault(require("react-dnd-multi-backend"));

var _HTML5toTouch = _interopRequireDefault(require("react-dnd-multi-backend/dist/cjs/HTML5toTouch"));

var _jss = require("jss");

var _jssRtl = _interopRequireDefault(require("jss-rtl"));

var _i18n = _interopRequireDefault(require("../i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
 * Allow applications to opt-out of (or provide their own) drag and drop context
 */
var MaybeDndProvider = function MaybeDndProvider(props) {
  var dndManager = props.dndManager,
      children = props.children;

  if (dndManager === false) {
    return children;
  }

  if (dndManager === undefined) {
    return /*#__PURE__*/_react["default"].createElement(_reactDnd.DndProvider, {
      backend: _reactDndMultiBackend["default"],
      options: _HTML5toTouch["default"]
    }, children);
  }

  return /*#__PURE__*/_react["default"].createElement(_reactDnd.DndContext.Provider, {
    value: dndManager
  }, children);
};

/**
 * This component adds viewer-specific providers.
 * @prop {Object} manifests
 */
var AppProviders = /*#__PURE__*/function (_Component) {
  _inherits(AppProviders, _Component);

  var _super = _createSuper(AppProviders);

  /** */
  function AppProviders(props) {
    var _this;

    _classCallCheck(this, AppProviders);

    _this = _super.call(this, props);
    _this.i18n = (0, _i18n["default"])();
    return _this;
  }
  /**
   * Set i18n language on component mount
   */


  _createClass(AppProviders, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var language = this.props.language;
      this.i18n.changeLanguage(language);
    }
    /**
     * Update the i18n language if it is changed
     */

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var language = this.props.language;

      if (prevProps.language !== language) {
        this.i18n.changeLanguage(language);
      }
    }
    /** */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          createGenerateClassNameOptions = _this$props.createGenerateClassNameOptions,
          isFullscreenEnabled = _this$props.isFullscreenEnabled,
          setWorkspaceFullscreen = _this$props.setWorkspaceFullscreen,
          theme = _this$props.theme,
          translations = _this$props.translations,
          dndManager = _this$props.dndManager;
      var generateClassName = (0, _styles.createGenerateClassName)(createGenerateClassNameOptions);
      Object.keys(translations).forEach(function (lng) {
        _this2.i18n.addResourceBundle(lng, 'translation', translations[lng], true, true);
      });
      return /*#__PURE__*/_react["default"].createElement(_reactFullScreen["default"], {
        enabled: isFullscreenEnabled,
        onChange: setWorkspaceFullscreen
      }, /*#__PURE__*/_react["default"].createElement(_reactI18next.I18nextProvider, {
        i18n: this.i18n
      }, /*#__PURE__*/_react["default"].createElement(_reactAriaLive.LiveAnnouncer, null, /*#__PURE__*/_react["default"].createElement(_styles.ThemeProvider, {
        theme: (0, _styles.createMuiTheme)(theme)
      }, /*#__PURE__*/_react["default"].createElement(_styles.StylesProvider, {
        jss: (0, _jss.create)({
          plugins: [].concat(_toConsumableArray((0, _styles.jssPreset)().plugins), [(0, _jssRtl["default"])()])
        }),
        generateClassName: generateClassName
      }, /*#__PURE__*/_react["default"].createElement(MaybeDndProvider, {
        dndManager: dndManager
      }, children))))));
    }
  }]);

  return AppProviders;
}(_react.Component);

exports.AppProviders = AppProviders;
AppProviders.defaultProps = {
  children: null,
  createGenerateClassNameOptions: {},
  dndManager: undefined,
  isFullscreenEnabled: false
};