import { compose } from 'redux';
import { connect } from 'react-redux';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import CanvasGroupings from '../lib/CanvasGroupings';
import * as actions from '../state/actions';
import { ThumbnailNavigation } from '../components/ThumbnailNavigation';
import { getManifestCanvases } from '../state/selectors';
/**
 * mapStateToProps - used to hook up state to props
 * @memberof ThumbnailNavigation
 * @private
 */
const mapStateToProps = ({ config }, { manifest, window }) => ({
  canvasGroupings: new CanvasGroupings(getManifestCanvases(manifest), window.view),
  config,
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ThumbnailNavigation
 * @private
 */
const mapDispatchToProps = {
  setCanvas: actions.setCanvas,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  miradorWithPlugins,
  // further HOC go here
);

export default enhance(ThumbnailNavigation);
