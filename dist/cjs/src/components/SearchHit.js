"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchHit = void 0;

var _react = _interopRequireWildcard(require("react"));

var _clsx2 = _interopRequireDefault(require("clsx"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Chip = _interopRequireDefault(require("@material-ui/core/Chip"));

var _SanitizedHtml = _interopRequireDefault(require("../containers/SanitizedHtml"));

var _TruncatedHit = _interopRequireDefault(require("../lib/TruncatedHit"));

var _ScrollTo = require("./ScrollTo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

/** */
var SearchHit = /*#__PURE__*/function (_Component) {
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
      var truncatedHit = new _TruncatedHit["default"](hit, annotation);
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
      var truncatedHit = focused ? hit : hit && new _TruncatedHit["default"](hit, annotation);
      var truncated = hit && truncatedHit.before !== hit.before && truncatedHit.after !== hit.after;
      var canvasLabelHtmlId = "".concat(companionWindowId, "-").concat(index);
      return /*#__PURE__*/_react["default"].createElement(_ScrollTo.ScrollTo, {
        containerRef: containerRef,
        offsetTop: 96 // offset for the height of the form above
        ,
        scrollTo: windowSelected && !focused
      }, /*#__PURE__*/_react["default"].createElement(_ListItem["default"], {
        className: (0, _clsx2["default"])(classes.listItem, (_clsx = {}, _defineProperty(_clsx, classes.adjacent, adjacent), _defineProperty(_clsx, classes.selected, selected), _defineProperty(_clsx, classes.focused, focused), _defineProperty(_clsx, classes.windowSelected, windowSelected), _clsx)),
        button: !selected,
        component: "li",
        onClick: this.handleClick,
        selected: selected
      }, /*#__PURE__*/_react["default"].createElement(_ListItemText["default"], {
        primaryTypographyProps: {
          variant: 'body1'
        }
      }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "subtitle2",
        className: classes.subtitle
      }, /*#__PURE__*/_react["default"].createElement(_Chip["default"], {
        component: "span",
        label: index + 1,
        className: classes.hitCounter
      }), /*#__PURE__*/_react["default"].createElement("span", {
        id: canvasLabelHtmlId
      }, canvasLabel)), annotationLabel && /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "subtitle2"
      }, annotationLabel), hit && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_SanitizedHtml["default"], {
        ruleSet: "iiif",
        htmlString: truncatedHit.before
      }), ' ', /*#__PURE__*/_react["default"].createElement("strong", null, /*#__PURE__*/_react["default"].createElement(_SanitizedHtml["default"], {
        ruleSet: "iiif",
        htmlString: truncatedHit.match
      })), ' ', /*#__PURE__*/_react["default"].createElement(_SanitizedHtml["default"], {
        ruleSet: "iiif",
        htmlString: truncatedHit.after
      }), ' ', truncated && !focused && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        className: classes.inlineButton,
        onClick: showDetails,
        color: "secondary",
        size: "small",
        "aria-describedby": canvasLabelHtmlId
      }, t('more'))), !hit && annotation && /*#__PURE__*/_react["default"].createElement(_SanitizedHtml["default"], {
        ruleSet: "iiif",
        htmlString: annotation.chars
      }))));
    }
  }]);

  return SearchHit;
}(_react.Component);

exports.SearchHit = SearchHit;
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