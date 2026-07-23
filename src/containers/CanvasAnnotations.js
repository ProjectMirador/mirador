import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getAnnotationResourcesDataForCanvas, getCanvasLabel, getSelectedAnnotationId, getConfig } from '../state/selectors';
import { CanvasAnnotations } from '../components/CanvasAnnotations';

/** For connect */
const mapStateToProps = (state, { canvasId, windowId }) => ({
  annotations: getAnnotationResourcesDataForCanvas(state, { canvasId, windowId }),
  htmlSanitizationRuleSet: getConfig(state).annotations.htmlSanitizationRuleSet,
  label: getCanvasLabel(state, {
    canvasId,
    windowId,
  }),
  selectedAnnotationId: getSelectedAnnotationId(state, { windowId }),
});

/**
 * mapDispatchToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */
const mapDispatchToProps = {
  deselectAnnotation: actions.deselectAnnotation,
  hoverAnnotation: actions.hoverAnnotation,
  selectAnnotation: actions.selectAnnotation,
};

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), withPlugins('CanvasAnnotations'));

export default enhance(CanvasAnnotations);
