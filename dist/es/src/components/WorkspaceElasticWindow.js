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

import React from 'react';
import { Rnd } from 'react-rnd';
import Window from '../containers/Window';
import ns from '../config/css-ns';
/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */

var WorkspaceElasticWindow = /*#__PURE__*/function (_React$Component) {
  _inherits(WorkspaceElasticWindow, _React$Component);

  var _super = _createSuper(WorkspaceElasticWindow);

  function WorkspaceElasticWindow() {
    _classCallCheck(this, WorkspaceElasticWindow);

    return _super.apply(this, arguments);
  }

  _createClass(WorkspaceElasticWindow, [{
    key: "render",
    value:
    /**
     */
    function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          companionWindowDimensions = _this$props.companionWindowDimensions,
          focused = _this$props.focused,
          layout = _this$props.layout,
          workspace = _this$props.workspace,
          updateElasticWindowLayout = _this$props.updateElasticWindowLayout;
      var offsetX = workspace.width / 2;
      var offsetY = workspace.height / 2;
      return /*#__PURE__*/React.createElement(Rnd, {
        key: "".concat(layout.windowId, "-").concat(workspace.id),
        size: {
          height: layout.height + companionWindowDimensions.height,
          width: layout.width + companionWindowDimensions.width
        },
        position: {
          x: layout.x + offsetX,
          y: layout.y + offsetY
        },
        bounds: "parent",
        onDragStop: function onDragStop(e, d) {
          updateElasticWindowLayout(layout.windowId, {
            x: d.x - offsetX,
            y: d.y - offsetY
          });
        },
        onResize: function onResize(e, direction, ref, delta, position) {
          updateElasticWindowLayout(layout.windowId, {
            height: Number.parseInt(ref.style.height, 10) - companionWindowDimensions.height,
            width: Number.parseInt(ref.style.width, 10) - companionWindowDimensions.width,
            x: position.x - offsetX,
            y: position.y - offsetY
          });
        },
        dragHandleClassName: ns('window-top-bar'),
        className: focused ? classes.focused : null
      }, /*#__PURE__*/React.createElement(Window, {
        windowId: layout.windowId
      }));
    }
  }]);

  return WorkspaceElasticWindow;
}(React.Component);

WorkspaceElasticWindow.defaultProps = {
  classes: {},
  companionWindowDimensions: {
    height: 0,
    width: 0
  },
  focused: false
};
export default WorkspaceElasticWindow;