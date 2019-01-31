import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../state/actions';
import WindowThumbnailSettings from '../components/WindowThumbnailSettings';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { setWindowThumbnailPosition: actions.setWindowThumbnailPosition };

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = (state, props) => (
  {
    thumbnailNavigationPosition: state.windows[props.windowId].thumbnailNavigationPosition,
  }
);

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  // further HOC go here
);

export default enhance(WindowThumbnailSettings);
