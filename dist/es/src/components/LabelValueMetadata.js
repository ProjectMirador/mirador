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
import SanitizedHtml from '../containers/SanitizedHtml';
import ns from '../config/css-ns';
/**
 * Renders label/value pair metadata in a dl
 * @prop {object} labelValuePair
 */

export var LabelValueMetadata = /*#__PURE__*/function (_Component) {
  _inherits(LabelValueMetadata, _Component);

  var _super = _createSuper(LabelValueMetadata);

  function LabelValueMetadata() {
    _classCallCheck(this, LabelValueMetadata);

    return _super.apply(this, arguments);
  }

  _createClass(LabelValueMetadata, [{
    key: "render",
    value:
    /**
     * render
     * @return {String} - HTML markup for the component
     */
    function render() {
      var _this$props = this.props,
          defaultLabel = _this$props.defaultLabel,
          labelValuePairs = _this$props.labelValuePairs;

      if (labelValuePairs.length === 0) {
        return /*#__PURE__*/React.createElement(React.Fragment, null);
      }
      /* eslint-disable react/no-array-index-key */
      // Disabling array index key for dt/dd elements as
      // they are intended to display metadata that will not
      // need to be re-rendered internally in any meaningful way


      return /*#__PURE__*/React.createElement("dl", {
        className: ns('label-value-metadata')
      }, labelValuePairs.reduce(function (acc, labelValuePair, i) {
        return acc.concat([/*#__PURE__*/React.createElement(Typography, {
          component: "dt",
          key: "label-".concat(i),
          variant: "subtitle2"
        }, labelValuePair.label || defaultLabel), /*#__PURE__*/React.createElement(Typography, {
          style: {
            marginBottom: '.5em',
            marginLeft: '0px'
          },
          component: "dd",
          key: "value-".concat(i),
          variant: "body1"
        }, /*#__PURE__*/React.createElement(SanitizedHtml, {
          htmlString: labelValuePair.values.join(', '),
          ruleSet: "iiif"
        }))]);
      }, []));
      /* eslint-enable react/no-array-index-key */
    }
  }]);

  return LabelValueMetadata;
}(Component);
LabelValueMetadata.defaultProps = {
  defaultLabel: undefined
};