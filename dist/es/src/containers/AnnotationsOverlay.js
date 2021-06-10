import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { AnnotationsOverlay } from '../components/AnnotationsOverlay';
import * as actions from '../state/actions';
import { getWindow, getSearchAnnotationsForWindow, getCompanionWindowsForContent, getTheme, getConfig, getPresentAnnotationsOnSelectedCanvases, getSelectedAnnotationId, getCurrentCanvasWorld } from '../state/selectors';
/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    annotations: getPresentAnnotationsOnSelectedCanvases(state, {
      windowId: windowId
    }),
    canvasWorld: getCurrentCanvasWorld(state, {
      windowId: windowId
    }),
    drawAnnotations: getConfig(state).window.forceDrawAnnotations || getCompanionWindowsForContent(state, {
      content: 'annotations',
      windowId: windowId
    }).length > 0,
    drawSearchAnnotations: getConfig(state).window.forceDrawAnnotations || getCompanionWindowsForContent(state, {
      content: 'search',
      windowId: windowId
    }).length > 0,
    highlightAllAnnotations: getWindow(state, {
      windowId: windowId
    }).highlightAllAnnotations,
    hoveredAnnotationIds: getWindow(state, {
      windowId: windowId
    }).hoveredAnnotationIds,
    palette: getTheme(state).palette,
    searchAnnotations: getSearchAnnotationsForWindow(state, {
      windowId: windowId
    }),
    selectedAnnotationId: getSelectedAnnotationId(state, {
      windowId: windowId
    })
  };
};
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */


var mapDispatchToProps = {
  deselectAnnotation: actions.deselectAnnotation,
  hoverAnnotation: actions.hoverAnnotation,
  selectAnnotation: actions.selectAnnotation
};
var enhance = compose(withTranslation(), connect(mapStateToProps, mapDispatchToProps), withPlugins('AnnotationsOverlay'));
export default enhance(AnnotationsOverlay);