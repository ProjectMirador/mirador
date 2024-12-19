import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import {
  getVisibleCanvasIds,
  getAnnotationResourcesByMotivation,
} from '../state/selectors';
import { WindowSideBarAnnotationsPanel } from '../components/WindowSideBarAnnotationsPanel';
import { withWindowContext } from '../contexts/WindowContext';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  annotationCount: getAnnotationResourcesByMotivation(
    state,
    { windowId },
  ).length,
  canvasIds: getVisibleCanvasIds(state, { windowId }),
});

const enhance = compose(
  withWindowContext,
  connect(mapStateToProps, null),
  withPlugins('WindowSideBarAnnotationsPanel'),
  // further HOC
);

export default enhance(WindowSideBarAnnotationsPanel);
