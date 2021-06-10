import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { ThumbnailNavigation } from '../components/ThumbnailNavigation';
import { getCompanionWindow, getWindow, getNextCanvasGrouping, getPreviousCanvasGrouping, getCanvasGroupings, getCanvasIndex, getWindowViewType, getSequenceViewingDirection, getConfig } from '../state/selectors';
/**
 * mapStateToProps - used to hook up state to props
 * @memberof ThumbnailNavigation
 * @private
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    canvasGroupings: getCanvasGroupings(state, {
      windowId: windowId
    }),
    canvasIndex: getCanvasIndex(state, {
      windowId: windowId
    }),
    hasNextCanvas: !!getNextCanvasGrouping(state, {
      windowId: windowId
    }),
    hasPreviousCanvas: !!getPreviousCanvasGrouping(state, {
      windowId: windowId
    }),
    position: getCompanionWindow(state, {
      companionWindowId: getWindow(state, {
        windowId: windowId
      }).thumbnailNavigationId
    }).position,
    thumbnailNavigation: getConfig(state).thumbnailNavigation,
    view: getWindowViewType(state, {
      windowId: windowId
    }),
    viewingDirection: getSequenceViewingDirection(state, {
      windowId: windowId
    })
  };
};
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ThumbnailNavigation
 * @private
 */


var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var windowId = _ref2.windowId;
  return {
    setNextCanvas: function setNextCanvas() {
      return dispatch(actions.setNextCanvas(windowId));
    },
    setPreviousCanvas: function setPreviousCanvas() {
      return dispatch(actions.setPreviousCanvas(windowId));
    }
  };
};
/**
 * Styles for withStyles HOC
 */


var styles = function styles(theme) {
  return {
    thumbNavigation: {
      '&:focus': {
        boxShadow: 0,
        outline: 0
      }
    }
  };
};

var enhance = compose(withStyles(styles), withTranslation(), connect(mapStateToProps, mapDispatchToProps), withPlugins('ThumbnailNavigation'));
export default enhance(ThumbnailNavigation);