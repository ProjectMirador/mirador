import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend';
import CanvasGroupings from '../lib/CanvasGroupings';
import * as actions from '../state/actions';
import { ThumbnailNavigation } from '../components/ThumbnailNavigation';
import { getManifestCanvases, getWindowManifest } from '../state/selectors';
/**
 * mapStateToProps - used to hook up state to props
 * @memberof ThumbnailNavigation
 * @private
 */
const mapStateToProps = ({
  companionWindows, config, manifests, windows,
}, { windowId }) => ({
  canvasGroupings: new CanvasGroupings(
    getManifestCanvases(
      getWindowManifest({ windows, manifests }, windowId),
    ),
    windows[windowId].view,
  ),
  position: companionWindows[windows[windowId].thumbnailNavigationId].position,
  window: windows[windowId],
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

/**
 * Styles for withStyles HOC
 */
const styles = {
  root: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  title: {
    color: '#ffffff',
  },
};

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('ThumnailNavigation'),
);

export default enhance(ThumbnailNavigation);
