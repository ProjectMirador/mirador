import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../state/actions';
import { withPlugins } from '../extend';
import { GalleryView } from '../components/GalleryView';
import { getManifestCanvases } from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = (state, { window }) => (
  {
    canvases: getManifestCanvases(state, { windowId: window.id }),
  }
);

/**
 * Styles to be passed to the withStyles HOC
 */
const styles = theme => ({
  currentCanvas: {
    border: `2px solid ${theme.palette.secondary.main}`,
    padding: theme.spacing.unit / 2,
  },
  galleryContainer: {
    flex: '1',
    overflowX: 'hidden',
    overflowY: 'scroll',
    padding: '50px 0 50px 20px',
  },
  galleryViewItem: {
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      border: `2px solid ${theme.palette.secondary.main}`,
      padding: theme.spacing.unit / 2,
      transform: 'scale(1.05)',
      transition: '.1s transform ease-out',
    },
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'inline-block',
    height: '160px',
    margin: `${theme.spacing.unit}px ${theme.spacing.unit / 2}px`,
    maxWidth: '100px',
    overflow: 'hidden',
    padding: theme.spacing.unit / 2,
    textOverflow: 'elipsis',
    transition: '.1s transform ease-out',
  },
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WindowViewer
 * @private
 */
const mapDispatchToProps = {
  setCanvas: actions.setCanvas,
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('GalleryView'),
  // further HOC go here
);

export default enhance(GalleryView);
