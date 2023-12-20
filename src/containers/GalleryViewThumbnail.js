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
  getPresentAnnotationsOnSelectedCanvases,
  getCompanionWindowsForContent,
} from '../state/selectors';
import { withWindowContext } from '../contexts/WindowContext';

/**
 * Styles to be passed to the withStyles HOC
 */
const styles = theme => ({
  annotationIcon: {
    height: '1rem',
    width: '1rem',
  },
  annotationsChip: {
    ...theme.typography.caption,
  },
  avatar: {
    backgroundColor: 'transparent',
  },
  chips: {
    opacity: 0.875,
    position: 'absolute',
    right: 0,
    textAlign: 'right',
    top: 0,
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
  searchChip: {
    ...theme.typography.caption,
    '&$selected $avatar': {
      backgroundColor: theme.palette.highlights?.primary,
    },
    marginTop: 2,
  },
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

  const hasOpenAnnotationsWindow = getCompanionWindowsForContent(state, { content: 'annotations', windowId }).length > 0;

  return {
    annotationsCount: (() => {
      if (!hasOpenAnnotationsWindow) return undefined;
      const annotations = getPresentAnnotationsOnSelectedCanvases(
        state,
        { canvasId: canvas.id },
      );

      return annotations.reduce(
        (v, a) => (v) + a.resources.filter(r => r.targetId === canvas.id).length,
        0,
      );
    })(),
    config: getConfig(state).galleryView,
    searchAnnotationsCount: canvasAnnotations.length,
    selected: currentCanvas && currentCanvas.id === canvas.id,
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WindowViewer
 * @private
 */
const mapDispatchToProps = (dispatch, { canvas, id, windowId }) => ({
  focusOnCanvas: () => dispatch(actions.setWindowViewType(windowId, 'single')),
  requestCanvasAnnotations: () => (
    dispatch(actions.requestCanvasAnnotations(windowId, canvas.id))
  ),
  setCanvas: (...args) => dispatch(actions.setCanvas(windowId, ...args)),
});

const enhance = compose(
  withWindowContext,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  // further HOC go here
);

export default enhance(GalleryViewThumbnail);
