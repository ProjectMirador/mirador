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
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Skeleton from '@material-ui/lab/Skeleton';
import { Img } from 'react-image';
import CompanionWindow from '../containers/CompanionWindow';
import { LabelValueMetadata } from './LabelValueMetadata';
import ns from '../config/css-ns';
import { PluginHook } from './PluginHook';
/**
 * WindowSideBarInfoPanel
 */

export var AttributionPanel = /*#__PURE__*/function (_Component) {
  _inherits(AttributionPanel, _Component);

  var _super = _createSuper(AttributionPanel);

  function AttributionPanel() {
    _classCallCheck(this, AttributionPanel);

    return _super.apply(this, arguments);
  }

  _createClass(AttributionPanel, [{
    key: "render",
    value:
    /**
     * render
     * @return
     */
    function render() {
      var _this$props = this.props,
          manifestLogo = _this$props.manifestLogo,
          requiredStatement = _this$props.requiredStatement,
          rights = _this$props.rights,
          windowId = _this$props.windowId,
          id = _this$props.id,
          classes = _this$props.classes,
          t = _this$props.t;
      return /*#__PURE__*/React.createElement(CompanionWindow, {
        title: t('attributionTitle'),
        paperClassName: ns('attribution-panel'),
        windowId: windowId,
        id: id
      }, /*#__PURE__*/React.createElement("div", {
        className: classes.section
      }, requiredStatement && /*#__PURE__*/React.createElement(LabelValueMetadata, {
        labelValuePairs: requiredStatement,
        defaultLabel: t('attribution')
      }), rights && rights.length > 0 && /*#__PURE__*/React.createElement("dl", {
        className: ns('label-value-metadata')
      }, /*#__PURE__*/React.createElement(Typography, {
        variant: "subtitle2",
        component: "dt"
      }, t('rights')), rights.map(function (v) {
        return /*#__PURE__*/React.createElement(Typography, {
          variant: "body1",
          component: "dd",
          key: v.toString()
        }, /*#__PURE__*/React.createElement(Link, {
          target: "_blank",
          rel: "noopener noreferrer",
          href: v
        }, v));
      }))), manifestLogo && /*#__PURE__*/React.createElement("div", {
        className: classes.section
      }, /*#__PURE__*/React.createElement(Img, {
        src: [manifestLogo],
        alt: "",
        role: "presentation",
        className: classes.logo,
        unloader: /*#__PURE__*/React.createElement(Skeleton, {
          className: classes.placeholder,
          variant: "rect",
          height: 60,
          width: 60
        })
      })), /*#__PURE__*/React.createElement(PluginHook, this.props));
    }
  }]);

  return AttributionPanel;
}(Component);
AttributionPanel.defaultProps = {
  classes: {},
  manifestLogo: null,
  requiredStatement: null,
  rights: null,
  t: function t(key) {
    return key;
  }
};