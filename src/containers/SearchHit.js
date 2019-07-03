import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { SearchHit } from '../components/SearchHit';
import * as actions from '../state/actions';
import {
  getCanvasLabel,
  getVisibleCanvases,
  getResourceAnnotationForSearchHit,
  getResourceAnnotationLabel,
  getSelectedContentSearchAnnotationIds,
} from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchHit
 * @private
 */
const mapStateToProps = (state, {
  annotationId, hit, companionWindowId, windowId,
}) => {
  const realAnnoId = annotationId || hit.annotations[0];
  const hitAnnotation = getResourceAnnotationForSearchHit(
    state, { annotationUri: realAnnoId, companionWindowId, windowId },
  );
  const annotationLabel = getResourceAnnotationLabel(
    state, { annotationUri: realAnnoId, companionWindowId, windowId },
  );
  const selectedCanvasIds = getVisibleCanvases(state, { windowId }).map(canvas => canvas.id);

  const selectedAnnotation = getSelectedContentSearchAnnotationIds(state, {
    companionWindowId, windowId,
  });

  return {
    adjacent: selectedCanvasIds.includes(hitAnnotation.targetId),
    annotation: hitAnnotation,
    annotationId: realAnnoId,
    annotationLabel: annotationLabel[0],
    canvasLabel: hitAnnotation && getCanvasLabel(state, {
      canvasId: hitAnnotation.targetId,
      windowId,
    }),
    selected: selectedAnnotation[0] === realAnnoId,
    windowSelected: getSelectedContentSearchAnnotationIds(state, { windowId })[0] === realAnnoId,
  };
};

/**
 * mapDispatchToProps - to hook up connect
 * @memberof SearchPanelNavigation
 * @private
 */
const mapDispatchToProps = (dispatch, { companionWindowId, windowId }) => ({
  selectContentSearchAnnotation: (...args) => dispatch(
    actions.selectContentSearchAnnotation(windowId, companionWindowId, ...args),
  ),
});

/** */
const styles = theme => ({
  adjacent: {},
  focused: {},
  hitCounter: {
    ...theme.typography.subtitle2,
    backgroundColor: theme.palette.hitCounter.default,
    height: 30,
    marginRight: theme.spacing(1),
    verticalAlign: 'inherit',
  },
  inlineButton: {
    '& span': {
      lineHeight: '1.5em',
    },
    margin: 0,
    padding: 0,
    textTransform: 'none',
  },
  listItem: {
    '&$adjacent': {
      '& $hitCounter': {
        backgroundColor: theme.palette.highlights.secondary,
      },
      '&$windowSelected': {
        '& $hitCounter': {
          backgroundColor: theme.palette.highlights.primary,
        },
      },
    },
    '&$windowSelected': {
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
    borderBottom: `0.5px solid ${theme.palette.divider}`,
    paddingRight: 8,
  },
  selected: {},
  subtitle: {
    marginBottom: theme.spacing(1.5),
  },
  windowSelected: {},
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withTranslation(),
  withPlugins('SearchHit'),
);

export default enhance(SearchHit);
