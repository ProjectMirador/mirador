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
  galleryContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflowX: 'hidden',
    overflowY: 'scroll',
    padding: '50px 0 50px 20px',
    width: '100%',
  },
  galleryViewCaption: {
    boxOrient: 'vertical',
    display: '-webkit-box',
    height: '3em',
    lineClamp: '2',
    lineHeight: '1.5em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-word',
  },
  galleryViewItem: {
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      border: `2px solid ${theme.palette.secondary.main}`,
    },
    border: '2px solid transparent',
    cursor: 'pointer',
    display: 'inline-block',
    height: '165px',
    margin: `${theme.spacing.unit}px ${theme.spacing.unit / 2}px`,
    minWidth: '60px',
    overflow: 'hidden',
    padding: theme.spacing.unit / 2,
    width: 'min-content',
  },
  galleryViewItemCurrent: {
    border: `2px solid ${theme.palette.secondary.main}`,
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
