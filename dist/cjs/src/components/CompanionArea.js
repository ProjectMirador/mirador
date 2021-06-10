"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompanionArea = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Slide = _interopRequireDefault(require("@material-ui/core/Slide"));

var _ArrowLeftSharp = _interopRequireDefault(require("@material-ui/icons/ArrowLeftSharp"));

var _ArrowRightSharp = _interopRequireDefault(require("@material-ui/icons/ArrowRightSharp"));

var _CompanionWindowFactory = _interopRequireDefault(require("../containers/CompanionWindowFactory"));

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
var CompanionArea = /*#__PURE__*/function (_Component) {
  _inherits(CompanionArea, _Component);

  var _super = _createSuper(CompanionArea);

  function CompanionArea() {
    _classCallCheck(this, CompanionArea);

    return _super.apply(this, arguments);
  }

  _createClass(CompanionArea, [{
    key: "areaLayoutClass",
    value:
    /** */
    function areaLayoutClass() {
      var _this$props = this.props,
          classes = _this$props.classes,
          position = _this$props.position;
      return position === 'bottom' || position === 'far-bottom' ? classes.horizontal : null;
    }
    /** */

  }, {
    key: "collapseIcon",
    value: function collapseIcon() {
      var _this$props2 = this.props,
          companionAreaOpen = _this$props2.companionAreaOpen,
          direction = _this$props2.direction;

      if (direction === 'rtl') {
        if (companionAreaOpen) return /*#__PURE__*/_react["default"].createElement(_ArrowRightSharp["default"], null);
        return /*#__PURE__*/_react["default"].createElement(_ArrowLeftSharp["default"], null);
      }

      if (companionAreaOpen) return /*#__PURE__*/_react["default"].createElement(_ArrowLeftSharp["default"], null);
      return /*#__PURE__*/_react["default"].createElement(_ArrowRightSharp["default"], null);
    }
    /** @private */

  }, {
    key: "slideDirection",
    value: function slideDirection() {
      var _this$props3 = this.props,
          direction = _this$props3.direction,
          position = _this$props3.position;
      var defaultPosition = direction === 'rtl' ? 'left' : 'right';
      var oppositePosition = direction === 'rtl' ? 'right' : 'left';

      switch (position) {
        case 'right':
        case 'far-right':
          return oppositePosition;

        case 'bottom':
        case 'far-bottom':
          return 'up';

        default:
          return defaultPosition;
      }
    }
    /** */

  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          classes = _this$props4.classes,
          companionWindowIds = _this$props4.companionWindowIds,
          companionAreaOpen = _this$props4.companionAreaOpen,
          setCompanionAreaOpen = _this$props4.setCompanionAreaOpen,
          position = _this$props4.position,
          sideBarOpen = _this$props4.sideBarOpen,
          t = _this$props4.t,
          windowId = _this$props4.windowId;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: [classes.root, this.areaLayoutClass(), (0, _cssNs["default"])("companion-area-".concat(position))].join(' ')
      }, /*#__PURE__*/_react["default"].createElement(_Slide["default"], {
        "in": companionAreaOpen,
        direction: this.slideDirection()
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: [(0, _cssNs["default"])('companion-windows'), companionWindowIds.length > 0 && classes[position], this.areaLayoutClass()].join(' '),
        style: {
          display: companionAreaOpen ? 'flex' : 'none'
        }
      }, companionWindowIds.map(function (id) {
        return /*#__PURE__*/_react["default"].createElement(_CompanionWindowFactory["default"], {
          id: id,
          key: id,
          windowId: windowId
        });
      }))), setCompanionAreaOpen && position === 'left' && sideBarOpen && companionWindowIds.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.toggle
      }, /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-expanded": companionAreaOpen,
        "aria-label": companionAreaOpen ? t('collapseSidePanel') : t('expandSidePanel'),
        className: classes.toggleButton,
        key: companionAreaOpen ? 'collapse' : 'expand',
        onClick: function onClick() {
          setCompanionAreaOpen(windowId, !companionAreaOpen);
        },
        TooltipProps: {
          placement: 'right'
        }
      }, this.collapseIcon())));
    }
  }]);

  return CompanionArea;
}(_react.Component);

exports.CompanionArea = CompanionArea;
CompanionArea.defaultProps = {
  classes: {},
  setCompanionAreaOpen: function setCompanionAreaOpen() {},
  sideBarOpen: false
};