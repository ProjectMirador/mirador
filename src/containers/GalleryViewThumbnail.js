import { compose } from 'redux';
import { connect } from 'react-redux';
import flatten from 'lodash/flatten';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../state/actions';
import { GalleryViewThumbnail } from '../components/GalleryViewThumbnail';
import {
  getSearchAnnotationsForWindow,
  getSelectedContentSearchAnnotations,
  getCurrentCanvas,
} from '../state/selectors';

/**
 * Styles to be passed to the withStyles HOC
 */
const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.hitCounter.default,
  },
  chip: {
    ...theme.typography.caption,
    '&$selected $avatar': {
      backgroundColor: theme.palette.highlights.primary,
    },
    left: '50%',
    position: 'absolute',
    top: 80,
    transform: 'translate(-50%, 0)',
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
    height: props => props.config.height + 45,
    margin: `${theme.spacing(1)}px ${theme.spacing(0.5)}px`,
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
  const selectedAnnotations = getSelectedContentSearchAnnotations(state, { windowId });
  const annotationResources = flatten(selectedAnnotations.map(a => a.resources));
  const selectedAnnotationCanvases = annotationResources.map(a => a.targetId);
  const searchAnnotations = getSearchAnnotationsForWindow(
    state,
    { windowId },
  );

  return {
    annotationsCount: flatten(searchAnnotations.map(a => a.resources))
      .filter(a => a.targetId === canvas.id).length,
    annotationSelected: selectedAnnotationCanvases.includes(canvas.id),
    config: state.config.galleryView,
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
