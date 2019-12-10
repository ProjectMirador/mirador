import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../state/actions';
import {
  getAnnotationResourcesByMotivationForCanvas,
  getCanvasLabel,
  getSelectedAnnotationIds,
  getWindow,
} from '../state/selectors';
import { CanvasAnnotations } from '../components/CanvasAnnotations';

/**
 * @param {Array} resources
 * @return {Array} [{ id: 'abc123', content: 'Annotation Content' }, ...]
 */
function getIdAndContentOfResources(resources) {
  return resources.map((resource, i) => ({
    content: resource.chars,
    id: resource.id,
    targetId: resource.targetId,
  }));
}

/** For connect */
const mapStateToProps = (state, { canvasId, windowId }) => ({
  allAnnotationsAreHighlighted: getWindow(state, { windowId }).displayAllAnnotations,
  annotations: getIdAndContentOfResources(
    getAnnotationResourcesByMotivationForCanvas(
      state, { canvasId, motivations: ['oa:commenting', 'sc:painting', 'commenting'], windowId },
    ),
  ),
  label: getCanvasLabel(state, {
    canvasId,
    windowId,
  }),
  selectedAnnotationIds: getSelectedAnnotationIds(state, { windowId }),
});

/**
 * mapDispatchToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */
const mapDispatchToProps = {
  deselectAnnotation: actions.deselectAnnotation,
  highlightAnnotation: actions.highlightAnnotation,
  selectAnnotation: actions.selectAnnotation,
};

/** For withStlyes */
const styles = theme => ({
  annotationListItem: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    borderBottom: `0.5px solid ${theme.palette.divider}`,
    cursor: 'pointer',
  },
  sectionHeading: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(CanvasAnnotations);
