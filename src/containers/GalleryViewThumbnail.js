import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../state/actions';
import { GalleryViewThumbnail } from '../components/GalleryViewThumbnail';

/**
 * Styles to be passed to the withStyles HOC
 */
const styles = theme => ({
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
  connect(null, mapDispatchToProps),
  // further HOC go here
);

export default enhance(GalleryViewThumbnail);
