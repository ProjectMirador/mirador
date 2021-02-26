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
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDownSharp';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUpSharp';
import MiradorMenuButton from '../containers/MiradorMenuButton';
/**
 * CollapsableSection ~
*/

export var CollapsibleSection = /*#__PURE__*/function (_Component) {
  _inherits(CollapsibleSection, _Component);

  var _super = _createSuper(CollapsibleSection);

  /** */
  function CollapsibleSection(props) {
    var _this;

    _classCallCheck(this, CollapsibleSection);

    _this = _super.call(this, props);
    _this.state = {
      open: true
    };
    _this.toggleSection = _this.toggleSection.bind(_assertThisInitialized(_this));
    return _this;
  }
  /** */


  _createClass(CollapsibleSection, [{
    key: "toggleSection",
    value: function toggleSection() {
      var open = this.state.open;
      this.setState({
        open: !open
      });
    }
    /**
     * Returns the rendered component
    */

  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          classes = _this$props.classes,
          id = _this$props.id,
          label = _this$props.label,
          t = _this$props.t;
      var open = this.state.open;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: classes.container
      }, /*#__PURE__*/React.createElement(Typography, {
        className: classes.heading,
        id: id,
        onClick: this.toggleSection,
        variant: "overline",
        component: "h4"
      }, label), /*#__PURE__*/React.createElement(MiradorMenuButton, {
        "aria-label": t(open ? 'collapseSection' : 'expandSection', {
          section: label
        }),
        "aria-expanded": open,
        className: classes.button,
        onClick: this.toggleSection
      }, open ? /*#__PURE__*/React.createElement(KeyboardArrowUp, null) : /*#__PURE__*/React.createElement(KeyboardArrowDown, null))), open && children);
    }
  }]);

  return CollapsibleSection;
}(Component);