import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { alpha, withStyles } from '@material-ui/core/styles';
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
  autoScroll: getWindow(state, { windowId }).autoScrollAnnotationList,
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

/** For withStyles */
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
  endAdornment: {
    position: 'absolute',
    right: 0,
  },
  footerAnnotationPanel: {
    background: theme.palette.background.paper,
    borderTop: `.5px solid ${theme.palette.section_divider}`,
    bottom: 0,
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
    position: 'sticky',
  },
  grow: {
    flexGrow: 1,
  },
  headerAnnotationPanel: {
    background: theme.palette.background.paper,
    borderBottom: `.5px solid ${theme.palette.section_divider}`,
    marginBottom: theme.spacing(1),
    padding: theme.spacing(0, 1, 1, 1),
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  hovered: {},
  manifestLabel: {
    fontSize: '10px',
  },
  searchAnnotationsTextfield: {
    width: '100%',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('CanvasAnnotations'),
);

export default enhance(CanvasAnnotations);
