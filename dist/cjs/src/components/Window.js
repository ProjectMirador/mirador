"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Window = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _contextTypes = require("react-mosaic-component/lib/contextTypes");

var _cssNs = _interopRequireDefault(require("../config/css-ns"));

var _WindowTopBar = _interopRequireDefault(require("../containers/WindowTopBar"));

var _PrimaryWindow = _interopRequireDefault(require("../containers/PrimaryWindow"));

var _CompanionArea = _interopRequireDefault(require("../containers/CompanionArea"));

var _MinimalWindow = _interopRequireDefault(require("../containers/MinimalWindow"));

var _ErrorContent = _interopRequireDefault(require("../containers/ErrorContent"));

var _IIIFAuthentication = _interopRequireDefault(require("../containers/IIIFAuthentication"));

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

/**
 * Represents a Window in the mirador workspace
 * @param {object} window
 */
var Window = /*#__PURE__*/function (_Component) {
  _inherits(Window, _Component);

  var _super = _createSuper(Window);

  /** */
  function Window(props) {
    var _this;

    _classCallCheck(this, Window);

    _this = _super.call(this, props);
    _this.state = {};
    return _this;
  }
  /** */


  _createClass(Window, [{
    key: "wrappedTopBar",
    value:
    /**
     * wrappedTopBar - will conditionally wrap a WindowTopBar for needed
     * additional functionality based on workspace type
     */
    function wrappedTopBar() {
      var _this$props = this.props,
          windowId = _this$props.windowId,
          workspaceType = _this$props.workspaceType,
          windowDraggable = _this$props.windowDraggable;

      var topBar = /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_WindowTopBar["default"], {
        windowId: windowId,
        windowDraggable: windowDraggable
      }), /*#__PURE__*/_react["default"].createElement(_IIIFAuthentication["default"], {
        windowId: windowId
      }));

      if (workspaceType === 'mosaic' && windowDraggable) {
        var mosaicWindowActions = this.context.mosaicWindowActions;
        return mosaicWindowActions.connectDragSource(topBar);
      }

      return topBar;
    }
    /**
     * Renders things
     */

  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          focusWindow = _this$props2.focusWindow,
          label = _this$props2.label,
          isFetching = _this$props2.isFetching,
          maximized = _this$props2.maximized,
          sideBarOpen = _this$props2.sideBarOpen,
          view = _this$props2.view,
          windowId = _this$props2.windowId,
          classes = _this$props2.classes,
          t = _this$props2.t,
          manifestError = _this$props2.manifestError;
      var _this$state = this.state,
          error = _this$state.error,
          hasError = _this$state.hasError;

      if (hasError) {
        return /*#__PURE__*/_react["default"].createElement(_MinimalWindow["default"], {
          windowId: windowId
        }, /*#__PURE__*/_react["default"].createElement(_ErrorContent["default"], {
          error: error,
          windowId: windowId
        }));
      }

      return /*#__PURE__*/_react["default"].createElement(_Paper["default"], {
        onFocus: focusWindow,
        component: "section",
        elevation: 1,
        id: windowId,
        className: (0, _classnames["default"])(classes.window, (0, _cssNs["default"])('window'), maximized ? classes.maximized : null),
        "aria-label": t('window', {
          label: label
        })
      }, this.wrappedTopBar(), manifestError && /*#__PURE__*/_react["default"].createElement(_ErrorContent["default"], {
        error: {
          stack: manifestError
        },
        windowId: windowId
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.middle
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.middleLeft
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.primaryWindow
      }, /*#__PURE__*/_react["default"].createElement(_PrimaryWindow["default"], {
        view: view,
        windowId: windowId,
        isFetching: isFetching,
        sideBarOpen: sideBarOpen
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.companionAreaBottom
      }, /*#__PURE__*/_react["default"].createElement(_CompanionArea["default"], {
        windowId: windowId,
        position: "bottom"
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.companionAreaRight
      }, /*#__PURE__*/_react["default"].createElement(_CompanionArea["default"], {
        windowId: windowId,
        position: "right"
      }), /*#__PURE__*/_react["default"].createElement(_CompanionArea["default"], {
        windowId: windowId,
        position: "far-right"
      }))), /*#__PURE__*/_react["default"].createElement(_CompanionArea["default"], {
        windowId: windowId,
        position: "far-bottom"
      }), /*#__PURE__*/_react["default"].createElement(_PluginHook.PluginHook, this.props));
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return {
        error: error,
        hasError: true
      };
    }
  }]);

  return Window;
}(_react.Component);

exports.Window = Window;
Window.contextType = _contextTypes.MosaicWindowContext;
Window.defaultProps = {
  classes: {},
  focusWindow: function focusWindow() {},
  isFetching: false,
  label: null,
  manifestError: null,
  maximized: false,
  sideBarOpen: false,
  view: undefined,
  windowDraggable: null,
  workspaceType: null
};