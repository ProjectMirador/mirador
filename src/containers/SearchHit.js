import { compose } from 'redux';
import { connect } from 'react-redux';
import { PropertyValue } from 'manifesto.js';
import { withPlugins } from '../extend/withPlugins';
import { SearchHit } from '../components/SearchHit';
import * as actions from '../state/actions';
import { getCanvasLabel, getManifestLocale, getVisibleCanvasIds, getSelectedAnnotationId } from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchHit
 * @private
 */
const mapStateToProps = (state, { annotation, annotationId, canvasId, hit, windowId }) => {
  const label = annotation?.resource?.label;
  const windowSelectedAnnotationId = getSelectedAnnotationId(state, { windowId });
  const allAnnoIds = [annotationId, ...(hit?.annotations ?? [])];

  return {
    adjacent: getVisibleCanvasIds(state, { windowId }).includes(canvasId),
    annotationLabel: label ? PropertyValue.parse(label).getValues(getManifestLocale(state, { windowId }))[0] : undefined,
    canvasLabel: canvasId && getCanvasLabel(state, { canvasId, windowId }),
    windowSelected: windowSelectedAnnotationId && allAnnoIds.includes(windowSelectedAnnotationId),
  };
};

/**
 * mapDispatchToProps - to hook up connect
 * @memberof SearchHit
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  selectAnnotation: (...args) => dispatch(actions.selectAnnotation(windowId, ...args)),
  setCanvas: (...args) => dispatch(actions.setCanvas(windowId, ...args)),
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), withPlugins('SearchHit'));

export default enhance(SearchHit);
