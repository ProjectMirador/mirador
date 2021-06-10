"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrimaryWindow = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _WindowSideBar = _interopRequireDefault(require("../containers/WindowSideBar"));

var _CompanionArea = _interopRequireDefault(require("../containers/CompanionArea"));

var _CollectionDialog = _interopRequireDefault(require("../containers/CollectionDialog"));

var _cssNs = _interopRequireDefault(require("../config/css-ns"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var AudioViewer = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../containers/AudioViewer'));
  });
});
var GalleryView = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../containers/GalleryView'));
  });
});
var SelectCollection = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../containers/SelectCollection'));
  });
});
var WindowViewer = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../containers/WindowViewer'));
  });
});
var VideoViewer = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../containers/VideoViewer'));
  });
});
GalleryView.displayName = 'GalleryView';
SelectCollection.displayName = 'SelectCollection';
WindowViewer.displayName = 'WindowViewer';
/**
 * PrimaryWindow - component that renders the primary content of a Mirador
 * window. Right now this differentiates between a Image, Video, or Audio viewer.
 */

var PrimaryWindow = /*#__PURE__*/function (_Component) {
  _inherits(PrimaryWindow, _Component);

  var _super = _createSuper(PrimaryWindow);

  function PrimaryWindow() {
    _classCallCheck(this, PrimaryWindow);

    return _super.apply(this, arguments);
  }

  _createClass(PrimaryWindow, [{
    key: "renderViewer",
    value:
    /**
     * renderViewer - logic used to determine what type of view to show
     *
     * @return {(String|null)}
     */
    function renderViewer() {
      var _this$props = this.props,
          audioResources = _this$props.audioResources,
          isCollection = _this$props.isCollection,
          isFetching = _this$props.isFetching,
          videoResources = _this$props.videoResources,
          view = _this$props.view,
          windowId = _this$props.windowId;

      if (isCollection) {
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(SelectCollection, {
          windowId: windowId
        }));
      }

      if (isFetching === false) {
        if (view === 'gallery') {
          return /*#__PURE__*/_react["default"].createElement(GalleryView, {
            windowId: windowId
          });
        }

        if (videoResources.length > 0) {
          return /*#__PURE__*/_react["default"].createElement(VideoViewer, {
            windowId: windowId
          });
        }

        if (audioResources.length > 0) {
          return /*#__PURE__*/_react["default"].createElement(AudioViewer, {
            windowId: windowId
          });
        }

        return /*#__PURE__*/_react["default"].createElement(WindowViewer, {
          windowId: windowId
        });
      }

      return null;
    }
    /**
     * Render the component
     */

  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          isCollectionDialogVisible = _this$props2.isCollectionDialogVisible,
          windowId = _this$props2.windowId,
          classes = _this$props2.classes;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])((0, _cssNs["default"])('primary-window'), classes.primaryWindow)
      }, /*#__PURE__*/_react["default"].createElement(_WindowSideBar["default"], {
        windowId: windowId
      }), /*#__PURE__*/_react["default"].createElement(_CompanionArea["default"], {
        windowId: windowId,
        position: "left"
      }), isCollectionDialogVisible && /*#__PURE__*/_react["default"].createElement(_CollectionDialog["default"], {
        windowId: windowId
      }), /*#__PURE__*/_react["default"].createElement(_react.Suspense, {
        fallback: /*#__PURE__*/_react["default"].createElement("div", null)
      }, this.renderViewer()));
    }
  }]);

  return PrimaryWindow;
}(_react.Component);

exports.PrimaryWindow = PrimaryWindow;
PrimaryWindow.defaultProps = {
  audioResources: [],
  isCollection: false,
  isCollectionDialogVisible: false,
  isFetching: false,
  videoResources: [],
  view: undefined
};