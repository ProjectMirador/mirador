"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowListButton = void 0;

var _react = _interopRequireWildcard(require("react"));

var _BookmarksSharp = _interopRequireDefault(require("@material-ui/icons/BookmarksSharp"));

var _classnames = _interopRequireDefault(require("classnames"));

var _WindowList = _interopRequireDefault(require("../containers/WindowList"));

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
 * WindowListButton ~
*/
var WindowListButton = /*#__PURE__*/function (_Component) {
  _inherits(WindowListButton, _Component);

  var _super = _createSuper(WindowListButton);

  /** */
  function WindowListButton(props) {
    var _this;

    _classCallCheck(this, WindowListButton);

    _this = _super.call(this, props);
    _this.state = {
      windowListAnchor: null
    };
    _this.handleClose = _this.handleClose.bind(_assertThisInitialized(_this));
    _this.handleOpen = _this.handleOpen.bind(_assertThisInitialized(_this));
    return _this;
  }
  /** Set the windowListAnchor to null on window close */


  _createClass(WindowListButton, [{
    key: "handleClose",
    value: function handleClose() {
      this.setState({
        windowListAnchor: null
      });
    }
    /** Set the windowListAnchor to the event's current target  */

  }, {
    key: "handleOpen",
    value: function handleOpen(event) {
      this.setState({
        windowListAnchor: event.currentTarget
      });
    }
    /**
     * Returns the rendered component
    */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          classes = _this$props.classes,
          disabled = _this$props.disabled,
          t = _this$props.t,
          windowCount = _this$props.windowCount;
      var windowListAnchor = this.state.windowListAnchor;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-haspopup": "true",
        "aria-label": t('listAllOpenWindows'),
        "aria-owns": windowListAnchor ? 'window-list' : null,
        className: (0, _classnames["default"])(classes.ctrlBtn, windowListAnchor ? classes.ctrlBtnSelected : null),
        disabled: disabled,
        badge: true,
        BadgeProps: {
          badgeContent: windowCount,
          classes: {
            badge: classes.badge
          }
        },
        onClick: function onClick(e) {
          return _this2.handleOpen(e);
        }
      }, /*#__PURE__*/_react["default"].createElement(_BookmarksSharp["default"], null)), Boolean(windowListAnchor) && /*#__PURE__*/_react["default"].createElement(_WindowList["default"], {
        anchorEl: windowListAnchor,
        id: "window-list",
        open: Boolean(windowListAnchor),
        handleClose: this.handleClose
      }));
    }
  }]);

  return WindowListButton;
}(_react.Component);

exports.WindowListButton = WindowListButton;
WindowListButton.defaultProps = {
  classes: {},
  disabled: false
};