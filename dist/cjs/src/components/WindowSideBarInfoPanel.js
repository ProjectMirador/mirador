"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowSideBarInfoPanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _CompanionWindow = _interopRequireDefault(require("../containers/CompanionWindow"));

var _CanvasInfo = _interopRequireDefault(require("../containers/CanvasInfo"));

var _LocalePicker = _interopRequireDefault(require("../containers/LocalePicker"));

var _ManifestInfo = _interopRequireDefault(require("../containers/ManifestInfo"));

var _CollectionInfo = _interopRequireDefault(require("../containers/CollectionInfo"));

var _ManifestRelatedLinks = _interopRequireDefault(require("../containers/ManifestRelatedLinks"));

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

/**
 * WindowSideBarInfoPanel
 */
var WindowSideBarInfoPanel = /*#__PURE__*/function (_Component) {
  _inherits(WindowSideBarInfoPanel, _Component);

  var _super = _createSuper(WindowSideBarInfoPanel);

  function WindowSideBarInfoPanel() {
    _classCallCheck(this, WindowSideBarInfoPanel);

    return _super.apply(this, arguments);
  }

  _createClass(WindowSideBarInfoPanel, [{
    key: "render",
    value:
    /**
     * render
     * @return
     */
    function render() {
      var _this$props = this.props,
          windowId = _this$props.windowId,
          id = _this$props.id,
          canvasIds = _this$props.canvasIds,
          classes = _this$props.classes,
          collectionPath = _this$props.collectionPath,
          t = _this$props.t,
          locale = _this$props.locale,
          setLocale = _this$props.setLocale,
          availableLocales = _this$props.availableLocales,
          showLocalePicker = _this$props.showLocalePicker;
      return /*#__PURE__*/_react["default"].createElement(_CompanionWindow["default"], {
        title: t('aboutThisItem'),
        paperClassName: (0, _cssNs["default"])('window-sidebar-info-panel'),
        windowId: windowId,
        id: id,
        titleControls: showLocalePicker && /*#__PURE__*/_react["default"].createElement(_LocalePicker["default"], {
          locale: locale,
          setLocale: setLocale,
          availableLocales: availableLocales
        })
      }, canvasIds.map(function (canvasId, index) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: canvasId,
          className: classes.section
        }, /*#__PURE__*/_react["default"].createElement(_CanvasInfo["default"], {
          id: id,
          canvasId: canvasId,
          index: index,
          totalSize: canvasIds.length,
          windowId: windowId
        }));
      }), collectionPath.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.section
      }, /*#__PURE__*/_react["default"].createElement(_CollectionInfo["default"], {
        id: id,
        windowId: windowId
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.section
      }, /*#__PURE__*/_react["default"].createElement(_ManifestInfo["default"], {
        id: id,
        windowId: windowId
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.section
      }, /*#__PURE__*/_react["default"].createElement(_ManifestRelatedLinks["default"], {
        id: id,
        windowId: windowId
      })));
    }
  }]);

  return WindowSideBarInfoPanel;
}(_react.Component);

exports.WindowSideBarInfoPanel = WindowSideBarInfoPanel;
WindowSideBarInfoPanel.defaultProps = {
  availableLocales: [],
  canvasIds: [],
  classes: {},
  collectionPath: [],
  locale: '',
  setLocale: undefined,
  showLocalePicker: false,
  t: function t(key) {
    return key;
  }
};