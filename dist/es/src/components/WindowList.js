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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ns from '../config/css-ns';
/**
 */

export var WindowList = /*#__PURE__*/function (_Component) {
  _inherits(WindowList, _Component);

  var _super = _createSuper(WindowList);

  function WindowList() {
    _classCallCheck(this, WindowList);

    return _super.apply(this, arguments);
  }

  _createClass(WindowList, [{
    key: "titleContent",
    value:
    /**
     * Get the title for a window from its manifest title
     * @private
     */
    function titleContent(windowId) {
      var _this$props = this.props,
          titles = _this$props.titles,
          t = _this$props.t;
      return titles[windowId] || t('untitled');
    }
    /**
     * render
     * @return
     */

  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props2 = this.props,
          containerId = _this$props2.containerId,
          handleClose = _this$props2.handleClose,
          anchorEl = _this$props2.anchorEl,
          windowIds = _this$props2.windowIds,
          focusWindow = _this$props2.focusWindow,
          t = _this$props2.t;
      return /*#__PURE__*/React.createElement(Menu, {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        transformOrigin: {
          horizontal: 'left',
          vertical: 'top'
        },
        id: "window-list-menu",
        container: document.querySelector("#".concat(containerId, " .").concat(ns('viewer'))),
        disableAutoFocusItem: true,
        anchorEl: anchorEl,
        open: Boolean(anchorEl),
        onClose: handleClose,
        onEntering: WindowList.focus2ndListIitem
      }, /*#__PURE__*/React.createElement(ListSubheader, {
        role: "presentation",
        selected: false,
        disabled: true,
        tabIndex: "-1"
      }, t('openWindows')), windowIds.map(function (windowId, i) {
        return /*#__PURE__*/React.createElement(MenuItem, {
          key: windowId,
          onClick: function onClick(e) {
            focusWindow(windowId, true);
            handleClose(e);
          }
        }, /*#__PURE__*/React.createElement(ListItemText, {
          primaryTypographyProps: {
            variant: 'body1'
          }
        }, _this.titleContent(windowId)));
      }));
    }
  }], [{
    key: "focus2ndListIitem",
    value:
    /**
     * Given the menuElement passed in by the onEntering callback,
     * find the 2nd ListItem element (avoiding the header) and focus it
    */
    function focus2ndListIitem(menuElement) {
      if (!menuElement.querySelectorAll('li') || menuElement.querySelectorAll('li').length < 2) return;
      menuElement.querySelectorAll('li')[1].focus(); // The 2nd LI
    }
  }]);

  return WindowList;
}(Component);
WindowList.defaultProps = {
  anchorEl: null,
  t: function t(key) {
    return key;
  },
  titles: {}
};