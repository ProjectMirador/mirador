"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasAnnotations = void 0;

var _react = _interopRequireWildcard(require("react"));

var _clsx2 = _interopRequireDefault(require("clsx"));

var _Chip = _interopRequireDefault(require("@material-ui/core/Chip"));

var _MenuList = _interopRequireDefault(require("@material-ui/core/MenuList"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _SanitizedHtml = _interopRequireDefault(require("../containers/SanitizedHtml"));

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

/**
 * CanvasAnnotations ~
*/
var CanvasAnnotations = /*#__PURE__*/function (_Component) {
  _inherits(CanvasAnnotations, _Component);

  var _super = _createSuper(CanvasAnnotations);

  /**
   * constructor -
   */
  function CanvasAnnotations(props) {
    var _this;

    _classCallCheck(this, CanvasAnnotations);

    _this = _super.call(this, props);
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.handleAnnotationHover = _this.handleAnnotationHover.bind(_assertThisInitialized(_this));
    _this.handleAnnotationBlur = _this.handleAnnotationBlur.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * Handle click event of an annotation.
  */


  _createClass(CanvasAnnotations, [{
    key: "handleClick",
    value: function handleClick(event, annotation) {
      var _this$props = this.props,
          deselectAnnotation = _this$props.deselectAnnotation,
          selectAnnotation = _this$props.selectAnnotation,
          selectedAnnotationId = _this$props.selectedAnnotationId,
          windowId = _this$props.windowId;

      if (selectedAnnotationId === annotation.id) {
        deselectAnnotation(windowId, annotation.id);
      } else {
        selectAnnotation(windowId, annotation.id);
      }
    }
    /** */

  }, {
    key: "handleAnnotationHover",
    value: function handleAnnotationHover(annotation) {
      var _this$props2 = this.props,
          hoverAnnotation = _this$props2.hoverAnnotation,
          windowId = _this$props2.windowId;
      hoverAnnotation(windowId, [annotation.id]);
    }
    /** */

  }, {
    key: "handleAnnotationBlur",
    value: function handleAnnotationBlur() {
      var _this$props3 = this.props,
          hoverAnnotation = _this$props3.hoverAnnotation,
          windowId = _this$props3.windowId;
      hoverAnnotation(windowId, []);
    }
    /**
     * Returns the rendered component
    */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          annotations = _this$props4.annotations,
          classes = _this$props4.classes,
          index = _this$props4.index,
          label = _this$props4.label,
          selectedAnnotationId = _this$props4.selectedAnnotationId,
          t = _this$props4.t,
          totalSize = _this$props4.totalSize,
          listContainerComponent = _this$props4.listContainerComponent,
          htmlSanitizationRuleSet = _this$props4.htmlSanitizationRuleSet,
          hoveredAnnotationIds = _this$props4.hoveredAnnotationIds;
      if (annotations.length === 0) return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        className: classes.sectionHeading,
        variant: "overline"
      }, t('annotationCanvasLabel', {
        context: "".concat(index + 1, "/").concat(totalSize),
        label: label
      })), /*#__PURE__*/_react["default"].createElement(_MenuList["default"], {
        autoFocusItem: true,
        variant: "selectedMenu"
      }, annotations.map(function (annotation) {
        return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
          button: true,
          component: listContainerComponent,
          className: (0, _clsx2["default"])(classes.annotationListItem, _defineProperty({}, classes.hovered, hoveredAnnotationIds.includes(annotation.id))),
          key: annotation.id,
          annotationid: annotation.id,
          selected: selectedAnnotationId === annotation.id,
          onClick: function onClick(e) {
            return _this2.handleClick(e, annotation);
          },
          onFocus: function onFocus() {
            return _this2.handleAnnotationHover(annotation);
          },
          onBlur: _this2.handleAnnotationBlur,
          onMouseEnter: function onMouseEnter() {
            return _this2.handleAnnotationHover(annotation);
          },
          onMouseLeave: _this2.handleAnnotationBlur
        }, /*#__PURE__*/_react["default"].createElement(_ListItemText["default"], {
          primaryTypographyProps: {
            variant: 'body2'
          }
        }, /*#__PURE__*/_react["default"].createElement(_SanitizedHtml["default"], {
          ruleSet: htmlSanitizationRuleSet,
          htmlString: annotation.content
        }), /*#__PURE__*/_react["default"].createElement("div", null, annotation.tags.map(function (tag) {
          return /*#__PURE__*/_react["default"].createElement(_Chip["default"], {
            size: "small",
            variant: "outlined",
            label: tag,
            id: tag,
            className: classes.chip,
            key: tag.toString()
          });
        }))));
      })));
    }
  }]);

  return CanvasAnnotations;
}(_react.Component);

exports.CanvasAnnotations = CanvasAnnotations;
CanvasAnnotations.defaultProps = {
  annotations: [],
  classes: {},
  hoveredAnnotationIds: [],
  htmlSanitizationRuleSet: 'iiif',
  listContainerComponent: 'li',
  selectedAnnotationId: undefined
};