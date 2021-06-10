import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { ViewerInfo } from '../components/ViewerInfo';
import { getCanvasLabel, getCanvases, getCanvasIndex, getCurrentCanvas } from '../state/selectors';
/**
 * mapStateToProps - to hook up connect
 * @memberof Window
 * @private
 */

var mapStateToProps = function mapStateToProps(state, props) {
  var windowId = props.windowId;
  var canvases = getCanvases(state, {
    windowId: windowId
  });
  var canvasIndex = getCanvasIndex(state, {
    windowId: windowId
  });
  var canvasId = (getCurrentCanvas(state, {
    windowId: windowId
  }) || {}).id;
  return {
    canvasCount: canvases.length,
    canvasIndex: canvasIndex,
    canvasLabel: getCanvasLabel(state, {
      canvasId: canvasId,
      windowId: windowId
    })
  };
};

var styles = {
  osdInfo: {
    order: 2,
    overflow: 'hidden',
    paddingBottom: 3,
    textOverflow: 'ellipsis',
    unicodeBidi: 'plaintext',
    whiteSpace: 'nowrap',
    width: '100%'
  }
};
var enhance = compose(withStyles(styles), withTranslation(), connect(mapStateToProps, null), withPlugins('ViewerInfo'));
export default enhance(ViewerInfo);