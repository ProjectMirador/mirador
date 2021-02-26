"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchResults = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _ArrowBackSharp = _interopRequireDefault(require("@material-ui/icons/ArrowBackSharp"));

var _reactAriaLive = require("react-aria-live");

var _SearchHit = _interopRequireDefault(require("../containers/SearchHit"));

var _ScrollTo = require("./ScrollTo");

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

/** */
var SearchResults = /*#__PURE__*/function (_Component) {
  _inherits(SearchResults, _Component);

  var _super = _createSuper(SearchResults);

  /** */
  function SearchResults(props) {
    var _this;

    _classCallCheck(this, SearchResults);

    _this = _super.call(this, props);
    _this.state = {
      focused: false
    };
    _this.toggleFocus = _this.toggleFocus.bind(_assertThisInitialized(_this));
    return _this;
  }
  /** */


  _createClass(SearchResults, [{
    key: "toggleFocus",
    value: function toggleFocus() {
      var focused = this.state.focused;
      this.setState({
        focused: !focused
      });
    }
    /**
     * Return SearchHits for every hit in the response
     * Return SearchHits for every annotation in the response if there are no hits
     */

  }, {
    key: "renderSearchHitsAndAnnotations",
    value: function renderSearchHitsAndAnnotations(announcer) {
      var _this2 = this;

      var _this$props = this.props,
          companionWindowId = _this$props.companionWindowId,
          containerRef = _this$props.containerRef,
          searchAnnotations = _this$props.searchAnnotations,
          searchHits = _this$props.searchHits,
          windowId = _this$props.windowId;
      var focused = this.state.focused;

      if (searchHits.length === 0 && searchAnnotations.length > 0) {
        return searchAnnotations.map(function (anno, index) {
          return /*#__PURE__*/_react["default"].createElement(_SearchHit["default"], {
            announcer: announcer,
            annotationId: anno.id,
            companionWindowId: companionWindowId,
            containerRef: containerRef,
            key: anno.id,
            focused: focused,
            index: index,
            total: searchAnnotations.length,
            windowId: windowId,
            showDetails: _this2.toggleFocus
          });
        });
      }

      return searchHits.map(function (hit, index) {
        return /*#__PURE__*/_react["default"].createElement(_SearchHit["default"], {
          announcer: announcer,
          containerRef: containerRef,
          companionWindowId: companionWindowId,
          key: hit.annotations[0],
          focused: focused,
          hit: hit,
          index: index,
          total: searchHits.length,
          windowId: windowId,
          showDetails: _this2.toggleFocus
        });
      });
    }
    /** */

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          classes = _this$props2.classes,
          companionWindowId = _this$props2.companionWindowId,
          containerRef = _this$props2.containerRef,
          isFetching = _this$props2.isFetching,
          fetchSearch = _this$props2.fetchSearch,
          nextSearch = _this$props2.nextSearch,
          query = _this$props2.query,
          searchAnnotations = _this$props2.searchAnnotations,
          searchHits = _this$props2.searchHits,
          t = _this$props2.t,
          windowId = _this$props2.windowId;
      var focused = this.state.focused;
      var noResultsState = query && !isFetching && searchHits.length === 0 && searchAnnotations.length === 0;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, focused && /*#__PURE__*/_react["default"].createElement(_ScrollTo.ScrollTo, {
        containerRef: containerRef,
        offsetTop: 96,
        scrollTo: true
      }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        onClick: this.toggleFocus,
        className: classes.navigation,
        size: "small"
      }, /*#__PURE__*/_react["default"].createElement(_ArrowBackSharp["default"], null), t('backToResults'))), noResultsState && /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        className: classes.noResults
      }, t('searchNoResults')), /*#__PURE__*/_react["default"].createElement(_List["default"], {
        disablePadding: true
      }, /*#__PURE__*/_react["default"].createElement(_reactAriaLive.LiveMessenger, null, function (_ref) {
        var announcePolite = _ref.announcePolite;
        return _this3.renderSearchHitsAndAnnotations(announcePolite);
      })), nextSearch && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        color: "secondary",
        onClick: function onClick() {
          return fetchSearch(windowId, companionWindowId, nextSearch, query);
        }
      }, t('moreResults')));
    }
  }]);

  return SearchResults;
}(_react.Component);

exports.SearchResults = SearchResults;
SearchResults.defaultProps = {
  classes: {},
  containerRef: undefined,
  isFetching: false,
  nextSearch: undefined,
  query: undefined,
  searchAnnotations: [],
  searchHits: [],
  t: function t(k) {
    return k;
  }
};