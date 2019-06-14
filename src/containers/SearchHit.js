import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { SearchHit } from '../components/SearchHit';
import * as actions from '../state/actions';
import {
  getCanvasLabel,
  getSelectedCanvases,
  getResourceAnnotationForSearchHit,
  getResourceAnnotationLabel,
  getSelectedContentSearchAnnotationIds,
} from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchHit
 * @private
 */
const mapStateToProps = (state, { hit, companionWindowId, windowId }) => {
  const hitAnnotation = getResourceAnnotationForSearchHit(
    state, { annotationUri: hit.annotations[0], companionWindowId, windowId },
  );
  const annotationLabel = getResourceAnnotationLabel(
    state, { annotationUri: hit.annotations[0], companionWindowId, windowId },
  );
  const selectedCanvasIds = getSelectedCanvases(state, { windowId }).map(canvas => canvas.id);

  return {
    adjacent: selectedCanvasIds.includes(hitAnnotation.targetId),
    annotationLabel: annotationLabel[0],
    canvasLabel: hitAnnotation && getCanvasLabel(state, {
      canvasId: hitAnnotation.targetId,
      windowId,
    }),
    selected: getSelectedContentSearchAnnotationIds(state, { windowId })[0] === hit.annotations[0],
  };
};

const mapDispatchToProps = {
  selectContentSearchAnnotation: actions.selectContentSearchAnnotation,
};

/** */
const styles = theme => ({
  adjacent: {},
  canvasLabel: {
    ...theme.typography.h6,
  },
  focused: {},
  hitCounter: {
    ...theme.typography.h6,
    backgroundColor: theme.palette.hitCounter.default,
    marginRight: theme.spacing(1),
    verticalAlign: 'inherit',
  },
  inlineButton: {
    margin: 0,
    padding: 0,
    textDecoration: 'underline',
    textTransform: 'none',
  },
  listItem: {
    '&$adjacent': {
      '& $hitCounter': {
        backgroundColor: theme.palette.highlights.secondary,
      },
      '&$selected': {
        '& $hitCounter': {
          backgroundColor: theme.palette.highlights.primary,
        },
      },
    },
    '&$selected': {
      '& $hitCounter': {
        backgroundColor: theme.palette.highlights.primary,
      },
      '&$focused': {
        '&:hover': {
          backgroundColor: 'inherit',
        },
        backgroundColor: 'inherit',
      },
    },
  },
  selected: {},
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withTranslation(),
  withPlugins('SearchHit'),
);

export default enhance(SearchHit);
