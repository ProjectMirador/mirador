import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import {
  getIdAndContentOfAnnotations,
  getSelectedCanvas,
  getSelectedCanvasAnnotations,
  getAnnotationResourcesByMotivation,
} from '../state/selectors';
import { WindowSideBarAnnotationsPanel } from '../components/WindowSideBarAnnotationsPanel';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  annotations: getIdAndContentOfAnnotations(
    getAnnotationResourcesByMotivation(
      getSelectedCanvasAnnotations(state, getSelectedCanvas(state, windowId).id),
      ['oa:commenting', 'sc:painting'],
    ),
  ),
});

/**
 * @param theme
 */
const styles = theme => ({
  windowSideBarH2: theme.typography.h5,
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, null),
  // further HOC
);

export default enhance(WindowSideBarAnnotationsPanel);
