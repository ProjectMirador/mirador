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

var _SearchPanelNavigation = require("../components/SearchPanelNavigation");

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
    direction: (0, _selectors.getThemeDirection)(state),
    searchHits: (0, _selectors.getSortedSearchHitsForCompanionWindow)(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    }),
    selectedContentSearchAnnotation: (0, _selectors.getSelectedContentSearchAnnotationIds)(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    })
  };
};
/**
 * mapDispatchToProps - to hook up connect
 * @memberof SearchPanelNavigation
 * @private
 */


var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var windowId = _ref2.windowId;
  return {
    selectAnnotation: function selectAnnotation() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return dispatch(actions.selectAnnotation.apply(actions, [windowId].concat(args)));
    }
  };
};
/** */


var styles = function styles(theme) {
  return {
    body2: {
      marginLeft: '-16px',
      width: '100%'
    }
  };
};

var enhance = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _styles.withStyles)(styles), (0, _reactI18next.withTranslation)(), (0, _withPlugins.withPlugins)('SearchPanelNavigation'));

var _default = enhance(_SearchPanelNavigation.SearchPanelNavigation);

exports["default"] = _default;