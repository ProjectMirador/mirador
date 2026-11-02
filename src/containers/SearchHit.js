import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import { SearchHit } from '../components/SearchHit';
import * as actions from '../state/actions';
import {
  getCanvasLabel,
  getVisibleCanvasIds,
  getResourceValueLabelForLocale,
  getSelectedContentSearchAnnotationIds,
  getSelectedAnnotationId,
} from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchHit
 * @private
 */
const mapStateToProps = (state, { annotation, annotationId, hit = { annotations: [] }, companionWindowId, windowId }) => {
  const annotationLabel = getResourceValueLabelForLocale(state, { resource: annotation?.resource });

  const selectedCanvasIds = getVisibleCanvasIds(state, { windowId });

  const selectedContentSearchAnnotationsIds = getSelectedContentSearchAnnotationIds(state, {
    companionWindowId,
    windowId,
  });

  const windowSelectedAnnotationId = getSelectedAnnotationId(state, { windowId });

  const allAnnoIds = [annotationId, ...hit.annotations];

  return {
    adjacent: selectedCanvasIds.includes(annotation?.targetId),
    annotation: annotation,
    annotationId: annotationId,
    annotationLabel: annotationLabel[0],
    canvasLabel:
      annotation &&
      getCanvasLabel(state, {
        canvasId: annotation.targetId,
        windowId,
      }),
    selected: selectedContentSearchAnnotationsIds[0] && allAnnoIds.includes(selectedContentSearchAnnotationsIds[0]),
    windowSelected: windowSelectedAnnotationId && allAnnoIds.includes(windowSelectedAnnotationId),
  };
};

/**
 * mapDispatchToProps - to hook up connect
 * @memberof SearchPanelNavigation
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  selectAnnotation: (...args) => dispatch(actions.selectAnnotation(windowId, ...args)),
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), withPlugins('SearchHit'));

export default enhance(SearchHit);
