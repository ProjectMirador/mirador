function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import SanitizedHtml from '../containers/SanitizedHtml';
import TruncatedHit from '../lib/TruncatedHit';
import { ScrollTo } from './ScrollTo';
/** */

export var SearchHit = /*#__PURE__*/function (_Component) {
  _inherits(SearchHit, _Component);

  var _super = _createSuper(SearchHit);

  /** */
  function SearchHit(props) {
    var _this;

    _classCallCheck(this, SearchHit);

    _this = _super.call(this, props);
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * Announce the annotation content if the component is mounted selected
   */


  _createClass(SearchHit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var selected = this.props.selected;
      if (selected) this.announceHit();
    }
    /**
     * Announce hit if the hit has been selected
     */

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var selected = this.props.selected;

      if (selected && selected !== prevProps.selected) {
        this.announceHit();
      }
    }
    /** */

  }, {
    key: "handleClick",
    value: function handleClick() {
      var _this$props = this.props,
          annotation = _this$props.annotation,
          annotationId = _this$props.annotationId,
          selectAnnotation = _this$props.selectAnnotation;
      if (annotation && annotationId) selectAnnotation(annotationId);
    }
    /**
     * Pass content describing the hit to the announcer prop (intended for screen readers)
     */

  }, {
    key: "announceHit",
    value: function announceHit() {
      var _this$props2 = this.props,
          annotation = _this$props2.annotation,
          annotationLabel = _this$props2.annotationLabel,
          announcer = _this$props2.announcer,
          canvasLabel = _this$props2.canvasLabel,
          hit = _this$props2.hit,
          index = _this$props2.index,
          t = _this$props2.t,
          total = _this$props2.total;
      if (!hit) return;
      var truncatedHit = new TruncatedHit(hit, annotation);
      announcer([t('pagination', {
        current: index + 1,
        total: total
      }), canvasLabel, annotationLabel, truncatedHit.before, truncatedHit.match, truncatedHit.after].join(' '));
    }
    /** */

  }, {
    key: "render",
    value: function render() {
      var _clsx;

      var _this$props3 = this.props,
          adjacent = _this$props3.adjacent,
          annotation = _this$props3.annotation,
          annotationLabel = _this$props3.annotationLabel,
          canvasLabel = _this$props3.canvasLabel,
          classes = _this$props3.classes,
          companionWindowId = _this$props3.companionWindowId,
          containerRef = _this$props3.containerRef,
          hit = _this$props3.hit,
          focused = _this$props3.focused,
          index = _this$props3.index,
          showDetails = _this$props3.showDetails,
          selected = _this$props3.selected,
          t = _this$props3.t,
          windowSelected = _this$props3.windowSelected;
      if (focused && !selected) return null;
      var truncatedHit = focused ? hit : hit && new TruncatedHit(hit, annotation);
      var truncated = hit && truncatedHit.before !== hit.before && truncatedHit.after !== hit.after;
      var canvasLabelHtmlId = "".concat(companionWindowId, "-").concat(index);
      return /*#__PURE__*/React.createElement(ScrollTo, {
        containerRef: containerRef,
        offsetTop: 96 // offset for the height of the form above
        ,
        scrollTo: windowSelected && !focused
      }, /*#__PURE__*/React.createElement(ListItem, {
        className: clsx(classes.listItem, (_clsx = {}, _defineProperty(_clsx, classes.adjacent, adjacent), _defineProperty(_clsx, classes.selected, selected), _defineProperty(_clsx, classes.focused, focused), _defineProperty(_clsx, classes.windowSelected, windowSelected), _clsx)),
        button: !selected,
        component: "li",
        onClick: this.handleClick,
        selected: selected
      }, /*#__PURE__*/React.createElement(ListItemText, {
        primaryTypographyProps: {
          variant: 'body1'
        }
      }, /*#__PURE__*/React.createElement(Typography, {
        variant: "subtitle2",
        className: classes.subtitle
      }, /*#__PURE__*/React.createElement(Chip, {
        component: "span",
        label: index + 1,
        className: classes.hitCounter
      }), /*#__PURE__*/React.createElement("span", {
        id: canvasLabelHtmlId
      }, canvasLabel)), annotationLabel && /*#__PURE__*/React.createElement(Typography, {
        variant: "subtitle2"
      }, annotationLabel), hit && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SanitizedHtml, {
        ruleSet: "iiif",
        htmlString: truncatedHit.before
      }), ' ', /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement(SanitizedHtml, {
        ruleSet: "iiif",
        htmlString: truncatedHit.match
      })), ' ', /*#__PURE__*/React.createElement(SanitizedHtml, {
        ruleSet: "iiif",
        htmlString: truncatedHit.after
      }), ' ', truncated && !focused && /*#__PURE__*/React.createElement(Button, {
        className: classes.inlineButton,
        onClick: showDetails,
        color: "secondary",
        size: "small",
        "aria-describedby": canvasLabelHtmlId
      }, t('more'))), !hit && annotation && /*#__PURE__*/React.createElement(SanitizedHtml, {
        ruleSet: "iiif",
        htmlString: annotation.chars
      }))));
    }
  }]);

  return SearchHit;
}(Component);
SearchHit.defaultProps = {
  adjacent: false,
  annotation: undefined,
  annotationId: undefined,
  annotationLabel: undefined,
  canvasLabel: undefined,
  classes: {},
  companionWindowId: undefined,
  containerRef: undefined,
  focused: false,
  hit: undefined,
  index: undefined,
  selectAnnotation: function selectAnnotation() {},
  selected: false,
  showDetails: function showDetails() {},
  t: function t(k) {
    return k;
  },
  total: undefined,
  windowSelected: false
};