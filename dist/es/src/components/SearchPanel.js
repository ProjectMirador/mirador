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
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import CompanionWindow from '../containers/CompanionWindow';
import SearchPanelControls from '../containers/SearchPanelControls';
import SearchResults from '../containers/SearchResults';
/** */

export var SearchPanel = /*#__PURE__*/function (_Component) {
  _inherits(SearchPanel, _Component);

  var _super = _createSuper(SearchPanel);

  /** */
  function SearchPanel(props) {
    var _this;

    _classCallCheck(this, SearchPanel);

    _this = _super.call(this, props);
    _this.containerRef = /*#__PURE__*/React.createRef();
    return _this;
  }
  /** */


  _createClass(SearchPanel, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          fetchSearch = _this$props.fetchSearch,
          windowId = _this$props.windowId,
          id = _this$props.id,
          query = _this$props.query,
          removeSearch = _this$props.removeSearch,
          searchService = _this$props.searchService,
          suggestedSearches = _this$props.suggestedSearches,
          t = _this$props.t;
      return /*#__PURE__*/React.createElement(CompanionWindow, {
        ariaLabel: t('searchTitle'),
        title: /*#__PURE__*/React.createElement(React.Fragment, null, t('searchTitle'), query && query !== '' && /*#__PURE__*/React.createElement(Chip, {
          className: classes.clearChip,
          color: "secondary",
          label: t('clearSearch'),
          onClick: removeSearch,
          onDelete: removeSearch,
          size: "small",
          variant: "outlined"
        })),
        windowId: windowId,
        id: id,
        titleControls: /*#__PURE__*/React.createElement(SearchPanelControls, {
          companionWindowId: id,
          windowId: windowId
        }),
        ref: this.containerRef
      }, /*#__PURE__*/React.createElement(SearchResults, {
        containerRef: this.containerRef,
        companionWindowId: id,
        windowId: windowId
      }), fetchSearch && suggestedSearches && query === '' && suggestedSearches.map(function (search) {
        return /*#__PURE__*/React.createElement(Typography, {
          component: "p",
          key: search,
          variant: "body1"
        }, /*#__PURE__*/React.createElement(Button, {
          className: classes.inlineButton,
          color: "secondary",
          onClick: function onClick() {
            return fetchSearch("".concat(searchService.id, "?q=").concat(search), search);
          }
        }, t('suggestSearch', {
          query: search
        })));
      }));
    }
  }]);

  return SearchPanel;
}(Component);
SearchPanel.defaultProps = {
  classes: {},
  fetchSearch: undefined,
  query: '',
  suggestedSearches: [],
  t: function t(key) {
    return key;
  }
};