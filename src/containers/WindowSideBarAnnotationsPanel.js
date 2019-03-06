import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import {
  getIdAndContentOfResources,
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
  annotations: getIdAndContentOfResources(
    getAnnotationResourcesByMotivation(
      getSelectedCanvasAnnotations(state, getSelectedCanvas(state, windowId).id),
      ['oa:commenting', 'sc:painting'],
    ),
  ),
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, null),
  // further HOC
);

export default enhance(WindowSideBarAnnotationsPanel);
