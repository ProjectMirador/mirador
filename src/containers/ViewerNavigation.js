import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend';
import * as actions from '../state/actions';
import { getManifestCanvases, getCanvasIndex, getWindowViewType } from '../state/selectors';
import { ViewerNavigation } from '../components/ViewerNavigation';

/** */
const mapStateToProps = (state, { windowId }) => ({
  canvases: getManifestCanvases(state, { windowId }),
  canvasIndex: getCanvasIndex(state, { windowId }),
  view: getWindowViewType(state, { windowId }),
  windowId: window.id,
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestForm
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  setCanvas: (...args) => dispatch(actions.setCanvas(windowId, ...args)),
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('ViewerNavigation'),
  // further HOC go here
);

export default enhance(ViewerNavigation);
