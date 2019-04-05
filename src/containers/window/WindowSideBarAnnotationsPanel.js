import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../../extend';
import * as actions from '../../state/actions';
import {
  getSelectedAnnotationIds,
  getAnnotationResourcesByMotivation,
  getWindow,
} from '../../state/selectors';
import { WindowSideBarAnnotationsPanel } from '../../components/window/WindowSideBarAnnotationsPanel';

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

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  allAnnotationsAreHighlighted: getWindow(state, { windowId }).displayAllAnnotations,
  annotations: getIdAndContentOfResources(
    getAnnotationResourcesByMotivation(state, { motivations: ['oa:commenting', 'sc:painting'], windowId }),
  ),
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

/** */
const styles = theme => ({
  annotationListItem: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    borderBottom: `0.5px solid ${theme.palette.divider}`,
    cursor: 'pointer',
  },
  section: {
    borderBottom: '.5px solid rgba(0,0,0,0.25)',
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowSideBarAnnotationPanel'),
  // further HOC
);

export default enhance(WindowSideBarAnnotationsPanel);
