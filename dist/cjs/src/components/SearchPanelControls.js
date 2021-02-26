"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchPanelControls = void 0;

var _react = _interopRequireWildcard(require("react"));

var _deburr = _interopRequireDefault(require("lodash/deburr"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _isObject = _interopRequireDefault(require("lodash/isObject"));

var _Autocomplete = _interopRequireDefault(require("@material-ui/lab/Autocomplete"));

var _CircularProgress = _interopRequireDefault(require("@material-ui/core/CircularProgress"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _SearchSharp = _interopRequireDefault(require("@material-ui/icons/SearchSharp"));

var _MiradorMenuButton = _interopRequireDefault(require("../containers/MiradorMenuButton"));

var _SearchPanelNavigation = _interopRequireDefault(require("../containers/SearchPanelNavigation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

/** Sometimes an autocomplete match can be a simple string, other times an object
    with a `match` property, this function abstracts that away */
var getMatch = function getMatch(option) {
  return (0, _isObject["default"])(option) ? option.match : option;
};
/** */


var SearchPanelControls = /*#__PURE__*/function (_Component) {
  _inherits(SearchPanelControls, _Component);

  var _super = _createSuper(SearchPanelControls);

  /** */
  function SearchPanelControls(props) {
    var _this;

    _classCallCheck(this, SearchPanelControls);

    _this = _super.call(this, props);
    _this.state = {
      search: props.query,
      suggestions: []
    };
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.submitSearch = _this.submitSearch.bind(_assertThisInitialized(_this));
    _this.getSuggestions = _this.getSuggestions.bind(_assertThisInitialized(_this));
    _this.selectItem = _this.selectItem.bind(_assertThisInitialized(_this));
    _this.fetchAutocomplete = (0, _debounce["default"])(_this.fetchAutocomplete.bind(_assertThisInitialized(_this)), 500);
    _this.receiveAutocomplete = _this.receiveAutocomplete.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * Update the query in the component state if the query has changed in the redux store
   */


  _createClass(SearchPanelControls, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var query = this.props.query;

      if (query !== prevProps.query) {
        // We are setting local state directly here ONLY when the query prop (from redux)
        // changed
        this.setState({
          // eslint-disable-line react/no-did-update-set-state
          search: query
        });
      }
    }
    /** */

  }, {
    key: "handleChange",
    value: function handleChange(event, value, reason) {
      // For some reason the value gets reset to an empty value from the
      // useAutocomplete hook sometimes, we just ignore these cases
      if (reason === 'reset' && !value) {
        return;
      }

      this.setState({
        search: value,
        suggestions: []
      });

      if (value) {
        this.fetchAutocomplete(value);
      }
    }
    /** */

  }, {
    key: "getSuggestions",
    value: function getSuggestions(value) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$showEmpty = _ref.showEmpty,
          showEmpty = _ref$showEmpty === void 0 ? false : _ref$showEmpty;

      var suggestions = this.state.suggestions;
      var inputValue = (0, _deburr["default"])(value.trim()).toLowerCase();
      var inputLength = inputValue.length;
      return inputLength === 0 && !showEmpty ? [] : suggestions;
    }
    /** */

  }, {
    key: "fetchAutocomplete",
    value: function fetchAutocomplete(value) {
      var autocompleteService = this.props.autocompleteService;
      if (!autocompleteService) return;
      if (!value) return;
      fetch("".concat(autocompleteService.id, "?q=").concat(value)).then(function (response) {
        return response.json();
      }).then(this.receiveAutocomplete);
    }
    /** */

  }, {
    key: "receiveAutocomplete",
    value: function receiveAutocomplete(json) {
      this.setState({
        suggestions: json.terms
      });
    }
    /** */

  }, {
    key: "submitSearch",
    value: function submitSearch(event) {
      var _this$props = this.props,
          companionWindowId = _this$props.companionWindowId,
          fetchSearch = _this$props.fetchSearch,
          searchService = _this$props.searchService,
          windowId = _this$props.windowId;
      var search = this.state.search;
      event && event.preventDefault();
      if (!search) return;
      fetchSearch(windowId, companionWindowId, "".concat(searchService.id, "?q=").concat(search), search);
    }
    /** */

  }, {
    key: "selectItem",
    value: function selectItem(_event, selectedItem, _reason) {
      if (selectedItem && getMatch(selectedItem)) {
        this.setState({
          search: getMatch(selectedItem)
        }, this.submitSearch);
      }
    }
    /** */

  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          classes = _this$props2.classes,
          companionWindowId = _this$props2.companionWindowId,
          searchIsFetching = _this$props2.searchIsFetching,
          t = _this$props2.t,
          windowId = _this$props2.windowId;
      var _this$state = this.state,
          search = _this$state.search,
          suggestions = _this$state.suggestions;
      var id = "search-".concat(companionWindowId);
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("form", {
        onSubmit: this.submitSearch,
        className: classes.form
      }, /*#__PURE__*/_react["default"].createElement(_Autocomplete["default"], {
        id: id,
        inputValue: search,
        options: suggestions,
        getOptionLabel: getMatch,
        getOptionSelected: function getOptionSelected(option, value) {
          return (0, _deburr["default"])(getMatch(option).trim()).toLowerCase() === (0, _deburr["default"])(getMatch(value).trim()).toLowerCase();
        },
        noOptionsText: "",
        onChange: this.selectItem,
        onInputChange: this.handleChange,
        freeSolo: true,
        renderInput: function renderInput(params) {
          return /*#__PURE__*/_react["default"].createElement(_TextField["default"], Object.assign({}, params, {
            label: t('searchInputLabel'),
            InputProps: _objectSpread(_objectSpread({}, params.InputProps), {}, {
              endAdornment: /*#__PURE__*/_react["default"].createElement("div", {
                className: classes.endAdornment
              }, /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
                "aria-label": t('searchSubmitAria'),
                type: "submit"
              }, /*#__PURE__*/_react["default"].createElement(_SearchSharp["default"], null)), Boolean(searchIsFetching) && /*#__PURE__*/_react["default"].createElement(_CircularProgress["default"], {
                className: classes.searchProgress,
                size: 50
              }))
            })
          }));
        }
      })), /*#__PURE__*/_react["default"].createElement(_SearchPanelNavigation["default"], {
        windowId: windowId,
        companionWindowId: companionWindowId
      }));
    }
  }]);

  return SearchPanelControls;
}(_react.Component);

exports.SearchPanelControls = SearchPanelControls;
SearchPanelControls.defaultProps = {
  autocompleteService: undefined,
  classes: {},
  query: '',
  t: function t(key) {
    return key;
  }
};