"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchPanelNavigation = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ChevronLeftSharp = _interopRequireDefault(require("@material-ui/icons/ChevronLeftSharp"));

var _ChevronRightSharp = _interopRequireDefault(require("@material-ui/icons/ChevronRightSharp"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _MiradorMenuButton = _interopRequireDefault(require("../containers/MiradorMenuButton"));

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
 * SearchPanelNavigation ~
*/
var SearchPanelNavigation = /*#__PURE__*/function (_Component) {
  _inherits(SearchPanelNavigation, _Component);

  var _super = _createSuper(SearchPanelNavigation);

  function SearchPanelNavigation() {
    _classCallCheck(this, SearchPanelNavigation);

    return _super.apply(this, arguments);
  }

  _createClass(SearchPanelNavigation, [{
    key: "nextSearchResult",
    value:
    /** */
    function nextSearchResult(currentHitIndex) {
      var _this$props = this.props,
          searchHits = _this$props.searchHits,
          selectAnnotation = _this$props.selectAnnotation;
      selectAnnotation(searchHits[currentHitIndex + 1].annotations[0]);
    }
    /** */

  }, {
    key: "previousSearchResult",
    value: function previousSearchResult(currentHitIndex) {
      var _this$props2 = this.props,
          searchHits = _this$props2.searchHits,
          selectAnnotation = _this$props2.selectAnnotation;
      selectAnnotation(searchHits[currentHitIndex - 1].annotations[0]);
    }
    /** */

  }, {
    key: "hasNextResult",
    value: function hasNextResult(currentHitIndex) {
      var searchHits = this.props.searchHits;
      if (searchHits.length === 0) return false;
      if (currentHitIndex < searchHits.length - 1) return true;
      return false;
    }
    /** */

  }, {
    key: "hasPreviousResult",
    value: function hasPreviousResult(currentHitIndex) {
      var searchHits = this.props.searchHits;
      if (searchHits.length === 0) return false;
      if (currentHitIndex > 0) return true;
      return false;
    }
    /**
     * Returns the rendered component
    */

  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props3 = this.props,
          searchHits = _this$props3.searchHits,
          selectedContentSearchAnnotation = _this$props3.selectedContentSearchAnnotation,
          classes = _this$props3.classes,
          t = _this$props3.t,
          direction = _this$props3.direction;
      var iconStyle = direction === 'rtl' ? {
        transform: 'rotate(180deg)'
      } : {};
      var currentHitIndex = searchHits.findIndex(function (val) {
        return val.annotations.includes(selectedContentSearchAnnotation[0]);
      });
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, searchHits.length > 0 && /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "body2",
        align: "center",
        classes: classes
      }, /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-label": t('searchPreviousResult'),
        disabled: !this.hasPreviousResult(currentHitIndex),
        onClick: function onClick() {
          return _this.previousSearchResult(currentHitIndex);
        }
      }, /*#__PURE__*/_react["default"].createElement(_ChevronLeftSharp["default"], {
        style: iconStyle
      })), /*#__PURE__*/_react["default"].createElement("span", {
        style: {
          unicodeBidi: 'plaintext'
        }
      }, t('pagination', {
        current: currentHitIndex + 1,
        total: searchHits.length
      })), /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-label": t('searchNextResult'),
        disabled: !this.hasNextResult(currentHitIndex),
        onClick: function onClick() {
          return _this.nextSearchResult(currentHitIndex);
        }
      }, /*#__PURE__*/_react["default"].createElement(_ChevronRightSharp["default"], {
        style: iconStyle
      }))));
    }
  }]);

  return SearchPanelNavigation;
}(_react.Component);

exports.SearchPanelNavigation = SearchPanelNavigation;
SearchPanelNavigation.defaultProps = {
  classes: {},
  searchHits: [],
  t: function t(key) {
    return key;
  }
};