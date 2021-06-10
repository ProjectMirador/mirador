"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactI18next = require("react-i18next");

var _styles = require("@material-ui/core/styles");

var actions = _interopRequireWildcard(require("../state/actions"));

var _withPlugins = require("../extend/withPlugins");

var _SearchPanel = require("../components/SearchPanel");

var _selectors = require("../state/selectors");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id,
      windowId = _ref.windowId;
  return {
    query: (0, _selectors.getSearchQuery)(state, {
      companionWindowId: id,
      windowId: windowId
    }),
    searchService: (0, _selectors.getManifestSearchService)(state, {
      windowId: windowId
    }),
    suggestedSearches: (0, _selectors.getWindow)(state, {
      windowId: windowId
    }).suggestedSearches
  };
};
/** */


var mapDispatchToProps = function mapDispatchToProps(dispatch, props) {
  return {
    fetchSearch: function fetchSearch(searchId, query) {
      return dispatch(actions.fetchSearch(props.windowId, props.id, searchId, query));
    },
    removeSearch: function removeSearch() {
      return dispatch(actions.removeSearch(props.windowId, props.id));
    }
  };
};
/**
* Styles for withStyles HOC
*/


var styles = function styles(theme) {
  return {
    clearChip: {
      marginLeft: theme.spacing(1)
    },
    inlineButton: {
      '& span': {
        lineHeight: '1.5em'
      },
      margin: theme.spacing(2),
      padding: 0,
      textAlign: 'inherit',
      textTransform: 'none'
    }
  };
};

var enhance = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _styles.withStyles)(styles), (0, _reactI18next.withTranslation)(), (0, _withPlugins.withPlugins)('SearchPanel'));

var _default = enhance(_SearchPanel.SearchPanel);

exports["default"] = _default;