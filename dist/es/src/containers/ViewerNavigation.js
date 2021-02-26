import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getSequenceViewingDirection, getNextCanvasGrouping, getPreviousCanvasGrouping } from '../state/selectors';
import { ViewerNavigation } from '../components/ViewerNavigation';
/** */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    hasNextCanvas: !!getNextCanvasGrouping(state, {
      windowId: windowId
    }),
    hasPreviousCanvas: !!getPreviousCanvasGrouping(state, {
      windowId: windowId
    }),
    viewingDirection: getSequenceViewingDirection(state, {
      windowId: windowId
    })
  };
};
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestForm
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

var styles = {
  osdNavigation: {
    order: 1
  }
};
var enhance = compose(withStyles(styles), withTranslation(), connect(mapStateToProps, mapDispatchToProps), withPlugins('ViewerNavigation') // further HOC go here
);
export default enhance(ViewerNavigation);