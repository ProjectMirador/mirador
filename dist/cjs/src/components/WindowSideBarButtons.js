"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowSideBarButtons = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Badge = _interopRequireDefault(require("@material-ui/core/Badge"));

var _Tabs = _interopRequireDefault(require("@material-ui/core/Tabs"));

var _Tab = _interopRequireDefault(require("@material-ui/core/Tab"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _InfoSharp = _interopRequireDefault(require("@material-ui/icons/InfoSharp"));

var _CommentSharp = _interopRequireDefault(require("@material-ui/icons/CommentSharp"));

var _CopyrightSharp = _interopRequireDefault(require("@material-ui/icons/CopyrightSharp"));

var _LayersSharp = _interopRequireDefault(require("@material-ui/icons/LayersSharp"));

var _SearchSharp = _interopRequireDefault(require("@material-ui/icons/SearchSharp"));

var _CanvasIndexIcon = _interopRequireDefault(require("./icons/CanvasIndexIcon"));

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
var WindowSideBarButtons = /*#__PURE__*/function (_Component) {
  _inherits(WindowSideBarButtons, _Component);

  var _super = _createSuper(WindowSideBarButtons);

  /** */
  function WindowSideBarButtons(props) {
    var _this;

    _classCallCheck(this, WindowSideBarButtons);

    _this = _super.call(this, props);
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * @param {object} event the change event
   * @param {string} value the tab's value
  */


  _createClass(WindowSideBarButtons, [{
    key: "handleChange",
    value: function handleChange(event, value) {
      var addCompanionWindow = this.props.addCompanionWindow;
      addCompanionWindow(value);
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

      var _this$props = this.props,
          classes = _this$props.classes,
          hasAnnotations = _this$props.hasAnnotations,
          hasAnyAnnotations = _this$props.hasAnyAnnotations,
          hasAnyLayers = _this$props.hasAnyLayers,
          hasCurrentLayers = _this$props.hasCurrentLayers,
          hasSearchResults = _this$props.hasSearchResults,
          hasSearchService = _this$props.hasSearchService,
          panels = _this$props.panels,
          PluginComponents = _this$props.PluginComponents,
          sideBarPanel = _this$props.sideBarPanel,
          t = _this$props.t;
      /** */

      var TabButton = function TabButton(props) {
        return /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
          title: t('openCompanionWindow', {
            context: props.value
          })
        }, /*#__PURE__*/_react["default"].createElement(_Tab["default"], Object.assign({}, props, {
          classes: {
            root: classes.tab,
            selected: classes.tabSelected
          },
          "aria-label": t('openCompanionWindow', {
            context: props.value
          }),
          disableRipple: true,
          onKeyUp: _this2.handleKeyUp
        })));
      };

      return /*#__PURE__*/_react["default"].createElement(_Tabs["default"], {
        classes: {
          flexContainer: classes.tabsFlexContainer,
          indicator: classes.tabsIndicator
        },
        value: sideBarPanel === 'closed' ? false : sideBarPanel,
        onChange: this.handleChange,
        variant: "fullWidth",
        indicatorColor: "primary",
        textColor: "primary",
        orientation: "vertical",
        "aria-orientation": "vertical",
        "aria-label": t('sidebarPanelsNavigation')
      }, panels.info && /*#__PURE__*/_react["default"].createElement(TabButton, {
        value: "info",
        icon: /*#__PURE__*/_react["default"].createElement(_InfoSharp["default"], null)
      }), panels.attribution && /*#__PURE__*/_react["default"].createElement(TabButton, {
        value: "attribution",
        icon: /*#__PURE__*/_react["default"].createElement(_CopyrightSharp["default"], null)
      }), panels.canvas && /*#__PURE__*/_react["default"].createElement(TabButton, {
        value: "canvas",
        icon: /*#__PURE__*/_react["default"].createElement(_CanvasIndexIcon["default"], null)
      }), panels.annotations && (hasAnnotations || hasAnyAnnotations) && /*#__PURE__*/_react["default"].createElement(TabButton, {
        value: "annotations",
        icon: /*#__PURE__*/_react["default"].createElement(_Badge["default"], {
          classes: {
            badge: classes.badge
          },
          invisible: !hasAnnotations,
          variant: "dot"
        }, /*#__PURE__*/_react["default"].createElement(_CommentSharp["default"], null))
      }), panels.search && hasSearchService && /*#__PURE__*/_react["default"].createElement(TabButton, {
        value: "search",
        icon: /*#__PURE__*/_react["default"].createElement(_Badge["default"], {
          classes: {
            badge: classes.badge
          },
          invisible: !hasSearchResults,
          variant: "dot"
        }, /*#__PURE__*/_react["default"].createElement(_SearchSharp["default"], null))
      }), panels.layers && hasAnyLayers && /*#__PURE__*/_react["default"].createElement(TabButton, {
        value: "layers",
        icon: /*#__PURE__*/_react["default"].createElement(_Badge["default"], {
          classes: {
            badge: classes.badge
          },
          invisible: !hasCurrentLayers,
          variant: "dot"
        }, /*#__PURE__*/_react["default"].createElement(_LayersSharp["default"], null))
      }), PluginComponents && PluginComponents.map(function (PluginComponent) {
        return /*#__PURE__*/_react["default"].createElement(TabButton, {
          key: PluginComponent.value,
          value: PluginComponent.value,
          icon: /*#__PURE__*/_react["default"].createElement(PluginComponent, null)
        });
      }));
    }
  }]);

  return WindowSideBarButtons;
}(_react.Component);

exports.WindowSideBarButtons = WindowSideBarButtons;
WindowSideBarButtons.defaultProps = {
  classes: {},
  hasAnnotations: false,
  hasAnyAnnotations: false,
  hasAnyLayers: false,
  hasCurrentLayers: false,
  hasSearchResults: false,
  hasSearchService: false,
  panels: [],
  PluginComponents: null,
  sideBarPanel: 'closed',
  t: function t(key) {
    return key;
  }
};