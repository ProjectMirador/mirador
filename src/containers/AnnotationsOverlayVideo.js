/** AnnotationsOverlayVideo - based on AnnotationsOverlay */
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { AnnotationsOverlayVideo } from '../components/AnnotationsOverlayVideo';
import * as actions from '../state/actions';
import {
  getWindow,
  getSearchAnnotationsForWindow,
  getCompanionWindowsForContent,
  getTheme,
  getConfig,
  getCurrentCanvas,
  getWindowCurrentTime,
  getWindowPausedStatus,
  getPresentAnnotationsOnSelectedCanvases,
  getSelectedAnnotationId,
  getCurrentCanvasWorld,
} from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  annotations: getPresentAnnotationsOnSelectedCanvases(state, { windowId }),
  canvas: (getCurrentCanvas(state, { windowId }) || {}),
  canvasWorld: getCurrentCanvasWorld(state, { windowId }),
  currentTime: getWindowCurrentTime(state, { windowId }),
  drawAnnotations: getConfig(state).window.forceDrawAnnotations || getCompanionWindowsForContent(state, { content: 'annotations', windowId }).length > 0,
  drawSearchAnnotations: getConfig(state).window.forceDrawAnnotations || getCompanionWindowsForContent(state, { content: 'search', windowId }).length > 0,
  highlightAllAnnotations: getWindow(state, { windowId }).highlightAllAnnotations,
  hoveredAnnotationIds: getWindow(state, { windowId }).hoveredAnnotationIds,
  palette: getTheme(state).palette,
  paused: getWindowPausedStatus(state, { windowId }),
  searchAnnotations: getSearchAnnotationsForWindow(
    state,
    { windowId },
  ),
  selectedAnnotationId: getSelectedAnnotationId(state, { windowId }),
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  deselectAnnotation: (...args) => dispatch(actions.deselectAnnotation(...args)),
  hoverAnnotation: (...args) => dispatch(actions.hoverAnnotation(...args)),
  selectAnnotation: (...args) => dispatch(actions.selectAnnotation(...args)),
  setCurrentTime: (...args) => dispatch(actions.setWindowCurrentTime(windowId, ...args)),
  setPaused: (...args) => dispatch(actions.setWindowPaused(windowId, ...args)),
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('AnnotationsOverlayVideo'),
);

export default enhance(AnnotationsOverlayVideo);
