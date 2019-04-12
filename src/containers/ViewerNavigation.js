import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend';
import * as actions from '../state/actions';
import { getManifestCanvases, getCanvasIndex } from '../state/selectors';
import { ViewerNavigation } from '../components/ViewerNavigation';

/** */
const mapStateToProps = (state, { window }) => ({
  canvases: getManifestCanvases(state, { windowId: window.id }),
  canvasIndex: getCanvasIndex(state, { windowId: window.id }),
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestForm
 * @private
 */
const mapDispatchToProps = {
  setCanvas: actions.setCanvas,
};

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('ViewerNavigation'),
  // further HOC go here
);

export default enhance(ViewerNavigation);
