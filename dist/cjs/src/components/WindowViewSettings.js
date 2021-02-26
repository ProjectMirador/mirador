"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowViewSettings = void 0;

var _react = _interopRequireWildcard(require("react"));

var _FormControlLabel = _interopRequireDefault(require("@material-ui/core/FormControlLabel"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _ListSubheader = _interopRequireDefault(require("@material-ui/core/ListSubheader"));

var _CropOriginalSharp = _interopRequireDefault(require("@material-ui/icons/CropOriginalSharp"));

var _ViewColumn = _interopRequireDefault(require("@material-ui/icons/ViewColumn"));

var _BookViewIcon = _interopRequireDefault(require("./icons/BookViewIcon"));

var _GalleryViewIcon = _interopRequireDefault(require("./icons/GalleryViewIcon"));

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
 *
 */
var WindowViewSettings = /*#__PURE__*/function (_Component) {
  _inherits(WindowViewSettings, _Component);

  var _super = _createSuper(WindowViewSettings);

  /**
   * constructor -
   */
  function WindowViewSettings(props) {
    var _this;

    _classCallCheck(this, WindowViewSettings);

    _this = _super.call(this, props);
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * @private
   */


  _createClass(WindowViewSettings, [{
    key: "handleChange",
    value: function handleChange(value) {
      var _this$props = this.props,
          windowId = _this$props.windowId,
          setWindowViewType = _this$props.setWindowViewType;
      setWindowViewType(windowId, value);
    }
    /**
     * render
     *
     * @return {type}  description
     */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          classes = _this$props2.classes,
          handleClose = _this$props2.handleClose,
          t = _this$props2.t,
          windowViewType = _this$props2.windowViewType,
          viewTypes = _this$props2.viewTypes;
      var iconMap = {
        book: _BookViewIcon["default"],
        gallery: _GalleryViewIcon["default"],
        scroll: _ViewColumn["default"],
        single: _CropOriginalSharp["default"]
      };
      /** Suspiciously similar to a component, yet if it is invoked through JSX
          none of the click handlers work? */

      var menuItem = function menuItem(_ref) {
        var value = _ref.value,
            Icon = _ref.Icon;
        return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
          key: value,
          className: classes.MenuItem,
          autoFocus: windowViewType === value,
          onClick: function onClick() {
            _this2.handleChange(value);

            handleClose();
          }
        }, /*#__PURE__*/_react["default"].createElement(_FormControlLabel["default"], {
          value: value,
          classes: {
            label: windowViewType === value ? classes.selectedLabel : classes.label
          },
          control: /*#__PURE__*/_react["default"].createElement(Icon, {
            color: windowViewType === value ? 'secondary' : undefined
          }),
          label: t(value),
          labelPlacement: "bottom"
        }));
      };

      if (viewTypes.length === 0) return null;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_ListSubheader["default"], {
        role: "presentation",
        disableSticky: true,
        tabIndex: "-1"
      }, t('view')), viewTypes.map(function (value) {
        return menuItem({
          Icon: iconMap[value],
          value: value
        });
      }));
    }
  }]);

  return WindowViewSettings;
}(_react.Component);

exports.WindowViewSettings = WindowViewSettings;
WindowViewSettings.defaultProps = {
  handleClose: function handleClose() {},
  t: function t(key) {
    return key;
  },
  viewTypes: []
};