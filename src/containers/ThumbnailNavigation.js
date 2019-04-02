import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend';
import CanvasGroupings from '../lib/CanvasGroupings';
import * as actions from '../state/actions';
import { ThumbnailNavigation } from '../components/ThumbnailNavigation';
import { getWindow } from '../state/selectors/windows';
import { getManifestCanvases } from '../state/selectors/manifests';

/**
 * mapStateToProps - used to hook up state to props
 * @memberof ThumbnailNavigation
 * @private
 */
const mapStateToProps = ({
  companionWindows, config, manifests, windows,
}, { windowId }) => ({
  canvasGroupings: new CanvasGroupings(
    getManifestCanvases({
      manifests,
      windows,
    }, { windowId }),
    windows[windowId].view,
  ),
  config,
  position: companionWindows[windows[windowId].thumbnailNavigationId].position,
  window: getWindow({ windows }, { windowId }),
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, null),
  withPlugins('ThumnailNavigation'),
);

export default enhance(ThumbnailNavigation);
