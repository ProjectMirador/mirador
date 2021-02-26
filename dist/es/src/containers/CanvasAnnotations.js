import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getAnnotationResourcesByMotivationForCanvas, getCanvasLabel, getSelectedAnnotationId, getConfig } from '../state/selectors';
import { CanvasAnnotations } from '../components/CanvasAnnotations';
/**
 * @param {Array} resources
 * @return {Array} [{ id: 'abc123', content: 'Annotation Content' }, ...]
 */

function getIdAndContentOfResources(resources) {
  return resources.map(function (resource, i) {
    return {
      content: resource.chars,
      id: resource.id,
      tags: resource.tags,
      targetId: resource.targetId
    };
  });
}
/** For connect */


var mapStateToProps = function mapStateToProps(state, _ref) {
  var canvasId = _ref.canvasId,
      windowId = _ref.windowId;
  return {
    annotations: getIdAndContentOfResources(getAnnotationResourcesByMotivationForCanvas(state, {
      canvasId: canvasId,
      windowId: windowId
    })),
    htmlSanitizationRuleSet: getConfig(state).annotations.htmlSanitizationRuleSet,
    label: getCanvasLabel(state, {
      canvasId: canvasId,
      windowId: windowId
    }),
    selectedAnnotationId: getSelectedAnnotationId(state, {
      windowId: windowId
    })
  };
};
/**
 * mapDispatchToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */


var mapDispatchToProps = {
  deselectAnnotation: actions.deselectAnnotation,
  hoverAnnotation: actions.hoverAnnotation,
  selectAnnotation: actions.selectAnnotation
};
/** For withStlyes */

var styles = function styles(theme) {
  return {
    annotationListItem: {
      '&$hovered': {
        backgroundColor: theme.palette.action.hover
      },
      '&:hover,&:focus': {
        backgroundColor: theme.palette.action.hover
      },
      borderBottom: "0.5px solid ".concat(theme.palette.divider),
      cursor: 'pointer',
      whiteSpace: 'normal'
    },
    chip: {
      backgroundColor: theme.palette.background.paper,
      marginRight: theme.spacing(0.5),
      marginTop: theme.spacing(1)
    },
    hovered: {},
    sectionHeading: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(2)
    }
  };
};

var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps, mapDispatchToProps), withPlugins('CanvasAnnotations'));
export default enhance(CanvasAnnotations);