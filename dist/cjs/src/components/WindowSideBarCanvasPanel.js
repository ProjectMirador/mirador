"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowSideBarCanvasPanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Tabs = _interopRequireDefault(require("@material-ui/core/Tabs"));

var _Tab = _interopRequireDefault(require("@material-ui/core/Tab"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _ReorderSharp = _interopRequireDefault(require("@material-ui/icons/ReorderSharp"));

var _SortSharp = _interopRequireDefault(require("@material-ui/icons/SortSharp"));

var _ViewListSharp = _interopRequireDefault(require("@material-ui/icons/ViewListSharp"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _ArrowForwardSharp = _interopRequireDefault(require("@material-ui/icons/ArrowForwardSharp"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _CompanionWindow = _interopRequireDefault(require("../containers/CompanionWindow"));

var _SidebarIndexList = _interopRequireDefault(require("../containers/SidebarIndexList"));

var _SidebarIndexTableOfContents = _interopRequireDefault(require("../containers/SidebarIndexTableOfContents"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
 * a panel showing the canvases for a given manifest
 */
var WindowSideBarCanvasPanel = /*#__PURE__*/function (_Component) {
  _inherits(WindowSideBarCanvasPanel, _Component);

  var _super = _createSuper(WindowSideBarCanvasPanel);

  /** */
  function WindowSideBarCanvasPanel(props) {
    var _this;

    _classCallCheck(this, WindowSideBarCanvasPanel);

    _this = _super.call(this, props);
    _this.handleSequenceChange = _this.handleSequenceChange.bind(_assertThisInitialized(_this));
    _this.handleVariantChange = _this.handleVariantChange.bind(_assertThisInitialized(_this));
    _this.containerRef = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }
  /** */


  _createClass(WindowSideBarCanvasPanel, [{
    key: "handleSequenceChange",
    value:
    /** @private */
    function handleSequenceChange(event) {
      var updateSequence = this.props.updateSequence;
      updateSequence(event.target.value);
    }
    /** @private */

  }, {
    key: "handleVariantChange",
    value: function handleVariantChange(event, value) {
      var updateVariant = this.props.updateVariant;
      updateVariant(value);
    }
    /**
     * render
     */

  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          collection = _this$props.collection,
          id = _this$props.id,
          showMultipart = _this$props.showMultipart,
          sequenceId = _this$props.sequenceId,
          sequences = _this$props.sequences,
          t = _this$props.t,
          variant = _this$props.variant,
          showToc = _this$props.showToc,
          windowId = _this$props.windowId;
      var listComponent;

      if (variant === 'tableOfContents') {
        listComponent = /*#__PURE__*/_react["default"].createElement(_SidebarIndexTableOfContents["default"], {
          id: id,
          containerRef: this.containerRef,
          windowId: windowId
        });
      } else {
        listComponent = /*#__PURE__*/_react["default"].createElement(_SidebarIndexList["default"], {
          id: id,
          containerRef: this.containerRef,
          windowId: windowId
        });
      }

      return /*#__PURE__*/_react["default"].createElement(_CompanionWindow["default"], {
        title: t('canvasIndex'),
        id: id,
        windowId: windowId,
        ref: this.containerRef,
        otherRef: this.containerRef,
        titleControls: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, sequences && sequences.length > 1 && /*#__PURE__*/_react["default"].createElement(_FormControl["default"], null, /*#__PURE__*/_react["default"].createElement(_Select["default"], {
          MenuProps: {
            anchorOrigin: {
              horizontal: 'left',
              vertical: 'bottom'
            },
            getContentAnchorEl: null
          },
          displayEmpty: true,
          value: sequenceId,
          onChange: this.handleSequenceChange,
          name: "sequenceId",
          classes: {
            select: classes.select
          },
          className: classes.selectEmpty
        }, sequences.map(function (s, i) {
          return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
            value: s.id,
            key: s.id
          }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
            variant: "body2"
          }, WindowSideBarCanvasPanel.getUseableLabel(s, i)));
        }))), /*#__PURE__*/_react["default"].createElement("div", {
          className: classes["break"]
        }), /*#__PURE__*/_react["default"].createElement(_Tabs["default"], {
          value: variant,
          onChange: this.handleVariantChange,
          variant: "fullWidth",
          indicatorColor: "primary",
          textColor: "primary"
        }, showToc && /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
          title: t('tableOfContentsList'),
          value: "tableOfContents"
        }, /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
          className: classes.variantTab,
          value: "tableOfContents",
          "aria-label": t('tableOfContentsList'),
          "aria-controls": "tab-panel-".concat(id),
          icon: /*#__PURE__*/_react["default"].createElement(_SortSharp["default"], {
            style: {
              transform: 'scale(-1, 1)'
            }
          })
        })), /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
          title: t('itemList'),
          value: "item"
        }, /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
          className: classes.variantTab,
          value: "item",
          "aria-label": t('itemList'),
          "aria-controls": "tab-panel-".concat(id),
          icon: /*#__PURE__*/_react["default"].createElement(_ReorderSharp["default"], null)
        })), /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
          title: t('thumbnailList'),
          value: "thumbnail"
        }, /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
          className: classes.variantTab,
          value: "thumbnail",
          "aria-label": t('thumbnailList'),
          "aria-controls": "tab-panel-".concat(id),
          icon: /*#__PURE__*/_react["default"].createElement(_ViewListSharp["default"], null)
        }))))
      }, /*#__PURE__*/_react["default"].createElement("div", {
        id: "tab-panel-".concat(id)
      }, collection && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        fullWidth: true,
        onClick: showMultipart,
        endIcon: /*#__PURE__*/_react["default"].createElement(_ArrowForwardSharp["default"], null)
      }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        className: classes.collectionNavigationButton
      }, WindowSideBarCanvasPanel.getUseableLabel(collection))), listComponent));
    }
  }], [{
    key: "getUseableLabel",
    value: function getUseableLabel(resource, index) {
      return resource && resource.getLabel && resource.getLabel().length > 0 ? resource.getLabel().getValue() : resource.id;
    }
  }]);

  return WindowSideBarCanvasPanel;
}(_react.Component);

exports.WindowSideBarCanvasPanel = WindowSideBarCanvasPanel;
WindowSideBarCanvasPanel.defaultProps = {
  collection: null,
  sequenceId: null,
  sequences: [],
  showToc: false
};