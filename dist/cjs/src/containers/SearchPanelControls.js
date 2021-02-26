"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactI18next = require("react-i18next");

var _styles = require("@material-ui/core/styles");

var _withPlugins = require("../extend/withPlugins");

var _SearchPanelControls = require("../components/SearchPanelControls");

var actions = _interopRequireWildcard(require("../state/actions"));

var _selectors = require("../state/selectors");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchPanelControls
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var companionWindowId = _ref.companionWindowId,
      windowId = _ref.windowId;
  return {
    autocompleteService: (0, _selectors.getManifestAutocompleteService)(state, {
      windowId: windowId
    }),
    query: (0, _selectors.getSearchQuery)(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    }),
    searchIsFetching: (0, _selectors.getSearchIsFetching)(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    }),
    searchService: (0, _selectors.getManifestSearchService)(state, {
      windowId: windowId
    })
  };
};
/**
 * mapDispatchToProps - to hook up connect
 * @memberof SearchPanelControls
 * @private
 */


var mapDispatchToProps = {
  fetchSearch: actions.fetchSearch
};
/** */

var styles = function styles(theme) {
  return {
    endAdornment: {
      position: 'absolute',
      right: 0
    },
    form: {
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(1.5),
      width: '100%'
    },
    searchProgress: {
      position: 'absolute',
      right: 0
    }
  };
};

var enhance = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _styles.withStyles)(styles), (0, _reactI18next.withTranslation)(), (0, _withPlugins.withPlugins)('SearchPanelControls'));

var _default = enhance(_SearchPanelControls.SearchPanelControls);

exports["default"] = _default;