"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowThumbnailSettings = void 0;

var _react = _interopRequireWildcard(require("react"));

var _FormControlLabel = _interopRequireDefault(require("@material-ui/core/FormControlLabel"));

var _ListSubheader = _interopRequireDefault(require("@material-ui/core/ListSubheader"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _CropDinSharp = _interopRequireDefault(require("@material-ui/icons/CropDinSharp"));

var _ThumbnailNavigationBottomIcon = _interopRequireDefault(require("./icons/ThumbnailNavigationBottomIcon"));

var _ThumbnailNavigationRightIcon = _interopRequireDefault(require("./icons/ThumbnailNavigationRightIcon"));

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
var WindowThumbnailSettings = /*#__PURE__*/function (_Component) {
  _inherits(WindowThumbnailSettings, _Component);

  var _super = _createSuper(WindowThumbnailSettings);

  /**
   * constructor -
   */
  function WindowThumbnailSettings(props) {
    var _this;

    _classCallCheck(this, WindowThumbnailSettings);

    _this = _super.call(this, props);
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * @private
   */


  _createClass(WindowThumbnailSettings, [{
    key: "handleChange",
    value: function handleChange(value) {
      var _this$props = this.props,
          windowId = _this$props.windowId,
          setWindowThumbnailPosition = _this$props.setWindowThumbnailPosition;
      setWindowThumbnailPosition(windowId, value);
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
          thumbnailNavigationPosition = _this$props2.thumbnailNavigationPosition,
          direction = _this$props2.direction;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_ListSubheader["default"], {
        role: "presentation",
        disableSticky: true,
        tabIndex: "-1"
      }, t('thumbnails')), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
        className: classes.MenuItem,
        onClick: function onClick() {
          _this2.handleChange('off');

          handleClose();
        }
      }, /*#__PURE__*/_react["default"].createElement(_FormControlLabel["default"], {
        value: "off",
        classes: {
          label: thumbnailNavigationPosition === 'off' ? classes.selectedLabel : classes.label
        },
        control: /*#__PURE__*/_react["default"].createElement(_CropDinSharp["default"], {
          color: thumbnailNavigationPosition === 'off' ? 'secondary' : undefined
        }),
        label: t('off'),
        labelPlacement: "bottom"
      })), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
        className: classes.MenuItem,
        onClick: function onClick() {
          _this2.handleChange('far-bottom');

          handleClose();
        }
      }, /*#__PURE__*/_react["default"].createElement(_FormControlLabel["default"], {
        value: "far-bottom",
        classes: {
          label: thumbnailNavigationPosition === 'far-bottom' ? classes.selectedLabel : classes.label
        },
        control: /*#__PURE__*/_react["default"].createElement(_ThumbnailNavigationBottomIcon["default"], {
          color: thumbnailNavigationPosition === 'far-bottom' ? 'secondary' : undefined
        }),
        label: t('bottom'),
        labelPlacement: "bottom"
      })), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
        className: classes.MenuItem,
        onClick: function onClick() {
          _this2.handleChange('far-right');

          handleClose();
        }
      }, /*#__PURE__*/_react["default"].createElement(_FormControlLabel["default"], {
        value: "far-right",
        classes: {
          label: thumbnailNavigationPosition === 'far-right' ? classes.selectedLabel : classes.label
        },
        control: /*#__PURE__*/_react["default"].createElement(_ThumbnailNavigationRightIcon["default"], {
          color: thumbnailNavigationPosition === 'far-right' ? 'secondary' : undefined,
          style: direction === 'rtl' ? {
            transform: 'rotate(180deg)'
          } : {}
        }),
        label: t('right'),
        labelPlacement: "bottom"
      })));
    }
  }]);

  return WindowThumbnailSettings;
}(_react.Component);

exports.WindowThumbnailSettings = WindowThumbnailSettings;
WindowThumbnailSettings.defaultProps = {
  handleClose: function handleClose() {},
  t: function t(key) {
    return key;
  }
};