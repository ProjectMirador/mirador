"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRnd = require("react-rnd");

var _reactResizeObserver = _interopRequireDefault(require("react-resize-observer"));

var _classnames = _interopRequireDefault(require("classnames"));

var _WorkspaceElasticWindow = _interopRequireDefault(require("../containers/WorkspaceElasticWindow"));

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

/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
var WorkspaceElastic = /*#__PURE__*/function (_React$Component) {
  _inherits(WorkspaceElastic, _React$Component);

  var _super = _createSuper(WorkspaceElastic);

  function WorkspaceElastic() {
    _classCallCheck(this, WorkspaceElastic);

    return _super.apply(this, arguments);
  }

  _createClass(WorkspaceElastic, [{
    key: "render",
    value:
    /**
     */
    function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          workspace = _this$props.workspace,
          elasticLayout = _this$props.elasticLayout,
          setWorkspaceViewportDimensions = _this$props.setWorkspaceViewportDimensions,
          setWorkspaceViewportPosition = _this$props.setWorkspaceViewportPosition;
      var viewportPosition = workspace.viewportPosition;
      var offsetX = workspace.width / 2;
      var offsetY = workspace.height / 2;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          height: '100%',
          position: 'relative',
          width: '100%'
        }
      }, /*#__PURE__*/_react["default"].createElement(_reactResizeObserver["default"], {
        onResize: function onResize(rect) {
          setWorkspaceViewportDimensions(rect);
        }
      }), /*#__PURE__*/_react["default"].createElement(_reactRnd.Rnd, {
        size: {
          height: workspace.height,
          width: workspace.width
        },
        position: {
          x: -1 * viewportPosition.x - offsetX,
          y: -1 * viewportPosition.y - offsetY
        },
        enableResizing: {
          bottom: false,
          bottomLeft: false,
          bottomRight: false,
          left: false,
          right: false,
          top: false,
          topLeft: false,
          topRight: false
        },
        onDragStop: function onDragStop(e, d) {
          setWorkspaceViewportPosition({
            x: -1 * d.x - offsetX,
            y: -1 * d.y - offsetY
          });
        },
        cancel: ".".concat((0, _cssNs["default"])('window')),
        className: (0, _classnames["default"])(classes.workspace, (0, _cssNs["default"])('workspace')),
        disableDragging: !workspace.draggingEnabled
      }, Object.keys(elasticLayout).map(function (windowId) {
        return /*#__PURE__*/_react["default"].createElement(_WorkspaceElasticWindow["default"], {
          key: windowId,
          windowId: windowId
        });
      })));
    }
  }]);

  return WorkspaceElastic;
}(_react["default"].Component);

var _default = WorkspaceElastic;
exports["default"] = _default;