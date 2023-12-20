import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import {
  getAnnotationResourcesByMotivationForCanvas,
  getCanvasLabel,
  getSelectedAnnotationId,
  getConfig,
} from '../state/selectors';
import { CanvasAnnotations } from '../components/CanvasAnnotations';
import { withWindowContext } from '../contexts/WindowContext';

/**
 * @param {Array} resources
 * @return {Array} [{ id: 'abc123', content: 'Annotation Content' }, ...]
 */
function getIdAndContentOfResources(resources) {
  return resources.map((resource, i) => ({
    content: resource.chars,
    id: resource.id,
    tags: resource.tags,
    targetId: resource.targetId,
  }));
}

/** For connect */
const mapStateToProps = (state, { canvasId, windowId }) => ({
  annotations: getIdAndContentOfResources(
    getAnnotationResourcesByMotivationForCanvas(state, { canvasId, windowId }),
  ),
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

/** For withStlyes */
const styles = theme => ({
  annotationListItem: {
    '&$hovered': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover,&:focus': {
      backgroundColor: theme.palette.action.hover,
    },
    borderBottom: `0.5px solid ${theme.palette.divider}`,
    cursor: 'pointer',
    whiteSpace: 'normal',
  },
  chip: {
    backgroundColor: theme.palette.background.paper,
    marginRight: theme.spacing(0.5),
    marginTop: theme.spacing(1),
  },
  hovered: {},
  sectionHeading: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  withWindowContext,
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('CanvasAnnotations'),
);

export default enhance(CanvasAnnotations);
