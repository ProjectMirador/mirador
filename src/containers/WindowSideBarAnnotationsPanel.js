import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend';
import * as actions from '../state/actions';
import {
  getIdAndContentOfResources,
  getSelectedAnnotationIds,
  getSelectedCanvas,
  getSelectedTargetAnnotations,
  getAnnotationResourcesByMotivation,
} from '../state/selectors';
import { WindowSideBarAnnotationsPanel } from '../components/WindowSideBarAnnotationsPanel';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  selectedAnnotationIds: getSelectedAnnotationIds(
    state, windowId, [getSelectedCanvas(state, windowId).id],
  ),
  annotations: getIdAndContentOfResources(
    getAnnotationResourcesByMotivation(
      getSelectedTargetAnnotations(state, getSelectedCanvas(state, windowId).id),
      ['oa:commenting', 'sc:painting'],
    ),
  ),
});

/**
 * mapDispatchToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */
const mapDispatchToProps = {
  selectAnnotation: actions.selectAnnotation,
  deselectAnnotation: actions.deselectAnnotation,
};

/** */
const styles = theme => ({
  selectedAnnotation: {
    backgroundColor: theme.palette.background.default,
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
