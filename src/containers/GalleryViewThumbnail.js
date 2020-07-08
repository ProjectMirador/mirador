import { compose } from 'redux';
import { connect } from 'react-redux';
import flatten from 'lodash/flatten';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../state/actions';
import { GalleryViewThumbnail } from '../components/GalleryViewThumbnail';
import {
  getSearchAnnotationsForWindow,
  getCurrentCanvas,
  getConfig,
} from '../state/selectors';

/**
 * Styles to be passed to the withStyles HOC
 */
const styles = theme => ({
  avatar: {
    backgroundColor: 'transparent',
  },
  chip: {
    ...theme.typography.caption,
    left: '50%',
    position: 'absolute',
    top: 80,
    transform: 'translate(-50%, 0)',
  },
  galleryViewItem: {
    '&$hasAnnotations': {
      border: `2px solid ${theme.palette.action.selected}`,
    },
    '&$selected,&$selected$hasAnnotations': {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    border: '2px solid transparent',
    cursor: 'pointer',
    display: 'inline-block',
    margin: `${theme.spacing(1)}px ${theme.spacing(0.5)}px`,
    maxHeight: props => props.config.height + 45,
    minWidth: '60px',
    overflow: 'hidden',
    padding: theme.spacing(0.5),
    position: 'relative',
    width: 'min-content',
  },
  hasAnnotations: {},
  selected: {},
});

/** */
const mapStateToProps = (state, { canvas, windowId }) => {
  const currentCanvas = getCurrentCanvas(state, { windowId });
  const searchAnnotations = getSearchAnnotationsForWindow(
    state,
    { windowId },
  );

  const canvasAnnotations = flatten(searchAnnotations.map(a => a.resources))
    .filter(a => a.targetId === canvas.id);

  return {
    annotationsCount: canvasAnnotations.length,
    config: getConfig(state).galleryView,
    selected: currentCanvas && currentCanvas.id === canvas.id,
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WindowViewer
 * @private
 */
const mapDispatchToProps = (dispatch, { id, windowId }) => ({
  focusOnCanvas: () => dispatch(actions.setWindowViewType(windowId, 'single')),
  setCanvas: (...args) => dispatch(actions.setCanvas(windowId, ...args)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  // further HOC go here
);

export default enhance(GalleryViewThumbnail);
