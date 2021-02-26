"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompanionWindow = void 0;

var _react = _interopRequireWildcard(require("react"));

var _CloseSharp = _interopRequireDefault(require("@material-ui/icons/CloseSharp"));

var _OpenInNewSharp = _interopRequireDefault(require("@material-ui/icons/OpenInNewSharp"));

var _DragIndicatorSharp = _interopRequireDefault(require("@material-ui/icons/DragIndicatorSharp"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _reactRnd = require("react-rnd");

var _MiradorMenuButton = _interopRequireDefault(require("../containers/MiradorMenuButton"));

var _cssNs = _interopRequireDefault(require("../config/css-ns"));

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

/**
 * CompanionWindow
 */
var CompanionWindow = /*#__PURE__*/function (_Component) {
  _inherits(CompanionWindow, _Component);

  var _super = _createSuper(CompanionWindow);

  function CompanionWindow() {
    _classCallCheck(this, CompanionWindow);

    return _super.apply(this, arguments);
  }

  _createClass(CompanionWindow, [{
    key: "openInNewStyle",
    value:
    /** */
    function openInNewStyle() {
      var direction = this.props.direction;
      if (direction === 'rtl') return {
        transform: 'scale(-1, 1)'
      };
      return {};
    }
    /** */

  }, {
    key: "resizeHandles",
    value: function resizeHandles() {
      var _this$props = this.props,
          direction = _this$props.direction,
          position = _this$props.position;
      var positions = {
        ltr: {
          "default": 'left',
          opposite: 'right'
        },
        rtl: {
          "default": 'right',
          opposite: 'left'
        }
      };
      var base = {
        bottom: false,
        bottomLeft: false,
        bottomRight: false,
        left: false,
        right: false,
        top: false,
        topLeft: false,
        topRight: false
      };

      if (position === 'right' || position === 'far-right') {
        return _objectSpread(_objectSpread({}, base), {}, _defineProperty({}, positions[direction]["default"], true));
      }

      if (position === 'left') {
        return _objectSpread(_objectSpread({}, base), {}, _defineProperty({}, positions[direction].opposite, true));
      }

      if (position === 'bottom' || position === 'far-bottom') {
        return _objectSpread(_objectSpread({}, base), {}, {
          top: true
        });
      }

      return base;
    }
    /**
     * render
     * @return
     */

  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          ariaLabel = _this$props2.ariaLabel,
          classes = _this$props2.classes,
          paperClassName = _this$props2.paperClassName,
          onCloseClick = _this$props2.onCloseClick,
          updateCompanionWindow = _this$props2.updateCompanionWindow,
          isDisplayed = _this$props2.isDisplayed,
          position = _this$props2.position,
          t = _this$props2.t,
          title = _this$props2.title,
          children = _this$props2.children,
          titleControls = _this$props2.titleControls,
          size = _this$props2.size,
          defaultSidebarPanelWidth = _this$props2.defaultSidebarPanelWidth,
          defaultSidebarPanelHeight = _this$props2.defaultSidebarPanelHeight;
      var isBottom = position === 'bottom' || position === 'far-bottom';

      var childrenWithAdditionalProps = _react["default"].Children.map(children, function (child) {
        if (!child) return null;
        return /*#__PURE__*/_react["default"].cloneElement(child, {
          parentactions: {
            closeCompanionWindow: onCloseClick
          }
        });
      });

      return /*#__PURE__*/_react["default"].createElement(_Paper["default"], {
        className: [classes.root, position === 'bottom' ? classes.horizontal : classes.vertical, classes["companionWindow-".concat(position)], (0, _cssNs["default"])("companion-window-".concat(position)), paperClassName].join(' '),
        style: {
          display: isDisplayed ? null : 'none',
          order: position === 'left' ? -1 : null
        },
        square: true,
        component: "aside",
        "aria-label": ariaLabel || title
      }, /*#__PURE__*/_react["default"].createElement(_reactRnd.Rnd, {
        className: [classes.rnd],
        style: {
          display: 'flex',
          position: 'relative'
        },
        "default": {
          height: isBottom ? defaultSidebarPanelHeight : '100%',
          width: isBottom ? 'auto' : defaultSidebarPanelWidth
        },
        disableDragging: true,
        enableResizing: this.resizeHandles(),
        minHeight: 50,
        minWidth: position === 'left' ? 235 : 100
      }, /*#__PURE__*/_react["default"].createElement(_Toolbar["default"], {
        className: [classes.toolbar, classes.companionWindowHeader, size.width < 370 ? classes.small : null, (0, _cssNs["default"])('companion-window-header')].join(' '),
        disableGutters: true
      }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "h3",
        className: classes.windowSideBarTitle
      }, title), position === 'left' ? updateCompanionWindow && /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-label": t('openInCompanionWindow'),
        onClick: function onClick() {
          updateCompanionWindow({
            position: 'right'
          });
        }
      }, /*#__PURE__*/_react["default"].createElement(_OpenInNewSharp["default"], {
        style: this.openInNewStyle()
      })) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, updateCompanionWindow && /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-label": position === 'bottom' ? t('moveCompanionWindowToRight') : t('moveCompanionWindowToBottom'),
        className: classes.positionButton,
        onClick: function onClick() {
          updateCompanionWindow({
            position: position === 'bottom' ? 'right' : 'bottom'
          });
        }
      }, /*#__PURE__*/_react["default"].createElement(_DragIndicatorSharp["default"], null)), /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-label": t('closeCompanionWindow'),
        className: classes.closeButton,
        onClick: onCloseClick
      }, /*#__PURE__*/_react["default"].createElement(_CloseSharp["default"], null))), titleControls && /*#__PURE__*/_react["default"].createElement("div", {
        className: [classes.titleControls, isBottom ? classes.companionWindowTitleControlsBottom : classes.companionWindowTitleControls, (0, _cssNs["default"])('companion-window-title-controls')].join(' ')
      }, titleControls)), /*#__PURE__*/_react["default"].createElement(_Paper["default"], {
        className: [classes.content, (0, _cssNs["default"])('scrollto-scrollable')].join(' '),
        elevation: 0
      }, childrenWithAdditionalProps)));
    }
  }]);

  return CompanionWindow;
}(_react.Component);

exports.CompanionWindow = CompanionWindow;
CompanionWindow.defaultProps = {
  ariaLabel: undefined,
  children: undefined,
  defaultSidebarPanelHeight: 201,
  defaultSidebarPanelWidth: 235,
  isDisplayed: false,
  onCloseClick: function onCloseClick() {},
  paperClassName: '',
  position: null,
  size: {},
  t: function t(key) {
    return key;
  },
  title: null,
  titleControls: null,
  updateCompanionWindow: undefined
};