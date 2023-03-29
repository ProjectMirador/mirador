import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from '@mui/styles/withStyles';
import { withPlugins } from '../extend/withPlugins';
import { GalleryView } from '../components/GalleryView';
import { getCanvases, getSequenceViewingDirection } from '../state/selectors';

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

/**
 * Styles to be passed to the withStyles HOC
 */
const styles = theme => ({
  galleryContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflowX: 'hidden',
    overflowY: 'scroll',
    padding: '50px 0 50px 20px',
    width: '100%',
  },
});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps),
  withPlugins('GalleryView'),
  // further HOC go here
);

export default enhance(GalleryView);
