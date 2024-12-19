import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import { GalleryView } from '../components/GalleryView';
import { getCanvases, getSequenceViewingDirection } from '../state/selectors';
import { withWindowContext } from '../contexts/WindowContext';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = (state, { windowId }) => (
  {
    canvases: getCanvases(state, { windowId }),
    viewingDirection: getSequenceViewingDirection(state, { windowId }),
  }
);

const enhance = compose(
  withWindowContext,
  connect(mapStateToProps),
  withPlugins('GalleryView'),
  // further HOC go here
);

export default enhance(GalleryView);
