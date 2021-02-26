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
import DOMPurify from 'dompurify';
import ns from '../config/css-ns';
import htmlRules from '../lib/htmlRules';
/**
*/

export var SanitizedHtml = /*#__PURE__*/function (_Component) {
  _inherits(SanitizedHtml, _Component);

  var _super = _createSuper(SanitizedHtml);

  function SanitizedHtml() {
    _classCallCheck(this, SanitizedHtml);

    return _super.apply(this, arguments);
  }

  _createClass(SanitizedHtml, [{
    key: "render",
    value:
    /**
    */
    function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          htmlString = _this$props.htmlString,
          ruleSet = _this$props.ruleSet; // Add a hook to make all links open a new window

      DOMPurify.addHook('afterSanitizeAttributes', function (node) {
        // set all elements owning target to target=_blank
        if ('target' in node) {
          node.setAttribute('target', '_blank'); // prevent https://www.owasp.org/index.php/Reverse_Tabnabbing

          node.setAttribute('rel', 'noopener noreferrer');
        }
      });
      return /*#__PURE__*/React.createElement("span", {
        className: [classes.root, ns('third-party-html')].join(' '),
        dangerouslySetInnerHTML: {
          // eslint-disable-line react/no-danger
          __html: DOMPurify.sanitize(htmlString, htmlRules[ruleSet])
        }
      });
    }
  }]);

  return SanitizedHtml;
}(Component);
SanitizedHtml.defaultProps = {
  classes: {}
};