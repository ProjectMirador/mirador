"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _styles = require("@material-ui/core/styles");

var _withPlugins = require("../extend/withPlugins");

var _GalleryView = require("../components/GalleryView");

var _selectors = require("../state/selectors");

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    canvases: (0, _selectors.getCanvases)(state, {
      windowId: windowId
    }),
    viewingDirection: (0, _selectors.getSequenceViewingDirection)(state, {
      windowId: windowId
    })
  };
};
/**
 * Styles to be passed to the withStyles HOC
 */


var styles = function styles(theme) {
  return {
    galleryContainer: {
      alignItems: 'flex-start',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      overflowX: 'hidden',
      overflowY: 'scroll',
      padding: '50px 0 50px 20px',
      width: '100%'
    }
  };
};

var enhance = (0, _redux.compose)((0, _styles.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps), (0, _withPlugins.withPlugins)('GalleryView') // further HOC go here
);

var _default = enhance(_GalleryView.GalleryView);

exports["default"] = _default;