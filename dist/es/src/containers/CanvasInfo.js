import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { getDestructuredMetadata, getCanvas, getCanvasLabel, getCanvasDescription } from '../state/selectors';
import { CanvasInfo } from '../components/CanvasInfo';
/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var canvasId = _ref.canvasId,
      id = _ref.id,
      windowId = _ref.windowId;
  return {
    canvasDescription: getCanvasDescription(state, {
      canvasId: canvasId,
      companionWindowId: id,
      windowId: windowId
    }),
    canvasLabel: getCanvasLabel(state, {
      canvasId: canvasId,
      companionWindowId: id,
      windowId: windowId
    }),
    canvasMetadata: getDestructuredMetadata(getCanvas(state, {
      canvasId: canvasId,
      companionWindowId: id,
      windowId: windowId
    }))
  };
};

var enhance = compose(withTranslation(), connect(mapStateToProps), withPlugins('CanvasInfo'));
export default enhance(CanvasInfo);