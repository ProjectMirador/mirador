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

import React, { Component } from 'react';
import classNames from 'classnames';
import ErrorDialog from '../containers/ErrorDialog';
import WorkspaceControlPanel from '../containers/WorkspaceControlPanel';
import Workspace from '../containers/Workspace';
import WorkspaceAdd from '../containers/WorkspaceAdd';
import BackgroundPluginArea from '../containers/BackgroundPluginArea';
import ns from '../config/css-ns';
/**
 * This is the top level Mirador component.
 * @prop {Object} manifests
 */

export var WorkspaceArea = /*#__PURE__*/function (_Component) {
  _inherits(WorkspaceArea, _Component);

  var _super = _createSuper(WorkspaceArea);

  function WorkspaceArea() {
    _classCallCheck(this, WorkspaceArea);

    return _super.apply(this, arguments);
  }

  _createClass(WorkspaceArea, [{
    key: "render",
    value:
    /**
     * render
     * @return {String} - HTML markup for the component
     */
    function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          controlPanelVariant = _this$props.controlPanelVariant,
          isWorkspaceAddVisible = _this$props.isWorkspaceAddVisible,
          isWorkspaceControlPanelVisible = _this$props.isWorkspaceControlPanelVisible,
          lang = _this$props.lang,
          t = _this$props.t;
      return /*#__PURE__*/React.createElement(React.Fragment, null, isWorkspaceControlPanelVisible && /*#__PURE__*/React.createElement(WorkspaceControlPanel, {
        variant: controlPanelVariant
      }), /*#__PURE__*/React.createElement("main", {
        className: classNames(classes.viewer, ns('viewer')),
        lang: lang,
        "aria-label": t('workspace')
      }, isWorkspaceAddVisible ? /*#__PURE__*/React.createElement(WorkspaceAdd, null) : /*#__PURE__*/React.createElement(Workspace, null), /*#__PURE__*/React.createElement(ErrorDialog, null), /*#__PURE__*/React.createElement(BackgroundPluginArea, null)));
    }
  }]);

  return WorkspaceArea;
}(Component);
WorkspaceArea.defaultProps = {
  controlPanelVariant: undefined,
  isWorkspaceAddVisible: false,
  lang: undefined
};