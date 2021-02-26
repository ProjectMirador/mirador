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
import classNames from 'classnames';
import CollapsibleSection from '../containers/CollapsibleSection';
import ns from '../config/css-ns';
import { PluginHook } from './PluginHook';
/**
 * ManifestRelatedLinks
 */

export var ManifestRelatedLinks = /*#__PURE__*/function (_Component) {
  _inherits(ManifestRelatedLinks, _Component);

  var _super = _createSuper(ManifestRelatedLinks);

  function ManifestRelatedLinks() {
    _classCallCheck(this, ManifestRelatedLinks);

    return _super.apply(this, arguments);
  }

  _createClass(ManifestRelatedLinks, [{
    key: "render",
    value:
    /**
     * render
     * @return
     */
    function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          homepage = _this$props.homepage,
          manifestUrl = _this$props.manifestUrl,
          renderings = _this$props.renderings,
          seeAlso = _this$props.seeAlso,
          id = _this$props.id,
          t = _this$props.t;
      return /*#__PURE__*/React.createElement(CollapsibleSection, {
        id: "".concat(id, "-related"),
        label: t('related')
      }, /*#__PURE__*/React.createElement(Typography, {
        "aria-labelledby": "".concat(id, "-related ").concat(id, "-related-heading"),
        id: "".concat(id, "-related-heading"),
        variant: "h4",
        component: "h5"
      }, t('links')), /*#__PURE__*/React.createElement("dl", {
        className: classNames(ns('label-value-metadata'), classes.labelValueMetadata)
      }, homepage && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Typography, {
        variant: "subtitle2",
        component: "dt"
      }, t('iiif_homepage')), homepage.map(function (page) {
        return /*#__PURE__*/React.createElement(Typography, {
          key: page.value,
          variant: "body1",
          component: "dd"
        }, /*#__PURE__*/React.createElement(Link, {
          target: "_blank",
          rel: "noopener noreferrer",
          href: page.value
        }, page.label || page.value));
      })), renderings && renderings.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Typography, {
        variant: "subtitle2",
        component: "dt"
      }, t('iiif_renderings')), renderings.map(function (rendering) {
        return /*#__PURE__*/React.createElement(Typography, {
          key: rendering.value,
          variant: "body1",
          component: "dd"
        }, /*#__PURE__*/React.createElement(Link, {
          target: "_blank",
          rel: "noopener noreferrer",
          href: rendering.value
        }, rendering.label || rendering.value));
      })), seeAlso && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Typography, {
        variant: "subtitle2",
        component: "dt"
      }, t('iiif_seeAlso')), seeAlso.map(function (related) {
        return /*#__PURE__*/React.createElement(Typography, {
          key: related.value,
          variant: "body1",
          component: "dd"
        }, /*#__PURE__*/React.createElement(Link, {
          target: "_blank",
          rel: "noopener noreferrer",
          href: related.value
        }, related.label || related.value), related.format && /*#__PURE__*/React.createElement(Typography, {
          component: "span"
        }, "(".concat(related.format, ")")));
      })), manifestUrl && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Typography, {
        variant: "subtitle2",
        component: "dt"
      }, t('iiif_manifest')), /*#__PURE__*/React.createElement(Typography, {
        variant: "body1",
        component: "dd"
      }, /*#__PURE__*/React.createElement(Link, {
        target: "_blank",
        rel: "noopener noreferrer",
        href: manifestUrl
      }, manifestUrl)))), /*#__PURE__*/React.createElement(PluginHook, this.props));
    }
  }]);

  return ManifestRelatedLinks;
}(Component);
ManifestRelatedLinks.defaultProps = {
  homepage: null,
  manifestUrl: null,
  renderings: null,
  seeAlso: null,
  t: function t(key) {
    return key;
  }
};