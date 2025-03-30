import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import {
  getAnnotationResourcesByMotivationForCanvas,
  getCanvasLabel,
  getSelectedAnnotationId,
  getConfig,
  getWindow,
} from '../state/selectors';
import { CanvasAnnotations } from '../components/CanvasAnnotations';
import { withRef } from '../extend/withRef';

/**
 * @param {Array} resources
 * @return {Array} [{ id: 'abc123', content: 'Annotation Content' }, ...]
 * TODO it's not the best to add creator and creationDate here, but it's the easiest way to get it
 */
function getIdAndContentOfResources(resources) {
  return resources.map((resource, i) => ({
    content: resource.chars,
    creator: resource?.resource?.creator,
    id: resource.id,
    lastEditor: resource?.resource?.lastEditor,
    tags: resource.tags,
    targetId: resource.targetId,
  }));
}

/** For connect */
const mapStateToProps = (state, { canvasId, windowId }) => ({
  annotations: getIdAndContentOfResources(
    getAnnotationResourcesByMotivationForCanvas(state, { canvasId, windowId }),
  ),
  annotationTagsSuggestion: getConfig(state)?.annotation?.tagsSuggestions,
  autoScroll: getWindow(state, { windowId }).autoScrollAnnotationList,
  htmlSanitizationRuleSet: getConfig(state)?.annotations?.htmlSanitizationRuleSet,
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

// const enhance = compose(
//   withRef(),
//   withTranslation(),
//   connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true }),
//   withPlugins('CanvasAnnotations'),
// );

const enhance = compose(
  withRef(),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('CanvasAnnotations'),
);

export default enhance(CanvasAnnotations);
