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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import ItemListIcon from '@material-ui/icons/ReorderSharp';
import TocIcon from '@material-ui/icons/SortSharp';
import ThumbnailListIcon from '@material-ui/icons/ViewListSharp';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardSharp';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CompanionWindow from '../containers/CompanionWindow';
import SidebarIndexList from '../containers/SidebarIndexList';
import SidebarIndexTableOfContents from '../containers/SidebarIndexTableOfContents';
/**
 * a panel showing the canvases for a given manifest
 */

export var WindowSideBarCanvasPanel = /*#__PURE__*/function (_Component) {
  _inherits(WindowSideBarCanvasPanel, _Component);

  var _super = _createSuper(WindowSideBarCanvasPanel);

  /** */
  function WindowSideBarCanvasPanel(props) {
    var _this;

    _classCallCheck(this, WindowSideBarCanvasPanel);

    _this = _super.call(this, props);
    _this.handleSequenceChange = _this.handleSequenceChange.bind(_assertThisInitialized(_this));
    _this.handleVariantChange = _this.handleVariantChange.bind(_assertThisInitialized(_this));
    _this.containerRef = /*#__PURE__*/React.createRef();
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
        listComponent = /*#__PURE__*/React.createElement(SidebarIndexTableOfContents, {
          id: id,
          containerRef: this.containerRef,
          windowId: windowId
        });
      } else {
        listComponent = /*#__PURE__*/React.createElement(SidebarIndexList, {
          id: id,
          containerRef: this.containerRef,
          windowId: windowId
        });
      }

      return /*#__PURE__*/React.createElement(CompanionWindow, {
        title: t('canvasIndex'),
        id: id,
        windowId: windowId,
        ref: this.containerRef,
        otherRef: this.containerRef,
        titleControls: /*#__PURE__*/React.createElement(React.Fragment, null, sequences && sequences.length > 1 && /*#__PURE__*/React.createElement(FormControl, null, /*#__PURE__*/React.createElement(Select, {
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
          return /*#__PURE__*/React.createElement(MenuItem, {
            value: s.id,
            key: s.id
          }, /*#__PURE__*/React.createElement(Typography, {
            variant: "body2"
          }, WindowSideBarCanvasPanel.getUseableLabel(s, i)));
        }))), /*#__PURE__*/React.createElement("div", {
          className: classes["break"]
        }), /*#__PURE__*/React.createElement(Tabs, {
          value: variant,
          onChange: this.handleVariantChange,
          variant: "fullWidth",
          indicatorColor: "primary",
          textColor: "primary"
        }, showToc && /*#__PURE__*/React.createElement(Tooltip, {
          title: t('tableOfContentsList'),
          value: "tableOfContents"
        }, /*#__PURE__*/React.createElement(Tab, {
          className: classes.variantTab,
          value: "tableOfContents",
          "aria-label": t('tableOfContentsList'),
          "aria-controls": "tab-panel-".concat(id),
          icon: /*#__PURE__*/React.createElement(TocIcon, {
            style: {
              transform: 'scale(-1, 1)'
            }
          })
        })), /*#__PURE__*/React.createElement(Tooltip, {
          title: t('itemList'),
          value: "item"
        }, /*#__PURE__*/React.createElement(Tab, {
          className: classes.variantTab,
          value: "item",
          "aria-label": t('itemList'),
          "aria-controls": "tab-panel-".concat(id),
          icon: /*#__PURE__*/React.createElement(ItemListIcon, null)
        })), /*#__PURE__*/React.createElement(Tooltip, {
          title: t('thumbnailList'),
          value: "thumbnail"
        }, /*#__PURE__*/React.createElement(Tab, {
          className: classes.variantTab,
          value: "thumbnail",
          "aria-label": t('thumbnailList'),
          "aria-controls": "tab-panel-".concat(id),
          icon: /*#__PURE__*/React.createElement(ThumbnailListIcon, null)
        }))))
      }, /*#__PURE__*/React.createElement("div", {
        id: "tab-panel-".concat(id)
      }, collection && /*#__PURE__*/React.createElement(Button, {
        fullWidth: true,
        onClick: showMultipart,
        endIcon: /*#__PURE__*/React.createElement(ArrowForwardIcon, null)
      }, /*#__PURE__*/React.createElement(Typography, {
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
}(Component);
WindowSideBarCanvasPanel.defaultProps = {
  collection: null,
  sequenceId: null,
  sequences: [],
  showToc: false
};