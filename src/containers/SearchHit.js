import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import { SearchHit } from '../components/SearchHit';
import * as actions from '../state/actions';
import { hitMatchesAnnotation } from '../lib/ContentSearch';
import {
  getCanvasLabel,
  getVisibleCanvasIds,
  getResourceAnnotationForSearchHit,
  getResourceAnnotationLabel,
  getSelectedContentSearchAnnotationIds,
  getSelectedAnnotationId,
} from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchHit
 * @private
 */
const mapStateToProps = (
  state,
  { annotationId, hit = { annotationIds: [], firstAnnotationId: '' }, companionWindowId, windowId },
) => {
  const realAnnoId = annotationId || hit.firstAnnotationId;
  const hitAnnotation = getResourceAnnotationForSearchHit(state, {
    annotationUri: realAnnoId,
    companionWindowId,
    windowId,
  });

  const annotationLabel = getResourceAnnotationLabel(state, {
    annotationUri: realAnnoId,
    companionWindowId,
    windowId,
  });
  const selectedCanvasIds = getVisibleCanvasIds(state, { windowId });

  const selectedContentSearchAnnotationsIds = getSelectedContentSearchAnnotationIds(state, {
    companionWindowId,
    windowId,
  });

  const windowSelectedAnnotationId = getSelectedAnnotationId(state, { windowId });

  // Only a Content Search 1 hit can reference more than one annotation
  // (a Content Search 2 hit always has exactly one -- see ContentSearch.js),
  const matches = (id) => id === annotationId || hitMatchesAnnotation(hit, id);

  return {
    adjacent: selectedCanvasIds.includes(hitAnnotation?.targetId),
    annotation: hitAnnotation,
    annotationId: realAnnoId,
    annotationLabel: annotationLabel[0],
    canvasLabel:
      hitAnnotation &&
      getCanvasLabel(state, {
        canvasId: hitAnnotation.targetId,
        windowId,
      }),
    selected: selectedContentSearchAnnotationsIds[0] && matches(selectedContentSearchAnnotationsIds[0]),
    windowSelected: windowSelectedAnnotationId && matches(windowSelectedAnnotationId),
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
